import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Dashboard from '../components/Dashboard';
//import BottomTabNavigator from '../components/BottomTabNavigator';
//import HomeScreenWithTabs from '../components/HomeScreenWithTabs';


function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* User Profile and Notification Bell */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('SidebarDrawer')}>
        <View style={styles.profile}>
          <Image
            source={require('../../src/Screens/assets/wooow.png')}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>ZOE FARM</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
        <View style={styles.profile}>
        <Image
          source={require('../../src/Screens/assets/icons8-bell-50.png')}
          style={styles.profileImage}
        />
         </View>
        </TouchableOpacity>
      </View>

      {/* Icon Buttons Card */}
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cattle')}
          style={styles.cardButton}
          key="cattle">
        <View style={styles.profile}>
        <Image
          source={require('../../src/Screens/assets/prof.png')}
          style={styles.profileImage}
        />
         </View>
          <Text style={styles.cardButtonText}>Cattle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Milk')}
          style={styles.cardButton}
          key="milk"
        >
        <View style={styles.profile}>
        <Image
          source={require('../../src/Screens/assets/icons8-milk-50.png')}
          style={styles.profileImage}
        />
         </View>
          <Text style={styles.cardButtonText}>Milk Produced</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Sales')}
          style={styles.cardButton}
          key="sales"
        >
        <View style={styles.profile}>
        <Image
          source={require('../../src/Screens/assets/icons8-fund-accounting-24.png')}
          style={styles.profileImage}
        />
         </View>
          <Text style={styles.cardButtonText}>Sales</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Expenses')}
          style={styles.cardButton}
          key="expenses"
        >
        <View style={styles.profile}>
        <Image
          source={require('../../src/Screens/assets/icons8-debt-50.png')}
          style={styles.profileImage}
        />
         </View>
          <Text style={styles.cardButtonText}>Expenses</Text>
        </TouchableOpacity>
      </View>

      {/* Dashboard */}
      <View style={styles.dashboard}>
        <Dashboard />
      </View>
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop:20
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,

    borderRadius: 20,
    marginRight: 5,
    backgroundColor: '#CEF3CE',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#CEF3CE',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  cardButton: {
    alignItems: 'center',
  },
  cardButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 15,
  },
  dashboard: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 1,
    marginBottom: 15,
  },
  bottomNavigation: {
    marginBottom: 5,
  },
});

export default HomeScreen;