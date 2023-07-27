import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import firebase from '../components/firebase'; // Import the firebase.js file

import CustomDropdown from '../components/CustomDropdown';
const MilkScreen = () => {
  const navigation = useNavigation();
  const [timeOfDay, setTimeOfDay] = useState('');
  const [usage, setUsage] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
 /*  const [timeOfDayOptions, setTimeOfDayOptions] = useState([]);
  const [usageOptions, setUsageOptions] = useState([]); */
  const timeOfDayOptions = [
    { label: 'Morning', value: 'morning' },
    { label: 'Afternoon', value: 'afternoon' },
    { label: 'Evening', value: 'evening' },
  ];

  const usageOptions = [
    { label: 'Consumption', value: 'consumption' },
    { label: 'Selling', value: 'selling' },
    { label: 'Feeding Calves', value: 'feedingCalves' },
  ];
 // ... The rest of your MilkScreen.js code ...

const db = firebase.firestore();

const handleTimeOfDayChange = (value) => {
  setTimeOfDay(value);
};

// Function to record milk production
const handleRecordMilk = () => {
  // ... Your validation code ...

  db.collection('milkProduction')
    .add({
      userId: firebase.auth().currentUser.uid,
      timeOfDay,
      amount,
      date: date.toISOString(), // Convert date to ISO string format for Firestore
    })
    .then(() => {
      console.log('Milk production recorded successfully');
      setTimeOfDay('');
      setAmount('');
      setDate(new Date());
      Alert.alert('Success', 'Milk production recorded successfully');
    })
    .catch((error) => {
      console.error(error);
      Alert.alert('Error', 'Failed to record milk production');
    });
};

// Function to record milk usage
const handleRecordUsage = () => {
  // ... Your validation code ...

  db.collection('milkUsage')
  
    .add({
      userId: firebase.auth().currentUser.uid,
      usage,
      quantity,
    })
    .then(() => {
      console.log('Milk usage recorded successfully');
      setUsage('');
      setQuantity('');
      Alert.alert('Success', 'Milk usage recorded successfully');
    })
    .catch((error) => {
      console.error(error);
      Alert.alert('Error', 'Failed to record milk usage');
    });
};

// Function to generate milk statements
const handleGenerateStatements = () => {
  db.collection('milkStatements')
    .get()
    .then((querySnapshot) => {
      console.log(querySnapshot.docs.map((doc) => doc.data()));
      Alert.alert('Success', 'Milk statements generated successfully');
    })
    .catch((error) => {
      console.error(error);
      Alert.alert('Error', 'Failed to generate milk statements');
    });
};

// ... The rest of your MilkScreen.js code ...

  const handleUsageChange = (value) => {
    setUsage(value);
  };

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

 

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Record Milk Production</Text>
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={showDatepicker}
      >
        <Text style={styles.datePickerButtonText}>Select Date</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {/* <CustomDropdown
        label="Time of Day"
        value={timeOfDay}
        onValueChange={handleTimeOfDayChange}
        items={timeOfDayOptions}
      /> */}
       <CustomDropdown
        label="Time of Day"
        value={timeOfDay}
        onValueChange={setTimeOfDay}
        items={timeOfDayOptions}
      />
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={handleAmountChange}
        placeholder="Amount (in liters)"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.recordButton} onPress={handleRecordMilk}>
        <Text style={styles.recordButtonText}>Record Milk</Text>
      </TouchableOpacity>
     {/*  <CustomDropdown
        label="Usage"
        value={usage}
        onValueChange={handleUsageChange}
        items={usageOptions}
      /> */}
         <CustomDropdown
        label="Usage"
        value={usage}
        onValueChange={setUsage}
        items={usageOptions}
      />
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={handleQuantityChange}
        placeholder="Quantity (in liters)"
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={styles.recordButton}
        onPress={handleRecordUsage}
      >
        <Text style={styles.recordButtonText}>Record Usage</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.statementButton}
        onPress={handleGenerateStatements}
      >
     
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    color: '#333',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  datePickerButton: {
    backgroundColor: '#333',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  datePickerButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: '#333',
    fontSize: 16,
  },
  recordButton: {
    backgroundColor: '#333',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  recordButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statementButton: {
    alignSelf: 'center',
    marginTop: 30,
  },
  statementButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default MilkScreen;
