/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useState } from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SplashScreen from './src/screens/SplashScreen';
//import ProfileScreen from './src/screens/ProfileScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


import "./src/IMLocalize";

// GoogleSignin.configure({
//   webClientId: '19862592131-bqpjf9l6sf1bs5mpemacp1e52qgieaej.apps.googleusercontent.com',
// });

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        >
        </Stack.Screen>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        >
        </Stack.Screen>
        <Stack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          options={{ headerShown: false }} 
        >
        </Stack.Screen>
        {/* <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
        >
        </Stack.Screen> */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;