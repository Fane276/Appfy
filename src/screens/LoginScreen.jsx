import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, SafeAreaView, Pressable } from 'react-native'

import colors from '../assets/colors/colors';

import { logInWithEmailAndPassword } from '../firebase/utils/logInWithEmailAndPassword'

const LoginScreen = ({ navigation, route }) => {
  console.log(route);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginPress = async () => {
    const userData = await logInWithEmailAndPassword(email, password)
    if (userData) {
      navigation.navigate("Home")
      // navigation.navigate("Home", { user })
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View>

          <TextInput
            style={styles.textInput}
            placeholder="email"
            placeholderTextColor={colors.textDisabled}
            onChangeText={email => setEmail(email)}
            defaultValue={email}
          />
          <TextInput
            style={styles.textInput}
            placeholder="password"
            placeholderTextColor={colors.textDisabled}
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}
            defaultValue={password}
          />
          <View style={styles.actionWraper}>
            <Pressable
              onPress={async () => {
                navigation.navigate('Register')
              }}
            >
              <Text style={styles.textAction}>
                Register
              </Text>
            </Pressable>
            <Pressable>
              <Text style={styles.textAction}>
                Forgot password?
              </Text>
            </Pressable>
          </View>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? colors.secondary : colors.primary,
              },
              styles.loginButton]}
            onPress={async () => {
              await onLoginPress()
            }}>
            <Text style={styles.loginButtonText}>Login</Text>

          </Pressable>
          <Text
            style={styles.centerText}>
            - or -
          </Text>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? colors.background : colors.textLight,
              }, styles.socialButton]}
            onPress={async () => {
            }}
          >
            <Text style={styles.socialButtonText}>
              Google
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? colors.background : colors.textLight,
              }, styles.socialButton]}
            onPress={async () => {

            }}
          >
            <Text style={styles.socialButtonText}>
              Facebook
            </Text>

          </Pressable>
        </View>
      </SafeAreaView>
    </View>

  )
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  textInput: {
    height: 40,
    backgroundColor: colors.inputBackground,
    color: colors.textDark,
    borderColor: colors.textDisabled,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 5,
    paddingLeft: 10,
  },
  loginButton: {
    height: 40,
    borderRadius: 20,
    // backgroundColor: colors.primary,
    shadowOpacity: 1,
    shadowRadius: 3,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    padding: 5,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textLight,
  },
  socialButton: {
    height: 40,
    borderRadius: 20,
    // backgroundColor: colors.primary,
    shadowOpacity: 1,
    shadowRadius: 3,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.textDisabled,
    borderWidth: 1,
  },
  socialButtonText: {
    padding: 5,
    textAlign: 'center',
    fontSize: 18,
    color: colors.textDark,
  },
  centerText: {
    height: 20,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 18,
    color: colors.textDark,
    marginTop: 20,
    marginBottom: 20,
  },
  actionWraper: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textAction: {
    color: colors.primary,
  }
});



export default LoginScreen;