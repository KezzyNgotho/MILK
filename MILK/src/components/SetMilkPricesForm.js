import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import firebase from '../components/firebase';
import '@react-native-firebase/database';

function SetMilkPricesForm() {
  const [price, setPrice] = useState('');
  const [newPrice, setNewPrice] = useState(''); // New price input
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;
  const [mode, setMode] = useState('set'); // State to track the mode (set or update)
  const handleSetPrice = () => {
    if (price === '') {
      // Handle empty price input
      console.log('Please enter a price');
      return;
    }
  
    // Convert the price to a floating-point number
    const parsedPrice = parseFloat(price);
  
    // Check if the parsedPrice is a valid number
    if (isNaN(parsedPrice)) {
      console.log('Please enter a valid price');
      return;
    }
  
    // Create the request body
    const requestBody = {
      userId: currentUser.uid, // Include the userId in the document
      pricePerLiter: parsedPrice,
    };
  
    // Save the price to Firestore under the 'milkPrices' collection
    db.collection('milkPrices')
      .add(requestBody)
      .then(() => {
        console.log('Milk prices set successfully');
        // Display success message
        Alert.alert('Success', 'Milk prices set successfully');
      })
      .catch(error => {
        console.error(error); // Handle any errors
        // Display error message
        Alert.alert('Error', 'Failed to set milk prices');
      });
  };
  
  const handleUpdatePrice = () => {
    if (newPrice === '') {
      // Handle empty new price input
      console.log('Please enter a new price');
      return;
    }

    // Convert the new price to a floating-point number
    const parsedNewPrice = parseFloat(newPrice);

    // Check if the parsedNewPrice is a valid number
    if (isNaN(parsedNewPrice)) {
      console.log('Please enter a valid new price');
      return;
    }

    // Create the request body
    const requestBody = {
      pricePerLiter: parsedNewPrice,
    };

    // Update the price in Firestore under the user's UID
    if (currentUser) {
      const uid = currentUser.uid;
      db.collection('users').doc(uid).collection('milkPrices').doc('currentPrice').update(requestBody)
        .then(() => {
          console.log('Milk price updated successfully');
          // Display success message
          Alert.alert('Success', 'Milk price updated successfully');
          setPrice(newPrice); // Update the displayed price with the new price
          setNewPrice(''); // Clear the new price input field
        })
        .catch(error => {
          console.error(error); // Handle any errors
          // Display error message
          Alert.alert('Error', 'Failed to update milk price');
        });
    }
  };
  const handleModeChange = () => {
    // Toggle between set and update mode
    if (mode === 'set') {
      setMode('update');
    } else {
      setMode('set');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {mode === 'set' ? 'Set Milk Prices' : 'Update Milk Price'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder={mode === 'set' ? 'Enter current price per litre' : 'Enter new price per litre'}
        value={mode === 'set' ? price : newPrice}
        onChangeText={mode === 'set' ? setPrice : setNewPrice}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={mode === 'set' ? handleSetPrice : handleUpdatePrice}>
        <Text style={styles.buttonText}>{mode === 'set' ? 'Set Price' : 'Update Price'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleModeChange}>
        <Text style={styles.buttonText}>
          {mode === 'set' ? 'Switch to Update Mode' : 'Switch to Set Mode'}
        </Text>
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
    borderColor: 'black',
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
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default SetMilkPricesForm;