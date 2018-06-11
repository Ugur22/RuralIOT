<template>
  <div class="hello">
    <h1 class="title">Water quality graphs turbidity level cities</h1>
      <div id="chart_div"></div>
       <div id="chart_div2"></div>
        <div id="chart_div3"></div>
  </div>
</template>

<script>
import { db } from "../../js/database/firebase";

export default {
  name: "about",
  data() {
    return {};
  },
  mounted() {
    this.initGraph();
  },
  methods: {
    initGraph: function() {
      var measurementsRef = db.ref("measurements");
      let turbidityArray = [];
      let amsterdam = [];
      let rotterdam = [];
      let apeldoorn = [];
      turbidityArray.push({
        rotterdam,
        amsterdam,
        apeldoorn
      });

      measurementsRef.on("child_added", function(snapshot) {
        var data = snapshot.val();

        if (data.payload_fields.location.lng < 4.8) {
          rotterdam.push({
            turbidity: data.payload_fields.turbidity,
            date:
              data.metadata.time.slice(6, 10).toString() +
              " " +
              data.metadata.time.slice(12, 16).toString()
          });
        } else if (
          data.payload_fields.location.lng > 4.8 &&
          data.payload_fields.location.lng < 5.1
        ) {
          amsterdam.push({
            turbidity: data.payload_fields.turbidity,
            date:
              data.metadata.time.slice(6, 10).toString() +
              " " +
              data.metadata.time.slice(12, 16).toString()
          });
        } else if (data.payload_fields.location.lng > 5.1) {
          apeldoorn.push({
            turbidity: data.payload_fields.turbidity,
            date:
              data.metadata.time.slice(6, 10).toString() +
              " " +
              data.metadata.time.slice(12, 16).toString()
          });
        }
      });
      var options = {
        legend: { position: "top" },
        curveType: "function",
        series: {
          0: { lineWidth: 5 }
        }
      };

      google.charts.load("current", { packages: ["corechart", "line"] });
      google.charts.setOnLoadCallback(drawBasic);
      google.charts.setOnLoadCallback(drawBasic2);
      google.charts.setOnLoadCallback(drawBasic3);

      function drawBasic2() {
        var data = new google.visualization.DataTable();
        data.addColumn("string", "Date");
        data.addColumn("number", "Amsterdam");
        data.addColumn({ type: "number", role: "annotation" });

        for (let i = 0; i < turbidityArray.length; i++) {
          for (let j = 0; j < turbidityArray[i].amsterdam.length; j++) {

            data.addRows([
              [
                turbidityArray[i].amsterdam[j].date,
                turbidityArray[i].amsterdam[j].turbidity,
                turbidityArray[i].amsterdam[j].turbidity
              ]
            ]);
          }
        }

        var chart = new google.visualization.LineChart(
          document.getElementById("chart_div2")
        );

        chart.draw(data, options);
      }

      function drawBasic3() {
        var data = new google.visualization.DataTable();
        data.addColumn("string", "Date");
        data.addColumn("number", "Apeldoorn");
        data.addColumn({ type: "number", role: "annotation" });

        for (let i = 0; i < turbidityArray.length; i++) {
          for (let j = 0; j < turbidityArray[i].apeldoorn.length; j++) {

            data.addRows([
              [
                turbidityArray[i].apeldoorn[j].date,
                turbidityArray[i].apeldoorn[j].turbidity,
                turbidityArray[i].apeldoorn[j].turbidity
              ]
            ]);
          }
        }

        var chart = new google.visualization.LineChart(
          document.getElementById("chart_div3")
        );

        chart.draw(data, options);
      }

      function drawBasic() {
        var data = new google.visualization.DataTable();
        data.addColumn("string", "Date");
        data.addColumn("number", "Rotterdam");
        data.addColumn({ type: "number", role: "annotation" });

        for (let i = 0; i < turbidityArray.length; i++) {
          for (let j = 0; j < turbidityArray[i].rotterdam.length; j++) {
            data.addRows([
              [
                turbidityArray[i].rotterdam[j].date,
                turbidityArray[i].rotterdam[j].turbidity,
                turbidityArray[i].rotterdam[j].turbidity
              ]
            ]);
          }
        }

        var chart = new google.visualization.LineChart(
          document.getElementById("chart_div")
        );

        chart.draw(data, options);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  margin-top: 10px;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
