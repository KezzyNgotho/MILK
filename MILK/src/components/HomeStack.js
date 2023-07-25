import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import CattleScreen from '../Screens/CattleScreen';
import StatementsScreen from '../Screens/StatementsScreen';
import MilkScreen from '../Screens/MilkScreen';
import SalesScreen from '../Screens/SalesScreen';
import ExpenseScreen from '../Screens/ExpenseScreen';
import NotificationScreen from '../Screens/NotificationScreen';
import SidebarDrawer from '../Screens/SidebarDrawer';
import Sidebar from './Sidebar';


const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Cattle" component={CattleScreen} />
      <Stack.Screen name="Statements" component={StatementsScreen} />
      <Stack.Screen name="Milk" component={MilkScreen} />
      <Stack.Screen name="Sales" component={SalesScreen} />
      <Stack.Screen name="Expenses" component={ExpenseScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="SidebarDrawer" component={SidebarDrawer} />
      <Stack.Screen name="Sidebarr" component={Sidebar} />
   
    </Stack.Navigator>
  );
};

export default HomeStack;
