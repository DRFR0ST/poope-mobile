import firebase from '@react-native-firebase/app';

// Your secondary Firebase project credentials...
const credentials = {
    apiKey: "AIzaSyAXDnHWDZ0vFqXLDSigXfWsUshagdfSRK4",
    authDomain: "poope-2d4d6.firebaseapp.com",
    databaseURL: "https://poope-2d4d6.firebaseio.com",
    projectId: "poope-2d4d6",
    storageBucket: "poope-2d4d6.appspot.com",
    messagingSenderId: "450018520990",
    appId: "1:450018520990:web:501bfb72a3f39de638f08f",
    measurementId: "G-ZNF7BX3CXQ"
};

// const config = {
//   name: 'poope-2d4d6',
// };


export async function initializeFirebase() {
    console.log("Initializing firebase...")

    if (!firebase.apps.length)
        firebase.initializeApp(credentials);
}