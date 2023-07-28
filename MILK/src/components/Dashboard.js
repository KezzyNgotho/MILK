import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import firebase from './firebase'; // Replace with the path to your firebase.js file

const Dashboard = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [{ data: [] }] });
  const [error, setError] = useState(null);
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;
  useEffect(() => {
    const fetchProfitLossData = async () => {
      try {
        if (!currentUser) {
          setError('No user logged in.');
          return;
        }
        const userId = currentUser.uid;
  
        // Fetch sales data from Firestore for the logged-in user
        const salesSnapshot = await db.collection('sales')
          .where('userId', '==', userId)
          .get();
        const salesData = salesSnapshot.docs.map(doc => doc.data());
  
        // Calculate total sales amount
        const totalSalesAmount = salesData.reduce((total, item) => total + item.totalAmount, 0);
  
        // Fetch expenses data from Firestore for the logged-in user
        const expensesSnapshot = await db.collection('expenses')
          .where('userId', '==', userId)
          .get();
        const expensesData = expensesSnapshot.docs.map(doc => doc.data());
  
        // Calculate total expenses amount
        const totalExpensesAmount = expensesData.reduce((total, item) => total + item.amount, 0);
  
        // Calculate profit or loss
        const profitLoss = totalSalesAmount - totalExpensesAmount;
  
        // Set profit or loss to be displayed on the chart
        const chartProfitLoss = profitLoss >= 0 ? profitLoss : -profitLoss;
  
        // Create the chart data
        setChartData({
          labels: ['Total Sales', 'Total Expenses'],
          datasets: [
            {
              data: [totalSalesAmount, -totalExpensesAmount], // Use negative value for expenses to make it go down on the chart
            },
          ],
        });
      } catch (error) {
        console.error(error);
        setError('Failed to fetch data');
      }
    };
  
    fetchProfitLossData();
  }, [currentUser, db]);
  
  return (
    <View>
      <Text style={styles.heading}>Profit/Loss Statistics</Text>
      {chartData.labels && chartData.labels.length > 0 ? (
        <LineChart
          data={{
            labels: chartData.labels,
            datasets: [
              {
                data: chartData.datasets[0].data,
              },
            ],
          }}
          width={350}
          height={459}
          chartConfig={{
            backgroundColor: '#CEF3CE',
            backgroundGradientFrom: '#CEF3CE',
            backgroundGradientTo: '#CEF3CE',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={styles.chart}
        />
      ) : (
        <Text style={styles.errorText}>{error || 'Loading...'}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  chart: {
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#000000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 10,
  },
});

export default Dashboard;
