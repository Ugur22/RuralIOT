/*******************************************************************************
   Copyright (c) 2015 Thomas Telkamp and Matthijs Kooijman

   Permission is hereby granted, free of charge, to anyone
   obtaining a copy of this document and accompanying files,
   to do whatever they want with them without any restriction,
   including, but not limited to, copying, modification and redistribution.
   NO WARRANTY OF ANY KIND IS PROVIDED.

   This example sends a valid LoRaWAN packet with payload "Hello,
   world!", using frequency and encryption settings matching those of
   the The Things Network.

   This uses ABP (Activation-by-personalisation), where a DevAddr and
   Session keys are preconfigured (unlike OTAA, where a DevEUI and
   application key is configured, while the DevAddr and session keys are
   assigned/generated in the over-the-air-activation procedure).

   Note: LoRaWAN per sub-band duty-cycle limitation is enforced (1% in
   g1, 0.1% in g2), but not the TTN fair usage policy (which is probably
   violated by this sketch when left running for longer)!

   To use this sketch, first register your application and device with
   the things network, to set or generate a DevAddr, NwkSKey and
   AppSKey. Each device should have their own unique values for these
   fields.

   Do not forget to define the radio type correctly in config.h.

 *******************************************************************************/


#include <lmic.h>
#include <hal/hal.h>
#include <SPI.h>
#include <TinyGPS++.h>
#include <SoftwareSerial.h>
static const int RXPin = 4, TXPin = 3;
static const uint32_t GPSBaud = 9600;
// The TinyGPS++ object
TinyGPSPlus gps;
int32_t lat;
int32_t lng;
float voltage;
uint8_t coords[8]; // 6*8 bits = 48
// The serial connection to the GPS device
SoftwareSerial ss(RXPin, TXPin);

const int buttonPin = 5;     // the number of the pushbutton pin


// variables will change:
int buttonState = 0;         // variable for reading the pushbutton status

// LoRaWAN NwkSKey, network session key
// This is the default Semtech key, which is used by the early prototype TTN
// network.
static const PROGMEM u1_t NWKSKEY[16] = { 0x53, 0x76, 0xFD, 0xCB, 0x72, 0x28, 0x8C, 0xD6, 0xA1, 0x52, 0x7A, 0xBB, 0x81, 0xF3, 0xBC, 0xC0 };

// LoRaWAN AppSKey, application session key
// This is the default Semtech key, which is used by the early prototype TTN
// network.
static const u1_t PROGMEM APPSKEY[16] = { 0xAD, 0x27, 0xD2, 0x8C, 0xD8, 0xD3, 0x88, 0x64, 0x60, 0x18, 0x00, 0xF1, 0xFD, 0x71, 0x73, 0xCE };

// LoRaWAN end-device address (DevAddr)
static const u4_t DEVADDR = 0x260111DC ; // <-- Change this address for every node!

// These callbacks are only used in over-the-air activation, so they are
// left empty here (we cannot leave them out completely unless
// DISABLE_JOIN is set in config.h, otherwise the linker will complain).
void os_getArtEui (u1_t* buf) { }
void os_getDevEui (u1_t* buf) { }
void os_getDevKey (u1_t* buf) { }



static osjob_t sendjob;

// Schedule TX every this many seconds (might become longer due to duty
// cycle limitations).
//const unsigned TX_INTERVAL = 60;

// Pin mapping
const lmic_pinmap lmic_pins = {
  .nss = 10,
  .rxtx = LMIC_UNUSED_PIN,
  .rst = 6,
  .dio = {2, 5, 7},
};
void onEvent (ev_t ev) {


}
void do_send(osjob_t* j) {

  // Prepare upstream data transmission at the next possible time.


  LMIC_setTxData2(1, coords, sizeof(coords), 0);
}


// Next TX is scheduled after TX_COMPLETE event.

void sendMessage() {

  // LMIC init
  os_init();
  // Reset the MAC state. Session and pending data transfers will be discarded.
  LMIC_reset();

  // Set static session parameters. Instead of dynamically establishing a session
  // by joining the network, precomputed session parameters are be provided.
#ifdef PROGMEM
  // On AVR, these values are stored in flash and only copied to RAM
  // once. Copy them to a temporary buffer here, LMIC_setSession will
  //  // copy them into a buffer of its own again.
  uint8_t appskey[sizeof(APPSKEY)];
  uint8_t nwkskey[sizeof(NWKSKEY)];
  memcpy_P(appskey, APPSKEY, sizeof(APPSKEY));
  memcpy_P(nwkskey, NWKSKEY, sizeof(NWKSKEY));
  LMIC_setSession (0x1, DEVADDR, nwkskey, appskey);
#else
  //  // If not running an AVR with PROGMEM, just use the arrays directly
  LMIC_setSession (0x1, DEVADDR, NWKSKEY, APPSKEY);
#endif

#if defined(CFG_eu868)
  // Set up the channels used by the Things Network, which corresponds
  // to the defaults of most gateways. Without this, only three base
  // channels from the LoRaWAN specification are used, which certainly
  // works, so it is good for debugging, but can overload those
  // frequencies, so be sure to configure the full frequency range of
  // your network here (unless your network autoconfigures them).774
  // Setting up channels should happen after LMIC_setSession, as that
  // configures the minimal channel set.
  // NA-US channels 0-71 are configured automatically
  //  LMIC_setupChannel(0, 868100000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
  //  LMIC_setupChannel(1, 868300000, DR_RANGE_MAP(DR_SF12, DR_SF7B), BAND_CENTI);      // g-band
  //  LMIC_setupChannel(2, 868500000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
  //  LMIC_setupChannel(3, 867100000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
  //  LMIC_setupChannel(4, 867300000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
  //  LMIC_setupChannel(5, 867500000, DR_RANGE_MAP(DR_SF12, DR_SF7747),  BAND_CENTI);      // g-band
  //  LMIC_setupChannel(6, 867700000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
  //  LMIC_setupChannel(7, 867900000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
  //  LMIC_setupChannel(8, 868800000, DR_RANGE_MAP(DR_FSK,  DR_FSK),  BAND_MILLI);      // g2-band
  // TTN defines an additional channel at 869.525Mhz using SF9 for class B
  // devices' ping slots. LMIC does not have an easy way to define set this
  // frequency and support for class B is spotty and untested, so this
  // frequency is not configured here.
#elif defined(CFG_us915)
  // NA-US channels 0-71 are configured automatically
  // but only one group of 8 should (a subband) should be active
  // TTN recommends the second sub band, 1 in a zero based count.
  // https://github.com/TheThingsNetwork/gateway-conf/blob/master/US-global_conf.json
  LMIC_selectSubBand(1);
#endif

  // Disable link check validation
  LMIC_setLinkCheckMode(0);

  // TTN uses SF9 for its RX2 window.
  LMIC.dn2Dr = DR_SF9;

  // Set data rate and transmit power for uplink (note: txpow seems to be ignored by the library)
  LMIC_setDrTxpow(DR_SF7, 14);

  // Start job
  do_send(&sendjob);
}

void setup() {
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);
  Serial.begin(9600);
  ss.begin(GPSBaud);
}

void loop() {
  buttonState = digitalRead(buttonPin);

  while (ss.available() > 0) {
    if (gps.encode(ss.read())) {
      if (gps.location.isValid()) {
        lat  = gps.location.lat() * 10000;
        lng  = gps.location.lng() * 10000;
        coords[0] = lat;
        coords[1] = lat >> 8;
        coords[2] = lat >> 16;

        coords[3] = lng;
        coords[4] = lng >> 8;
        coords[5] = lng >> 16;

      }
    }
  }

  int32_t turbidity = analogRead(A0) * (5.0 / 1024.0) * 10000; // Convert the analog reading (which goes from 0 - 1023) to a voltage (0 - 5V):
  coords[6] = highByte(turbidity);
  coords[7] = lowByte(turbidity);

  Serial.print( lat / 10000 );
  Serial.print(", ");
  Serial.println( lng / 10000);
  Serial.println(turbidity / 10000);
  delay(400);
  

  if (buttonState == HIGH) {
    Serial.println("HIgh");
    sendMessage();
    delay(400);
  } else {
    Serial.println("LOW");
  }
}


