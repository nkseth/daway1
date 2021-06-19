import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyAOqENsiAMUXC9MADYl7t1_fdeMAHp5nmY",
    authDomain: "daway-9dc9a.firebaseapp.com",
    projectId: "daway-9dc9a",
    storageBucket: "daway-9dc9a.appspot.com",
    messagingSenderId: "975847021824",
    appId: "1:975847021824:web:7e9b465677a62e7c36a7e5",
    measurementId: "G-2YJTJL1Y8D"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();


/*const db = firebase.firestore()
if (window.location.hostname === "localhost") {
    console.log('in this if')
    db.useEmulator("localhost", 4009);
}
firebase.auth().useEmulator('http://localhost:9099/');*/

firebase.functions().useEmulator("localhost", 5001);



export default firebase