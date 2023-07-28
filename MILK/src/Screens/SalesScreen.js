import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

import { useNavigation } from '@react-navigation/native';

const SalesScreen = () => {
  const [salesData, setSalesData] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [totalWeeklySales, setTotalWeeklySales] = useState(0);
  const [totalMonthlySales, setTotalMonthlySales] = useState(0);
  const currentUser = firebase.auth().currentUser;
  const navigation = useNavigation();
  const db = firebase.firestore();

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      if (!currentUser) {
        console.error('No user logged in.');
        return;
      }
      const userId = currentUser.uid;
  
      const snapshot = await db.collection('sales').where('userId', '==', userId).get();
      const data = snapshot.docs.map(doc => doc.data());
      setSalesData(data);
      calculateTotalSales(data);
    } catch (error) {
      console.error('Failed to fetch sales data', error);
    }
  };
  

  const handleSearchDate = () => {
    const selectedSales = salesData.find(item => item.date === searchDate);
    if (selectedSales) {
      console.log(`Sales on ${searchDate}: ${selectedSales.totalAmount}`);
    } else {
      console.log('No sales found for the selected date.');
    }
  };

  const calculateTotalSales = (data) => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      console.error('No user logged in.');
      return {
        dailySales: 0,
        weeklySales: 0,
        monthlySales: 0,
      };
    }

    const userId = currentUser.uid;

    // Fetch milk price for the logged-in user
    const milkPrice = data.reduce((price, item) => {
      if (item.userId === userId) {
        return item.pricePerLiter;
      }
      return price;
    }, 0);

    // Fetch milk usage data for the logged-in user
    const userMilkUsageData = data.filter((item) => item.userId === userId);

    // Calculate the total sales for daily, weekly, and monthly
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;

    const dailySales = userMilkUsageData.reduce(
      (sum, item) => {
        const itemDate = new Date(item.date);
        return itemDate.toDateString() === today.toDateString() ? sum + item.totalAmount : sum;
      },
      0
    );

    const weeklySales = userMilkUsageData.reduce(
      (sum, item) => {
        const itemDate = new Date(item.date);
        return today.getTime() - itemDate.getTime() <= oneWeek ? sum + item.totalAmount : sum;
      },
      0
    );

    const monthlySales = userMilkUsageData.reduce(
      (sum, item) => {
        const itemDate = new Date(item.date);
        return today.getTime() - itemDate.getTime() <= oneMonth ? sum + item.totalAmount : sum;
      },
      0
    );

    setTotalWeeklySales(weeklySales);
    setTotalMonthlySales(monthlySales);
  };

  // ... Rest of your code ...

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

/*   const renderSalesData = () => {
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
 */
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
