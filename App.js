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


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Register() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RegisterUser"
        component={RegisterScreen}
        options={{ headerTitle: "Register user" }} />
    </Stack.Navigator>
  );
}


const App = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  return (
    // <NavigationContainer>
    //   <Stack.Navigator
    //     initialRouteName="Login">
    //     <Tab.Screen
    //       name="Login"
    //       component={LoginScreen}
    //     />
    //     <Stack.Screen
    //       name="RegisterUser"
    //       component={RegisterScreen}
    //       options={{ headerTitle: "Register user" }} />
    //     <Stack.Screen
    //       name="Home"
    //       component={HomeScreen}
    //       options={{ headerTitle: "Home Screen" }} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          >
            {/* {props => <HomeScreen {...props} extraData={user} />} */}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
            >
              {/* {props => <HomeScreen {...props} extraData={user} />} */}
            </Stack.Screen>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerTitle: "Log In" }} />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerTitle: "Register" }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;