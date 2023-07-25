import React, { useState, useEffect } from 'react';
import {
View,
Text,
TextInput,
StyleSheet,
ScrollView,
TouchableOpacity,
} from 'react-native';
import firebase from '../components/firebase';
import 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';


const SalesScreen = () => {
const [salesData, setSalesData] = useState([]);
const [searchDate, setSearchDate] = useState('');
const [totalWeeklySales, setTotalWeeklySales] = useState(0);
const [totalMonthlySales, setTotalMonthlySales] = useState(0);

const navigation = useNavigation();
const db = firebase.firestore();

//fetch
const fetchSalesData = async () => {
  try {
    const snapshot = await db.collection('sales').get();
    const data = snapshot.docs.map(doc => doc.data());
    setSalesData(data);
    calculateTotalSales(data);
  } catch (error) {
    console.error('Failed to fetch sales data', error);
  }
};


/*
useEffect(() => {
fetchSalesData();
}, []);

const fetchSalesData = async () => {
try {
const response = await fetch('http://192.168.0.103:4000/sales/daily');
const data = await response.json();
if (response.ok) {
setSalesData(data);
calculateTotalSales(data);
} else {
console.error('Failed to fetch sales data');
}
} catch (error) {
console.error('Failed to fetch sales data', error);
}
};
*/

/* const handleSearchDate = () => {
const selectedSales = salesData.find((item) => item.date === searchDate);
if (selectedSales) {
console.log('Sales on ${searchDate}: ${selectedSales.totalAmount');
} else {
console.log('No sales found for the selected date.');
}
}; *///
//search
const handleSearchDate = () => {
  const selectedSales = salesData.find(item => item.date === searchDate);
  if (selectedSales) {
    console.log(`Sales on ${searchDate}: ${selectedSales.totalAmount}`);
  } else {
    console.log('No sales found for the selected date.');
  }
};

// Optional: To add new sales data, implement a function like this:
/* const addSalesData = async (salesData) => {
  try {
    await db.collection('sales').add(salesData);
    console.log('Sales data added successfully.');
  } catch (error) {
    console.error('Error adding sales data:', error);
  }
}; */


const calculateTotalSales = (data) => {
const totalWeeklySales = data.reduce(
(sum, item) => sum + item.totalAmount,
0
);
const totalMonthlySales = data.reduce(
(sum, item) => sum + item.totalAmount,
0
);
setTotalWeeklySales(totalWeeklySales);
setTotalMonthlySales(totalMonthlySales);
};

const renderSalesData = () => {
return salesData.map((item, index) => (
<View key={index} style={styles.salesCard}>
<Text style={styles.salesDate}>Date: {item.date}</Text>
<Text style={styles.salesTime}>Time: {item.time}</Text>
<Text style={styles.salesAmount}>
Total Amount: ${item.totalAmount.toFixed(2)}
</Text>
</View>
));
};


//back
const handleGoBack = () => {
  navigation.goBack();
};
return (
<ScrollView contentContainerStyle={styles.container}>
<TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
<Text style={styles.backButtonText}>Back</Text>
</TouchableOpacity>

<Text style={styles.title}>Daily Sales</Text>
<View style={styles.salesTotalContainer}>
<Text style={styles.salesTotal}>
Weekly Sales: ${totalWeeklySales.toFixed(2)}
</Text>
<Text style={styles.salesTotal}>
Monthly Sales: ${totalMonthlySales.toFixed(2)}
</Text>
</View>


  <Text style={styles.title}>Search by Date</Text>
  <TextInput
    onChangeText={setSearchDate}
    value={searchDate}
    placeholder="Enter date (DD/MM/YYYY)"
    style={styles.input}
  />
  <TouchableOpacity style={styles.searchButton} onPress={handleSearchDate}>
    <Text style={styles.searchButtonText}>Search</Text>
  </TouchableOpacity>

  <Text style={styles.title}>Sales Statement</Text>
  {renderSalesData()}

  
</ScrollView>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
padding: 20,
backgroundColor: 'white',
},
backButton: {
  position: 'absolute',
  top: 20,
  left: 20,
  zIndex: 1,
},
backButtonText: {
  color: 'black',
  fontSize: 16,
},
title: {
fontSize: 20,
fontWeight: '900',
marginBottom: 10,
color: '#000000',
textAlign: 'center',
},
salesTotalContainer: {
marginBottom: 10,
},
salesTotal: {
fontSize: 16,
marginBottom: 5,
fontWeight: 'bold',
textAlign: 'center',
},
salesCard: {
backgroundColor: '#FFF',
borderRadius: 8,
padding: 10,
marginBottom: 10,
elevation: 2,
borderBottomColor: '#CEF3CE',
borderColor: '#CEF3CE',
},
salesDate: {
fontSize: 16,
fontWeight: 'bold',
},
salesTime: {
fontSize: 16,
},
salesAmount: {
fontSize: 16,
},
input: {
height: 40,
borderColor: 'black',
borderWidth: 1,
marginBottom: 10,
paddingHorizontal: 10,
},
searchButton: {
backgroundColor: '#000000',
borderRadius: 5,
padding: 10,
marginVertical: 10,
},
searchButtonText: {
color: 'white',
fontWeight: 'bold',
textAlign: 'center',
},
generateStatementButton: {
backgroundColor: '#000000',
borderRadius: 5,
padding: 10,
marginVertical: 10,
},
generateStatementButtonText: {
color: 'white',
fontWeight: 'bold',
textAlign: 'center',
},
});

export default SalesScreen;