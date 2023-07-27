import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
/* import '@react-native-firebase/database' */
import firebase from '../components/firebase';
import '@react-native-firebase/database';
 // Replace with the path to your firebase.js file

function SetMilkPricesForm() {
  const [price, setPrice] = useState('');

  const handleSetPrice = () => {
    if (price === '') {
      // Handle empty price input
      console.log('Please enter a price');
      return;
    }

    // Show confirmation prompt
    Alert.alert(
      'Confirmation',
      'Are you sure you want to change the milk prices?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            // Create the request body
            const requestBody = {
              pricePerLiter: parseFloat(price),
            };

            // Save the price to Firebase Realtime Database
            firebase.database().ref('milkPrices').set(requestBody)
              .then(() => {
                console.log('Milk prices changed successfully');
                // Display success message
                Alert.alert('Success', 'Milk prices changed successfully');
              })
              .catch(error => {
                console.error(error); // Handle any errors
                // Display error message
                Alert.alert('Error', 'Failed to change milk prices');
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  /* const handleSetPrice = () => {
    if (price === '') {
      // Handle empty price input
      console.log('Please enter a price');
      return;
    }
  
    // Show confirmation prompt
    Alert.alert(
      'Confirmation',
      'Are you sure you want to change the milk prices?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            // Create the request body
            const requestBody = {
              pricePerLiter: parseFloat(price),
            };
  
            fetch('http://192.168.0.103:4000/milk-prices', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody),
            })
              .then(response => response.json())
              .then(data => {
                console.log(data); // Handle the response data
                // Display success message
                Alert.alert('Success', 'Milk prices changed successfully');
              })
              .catch(error => {
                console.error(error); // Handle any errors
                // Display error message
                Alert.alert('Error', 'Failed to change milk prices');
              });
          },
        },
      ],
      { cancelable: false }
    );
  }; */
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Milk Prices</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price per litre"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleSetPrice}>
        <Text style={styles.buttonText}>Set Price</Text>
      </TouchableOpacity>
    </View>
  );
}

// Rest of the component code...




const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    borderColor:"black"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default SetMilkPricesForm;
