import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import firebase from './firebase'; // Replace with the path to your firebase.js file

const Dashboard = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [{ data: [] }] });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfitLossData = () => {
      try {
        // Fetch profit/loss data from Firebase Realtime Database
        const databaseRef = firebase.database().ref('profitloss');
        databaseRef.on('value', (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const labels = Object.keys(data);
            const datasets = [
              {
                data: Object.values(data),
              },
            ];
            setChartData({ labels, datasets });
          } else {
            setChartData({ labels: [], datasets: [{ data: [] }] });
          }
        });
      } catch (error) {
        console.error(error);
        setError('Failed to fetch data');
      }
    };

    fetchProfitLossData();
  }, []);

 
// Rest of the component code...


  /* useEffect(() => {
    const fetchProfitLossData = async () => {
      try {
        const response = await axios.get('http://192.168.0.103:4000/profitloss');
        setChartData({
          labels: response.data.map(data => data.month),
          datasets: [
            {
              data: response.data.map(data => data.profitLoss),
            },
          ],
        });
      } catch (error) {
        console.error(error);
        setError('Failed to fetch data');
      }
    }; 

     fetchProfitLossData();
  }, []);
  */
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
