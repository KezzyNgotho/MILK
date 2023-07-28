import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import firebase from '../components/firebase'; // Replace with the path to your firebase.js file

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    // Check if any field is empty
    if (email === '' || password === '') {
      setError('Email and password are required');
      return;
    }

    try {
      // Log in the user with email and password
      await firebase.auth().signInWithEmailAndPassword(email, password);

      // User logged in successfully, navigate to the main screen or any protected screen
      navigation.navigate('Main');
    } catch (error) {
      // Handle the error, e.g., show an error message
      console.error('Failed to log in:', error);
      setError('Failed to log in');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../Screens/assets/mainlogo.png')} style={styles.logo} />

      <Text style={styles.title}>Log In</Text>

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

      {error !== '' && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nav} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.buttonText1}>Don't have an account? Register.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  nav: {
    marginTop: 10,
    color: 'black',
  },
  buttonText1: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
