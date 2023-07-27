import React, { useState } from 'react';
import {
View,
Text,
TextInput,
TouchableOpacity,
StyleSheet,
ScrollView,
KeyboardAvoidingView,
} from 'react-native';

import firebase from '../components/firebase'; // Replace with the path to your firebase.js file
import { useNavigation } from '@react-navigation/native';

import auth from'@react-native-firebase/auth'

const SignUpScreen = ({ navigation }) => {
const [farmName, setFarmName] = useState('');
const [farmOwner, setFarmOwner] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');
const [address, setAddress] = useState('');
const [error, setError] = useState('');

/* const handleSignUp = async () => {
  // Check if any field is empty
  if (
    farmName === '' ||
    farmOwner === '' ||
    email === '' ||
    password === '' ||
    phoneNumber === '' ||
    address === ''
  ) {
    setError('All fields are required');
    return;
  }

  try {
    const response = await axios.post('http://192.168.0.103:4000/signup', {
      farmName,
      farmOwner,
      email,
      password,
      phoneNumber,
      address,
    });

    // Handle the response as needed, e.g., show a success message
    console.log(response.data);
    navigation.navigate('Login');
  } catch (error) {
    // Handle the error, e.g., show an error message
    console.error('Failed to sign up:', error);
  }
};
 */
const handleSignUp = async () => {
  // Check if any field is empty
  if (
    farmName === '' ||
    farmOwner === '' ||
    email === '' ||
    password === '' ||
    phoneNumber === '' ||
    address === ''
  ) {
    setError('All fields are required');
    return;
  }

  try {
    // Sign up the user with email and password
    await firebase.auth().createUserWithEmailAndPassword(email, password);

    // User signed up successfully, now you can add any additional data to Firestore if needed
    // For example, if you want to store the farm name, owner, phone number, and address in Firestore:
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const userRef = firebase.firestore().collection('users').doc(currentUser.uid);
      await userRef.set({
        farmName,
        farmOwner,
        phoneNumber,
        address,
      });
    }

    navigation.navigate('Login'); // Redirect to the login screen after successful sign-up
  } catch (error) {
    // Handle the error, e.g., show an error message
    setError('Failed to sign up: ' + error.message);
  }
};


return (
<KeyboardAvoidingView style={styles.container} >
<ScrollView contentContainerStyle={styles.scrollViewContainer}>
<Text style={styles.title}>Sign Up</Text>


    <View style={styles.inputContainer}>
      <Text style={styles.label}>Farm Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Farm Name"
        value={farmName}
        onChangeText={setFarmName}
      />
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.label}>Farm Owner</Text>
      <TextInput
        style={styles.input}
        placeholder="Farm Owner"
        value={farmOwner}
        onChangeText={setFarmOwner}
      />
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
    </View>

    <Text style={styles.errorText}>{error}</Text>
    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
      <Text style={styles.buttonText}>Sign Up</Text>
    </TouchableOpacity>
    <TouchableOpacity  style={styles.nav} onPress={() => navigation.navigate('Login')}>
    <Text style={styles.buttonText1}>Already have an account? Log in.</Text>
  </TouchableOpacity>
  </ScrollView>
</KeyboardAvoidingView>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
},
nav:{
marginTop:10,
color:"black"
},
scrollViewContainer: {
flexGrow: 1,
alignItems: 'center',
justifyContent: 'center',
paddingHorizontal: 20,
},
title: {
fontSize: 25,
fontWeight: '900',
marginBottom: 20,
color: 'black',
},
inputContainer: {
marginBottom: 10,
width: '100%',
},
label: {
fontSize: 16,
fontWeight: 'bold',
marginBottom: 5,
color: 'black',
},
input: {
borderWidth: 1.5,
borderColor: 'black',
borderRadius: 2,
padding: 10,
color: 'black',
fontSize: 16,
width: '100%',
},
button: {
width: '100%',
height: 40,
backgroundColor: 'green',
borderRadius: 5,
alignItems: 'center',
justifyContent: 'center',
},
buttonText: {
color: '#fff',
fontSize: 16,
fontWeight: 'bold',
},
buttonText1: {
  color: 'black',
  fontSize: 16,
  fontWeight: 'bold',
  },
errorText: {
color: 'red',
marginBottom: 10,
},
});

export default SignUpScreen;