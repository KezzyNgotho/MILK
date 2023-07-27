/* import firebase from 'firebase/app'; */
import firebase from'@react-native-firebase/app';
/* import 'firebase/firestore';
 */ // Import other Firebase modules you need (e.g., auth, storage, etc.)
 import '@react-native-firebase/firestore';
 import '@react-native-firebase/auth'

 const firebaseConfig = {
  apiKey: "AIzaSyBkBBzFjwJIgoghBpGOS4CgRAEuG_vDoFE",
  authDomain: "milk-6ba50.firebaseapp.com",
  databaseURL: "https://milk-6ba50-default-rtdb.firebaseio.com",
  projectId: "milk-6ba50",
  storageBucket: "milk-6ba50.appspot.com",
  messagingSenderId: "557951169044",
  appId: "1:557951169044:web:4a8ce0af10e4e83d7cad01",
  measurementId: "G-4Y51JJ4T4Y"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
/* const app = initializeApp(firebaseConfig); */
export default firebase;
