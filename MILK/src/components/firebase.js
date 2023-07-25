import firebase from '@react-native-firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBkBBzFjwJIgoghBpGOS4CgRAEuG_vDoFE",
    authDomain: "milk-6ba50.firebaseapp.com",
    projectId: "milk-6ba50",
    storageBucket: "milk-6ba50.appspot.com",
    messagingSenderId: "557951169044",
    appId: "1:557951169044:web:4a8ce0af10e4e83d7cad01",
    measurementId: "G-4Y51JJ4T4Y"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
