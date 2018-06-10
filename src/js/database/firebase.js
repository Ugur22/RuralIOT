import Firebase from 'firebase/app'
import 'firebase';
// Initialize Firebase
const firebaseApp = Firebase.initializeApp({
    apiKey: "AIzaSyCxvjKhkhrrvHQ1YH4Ob9I80SZ-kXrqI-s",
    authDomain: "ruralit-1620a.firebaseapp.com",
    databaseURL: "https://ruralit-1620a.firebaseio.com",
    projectId: "ruralit-1620a",
    storageBucket: "ruralit-1620a.appspot.com",
    messagingSenderId: "687154250117"
});

//   if (!firebaseApp.apps.length) {
//     firebaseApp.initializeApp(config);
//   }
export const db = firebaseApp.database();
