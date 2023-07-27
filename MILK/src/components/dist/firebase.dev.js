"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _app = _interopRequireDefault(require("@react-native-firebase/app"));

require("@react-native-firebase/firestore");

require("@react-native-firebase/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* import firebase from 'firebase/app'; */

/* import 'firebase/firestore';
 */
// Import other Firebase modules you need (e.g., auth, storage, etc.)
var firebaseConfig = {
  apiKey: "AIzaSyBkBBzFjwJIgoghBpGOS4CgRAEuG_vDoFE",
  authDomain: "milk-6ba50.firebaseapp.com",
  databaseURL: "https://milk-6ba50-default-rtdb.firebaseio.com",
  projectId: "milk-6ba50",
  storageBucket: "milk-6ba50.appspot.com",
  messagingSenderId: "557951169044",
  appId: "1:557951169044:web:4a8ce0af10e4e83d7cad01",
  measurementId: "G-4Y51JJ4T4Y"
};

if (!_app["default"].apps.length) {
  _app["default"].initializeApp(firebaseConfig);
}
/* const app = initializeApp(firebaseConfig); */


var _default = _app["default"];
exports["default"] = _default;