// Initialize Firebase
var config = {
    apiKey: "AIzaSyCxvjKhkhrrvHQ1YH4Ob9I80SZ-kXrqI-s",
    authDomain: "ruralit-1620a.firebaseapp.com",
    databaseURL: "https://ruralit-1620a.firebaseio.com",
    projectId: "ruralit-1620a",
    storageBucket: "ruralit-1620a.appspot.com",
    messagingSenderId: "687154250117"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}


document.addEventListener("DOMContentLoaded", function (event) {
console.log("hello world");
});