/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import "./src/localization/IMLocalize";

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faHome, faMapMarkerAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppUserRolesConstants from './src/assets/AppConstants/AppUserRolesConstants';
import AsyncStorageConsts from './src/assets/AppConstants/AsyncStorgeConsts';
import colors from './src/assets/colors/colors'
import AdminAppointmentsScreen from './src/screens/AdminAppointmentsScreen';
import AppointmentsScreen from './src/screens/AppointmentsScreen';
import HomeScreen from "./src/screens/HomeScreen";
import LoadingScreen from './src/screens/LoadingScreen';
import LoginScreen from "./src/screens/LoginScreen";
import MainScreen from './src/screens/MainScreen';
import MapScreen from './src/screens/MapScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RegisterScreen from "./src/screens/RegisterScreen";
import SelectDateScreen from './src/screens/SelectDateScreen';
import SelectHourScreen from './src/screens/SelectHourScreen';
import SplashScreen from './src/screens/SplashScreen';
import AppointmentsHistoryScreen from './src/screens/AppointmentsHistoryScreen';
import AdminSettingsScreen from './src/screens/AdminSettingsScreen';

// import { GoogleSignin } from '@react-native-google-signin/google-signin';








// GoogleSignin.configure({
//   webClientId: '19862592131-bqpjf9l6sf1bs5mpemacp1e52qgieaej.apps.googleusercontent.com',
// });

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const StackAppointment = createStackNavigator();


function Home() {
  const { t } = useTranslation();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const getUserPermission = async () =>{
      var role = await AsyncStorage.getItem(AsyncStorageConsts.userRole);
      setUserRole(role)
    }
    getUserPermission();
  }, [])

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
          else if (route.name === 'AdminAppointmentsScreen') {
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
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false, title: t('lang:profile')}} />
        { userRole != AppUserRolesConstants.administrator && 
          <Tab.Screen
            name="AppointmentsScreen"
            component={AppointmentsScreen}
            options={{ headerShown: false, title: t('lang:appointment') }} />
        }
        { userRole == AppUserRolesConstants.administrator && 
          <Tab.Screen
          name="AdminAppointmentsScreen"
          component={AdminAppointmentsScreen}
          options={{ headerShown: false, title: t('lang:appointments') }} />
        }
      <Tab.Screen
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
            name="AppointmentsHistoryScreen"
            component={AppointmentsHistoryScreen}
            options={{ headerShown: false }} />
        <Stack.Screen
            name="AdminSettingsScreen"
            component={AdminSettingsScreen}
            options={{ headerShown: false }} />
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