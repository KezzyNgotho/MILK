import React from "react";


import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import DepositScreen from "../screens/DepositScreen";

//import WithdrawScreen from "../screens/WithdrawScreen";
//import PendingScreen from "../screens/PendingScreen";
//import FirstScreen from "../screens/FirstScreen";

//import OpenScreen from "../screens/OpenScreen";
import BottomTabNavigator from "./TabNavigator";
//import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from '../../Screens/HomeScreen';

import CattleScreen from '../../Screens/CattleScreen';

import MilkScreen from '../../Screens/MilkScreen';
import SalesScreen from '../../Screens/SalesScreen';
import ExpenseScreen from '../../Screens/ExpenseScreen';
import NotificationScreen from '../../Screens/NotificationScreen';
import SidebarDrawer from '../../Screens/SidebarDrawer';
import SignUpScreen from "../../Screens/SignUpScreen";
import LoginScreen from '../../Screens/LoginScreen';

const Stack = createNativeStackNavigator();

const screenOptionStyle = {
  headerStyle: {
  },
  headerShown: false,
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName={"HomeScreen"}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Cattle" component={CattleScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Milk" component={MilkScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Sales" component={SalesScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Expenses" component={ExpenseScreen} />
       <Stack.Screen options={{ headerShown: false }} name="Notication" component={NotificationScreen} />
      <Stack.Screen options={{ headerShown: false }} name="SidebarDrawer" component={SidebarDrawer} />
     
    </Stack.Navigator>
  );
}

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} >
      {/* <Stack.Screen name="ProfileScreen" component={ProfileScreen} /> */}

    
      <Stack.Screen name="Signup" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />



    </Stack.Navigator>
  );
}

export { MainStackNavigator, LoginStackNavigator };