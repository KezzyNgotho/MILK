import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { MainStackNavigator, LoginStackNavigator } from '../MILK/src/components/navigation/StackNavigator';
import firebase from '../MILK/src/components/firebase'; // Import the firebase.js file

const Lighttheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#CEF3CE',
    primary: '#CEF3CE',
    accent: '#CEF3CE',
  },
};

const Darktheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'red',
    primary: 'black',
    accent: '#CEF3CE',
  },
};

const App = () => {
  const isDarkTheme = 'dark';

  return (
    <PaperProvider theme={isDarkTheme === 'dark' ? Darktheme : Lighttheme}>
      <NavigationContainer>
        <LoginStackNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
