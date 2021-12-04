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
import ProfileScreen from './src/screens/ProfileScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import SelectDateScreen from './src/screens/SelectDateScreen';
import SelectHourScreen from './src/screens/SelectHourScreen';
import MapScreen from './src/screens/MapScreen';
import MainScreen from './src/screens/MainScreen';
import AppointmentsScreen from './src/screens/AppointmentsScreen';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { useTranslation } from 'react-i18next';
import "./src/localization/IMLocalize";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser,faHome, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import colors from './src/assets/colors/colors'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';

// GoogleSignin.configure({
//   webClientId: '19862592131-bqpjf9l6sf1bs5mpemacp1e52qgieaej.apps.googleusercontent.com',
// });

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const StackAppointment = createStackNavigator();


function Home() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let icon;

          if (route.name === 'ProfileScreen') {
            icon = faUser;
          } else if (route.name === 'AppointmentsScreen') {
            icon = faCalendarAlt;
          }
          else{
            icon = faMapMarkerAlt;
          }
          return <FontAwesomeIcon icon={icon} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textDisabled,
      })}
    >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false, title: t('lang:profile')}} />
      <Stack.Screen
        name="AppointmentsScreen"
        component={AppointmentsScreen}
        options={{ headerShown: false, title: t('lang:appointment') }} />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ headerShown: false, title: t('lang:location') }} />
        
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{headerShown: false }}
        />
        <Stack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="SelectDate"
          component={SelectDateScreen}
          options={{ headerShown: false  }} />
        <Stack.Screen
          name="SelectHour"
          component={SelectHourScreen}
          options={{ headerShown: false  }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;