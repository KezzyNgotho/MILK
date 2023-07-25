import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import { useTheme } from "react-native-paper";
import { Image } from "react-native";
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import DepositScreen from "../screens/DepositScreen";
import LoginScreen from "../../Screens/LoginScreen";
//import ProfileScreen from "../screens/ProfileScreen";
import SidebarDrawer from '../../Screens/SidebarDrawer';
import MilkScreen from '../../Screens/MilkScreen';
import { MainStackNavigator, ContactStackNavigator } from "./StackNavigator";

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      activeColor={colors.primary}
      inactiveColor={colors.onBackground}
      barStyle={{ backgroundColor: 'white' }}
      initialRouteName='Homescreen'
    >
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../Screens/assets/icons8-home-64.png')}
              style={{ tintColor: color, width: 26, height: 26 }}
            />
          ),
        }}
        name="Homescreen" component={MainStackNavigator} />
      <Tab.Screen
        options={{
          tabBarLabel: 'SidebarDrawer',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../Screens/assets/menu.png')}
              style={{ tintColor: color, width: 26, height: 26 }}
            />
          ),
        }}
        name="SidebarDrawer" component={SidebarDrawer} />

      {/* navigationOptions:()=>{
          return {
            tabBarVisible:false,
          };
      */}
      <Tab.Screen
        options={{
          tabBarLabel: 'Milk',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../Screens/assets/icons8-milk-16.png')}
              style={{ tintColor: color, width: 26, height: 26 }}
            />
          ),
        }}
        name="MilkScreen" component={MilkScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
