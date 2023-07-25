import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import milkIcon from '../Screens/assets/icons8-milk-16.png';
import userIcon from '../Screens/assets/account_circle_off_FILL0_wght400_GRAD0_opsz48.png';
import farmIcon from '../Screens/assets/wooow.png';
import helpIcon from '../Screens/assets/call_quality_FILL0_wght400_GRAD0_opsz48.png';
import inviteIcon from '../Screens/assets/icons8-friends-48.png';
import backIcon from '../Screens/assets/back-icon.png';
import SetMilkPricesForm from '../components/SetMilkPricesForm';

function SidebarDrawer() {
  const navigation = useNavigation();
  const [showMilkPricesForm, setShowMilkPricesForm] = useState(false);

  const handleSetMilkPrices = () => {
    setShowMilkPricesForm(true);
  };

  const handleGoBack = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Our Profile</Text>

      <TouchableOpacity style={styles.menuItem} onPress={handleSetMilkPrices}>
        <Image source={milkIcon} style={styles.icon} />
        <Text style={styles.text}>Set Milk Prices</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Image source={userIcon} style={styles.icon} />
        <Text style={styles.text}>User Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Image source={farmIcon} style={styles.icon} />
        <Text style={styles.text}>Farm Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Image source={helpIcon} style={styles.icon} />
        <Text style={styles.text}>Help Centre</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Image source={inviteIcon} style={styles.icon} />
        <Text style={styles.text}>Invite a Friend</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleGoBack}>
        <Image source={backIcon} style={styles.icon} />
        <Text style={styles.text}>Back</Text>
      </TouchableOpacity>

      {/* Render Milk Prices Form if showMilkPricesForm is true */}
      {showMilkPricesForm && <SetMilkPricesForm />}

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2023 kezzydairy. All rights reserved.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 30,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  text: {
    fontSize: 17,
    color: 'black',
  },
  footer: {
    marginTop: 'auto',
    borderTopWidth: 1,
    borderTopColor: 'gray',
    paddingTop: 10,
  },
  footerText: {
    textAlign: 'center',
    color: 'gray',
  },
});

export default SidebarDrawer;
