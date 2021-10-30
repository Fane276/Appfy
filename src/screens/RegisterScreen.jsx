import React, { useState } from 'react'
import { View, Button, Text, TextInput, StyleSheet, SafeAreaView, Pressable, Image, ScrollView } from 'react-native'

import colors from '../assets/colors/colors';

import { auth, firestore } from '../firebase/firebase'

const RegisterScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onRegisterPress = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.")
      return
    }
    await auth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        alert(error)
      })
      .then((response) => {
        const uid = response.user.uid
        const data = {
          id: uid,
          email
        };
        const usersRef = firestore.collection('users')
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate('Home', { user: data })
          })
          .catch((error) => {
            alert(error)
          });
      })
      .catch((error) => {
        alert(error)
      });
  }

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.container}>
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
          <TextInput
            style={styles.textInput}
            placeholder="password again"
            placeholderTextColor={colors.textDisabled}
            secureTextEntry={true}
            onChangeText={passwordSecound => setConfirmPassword(passwordSecound)}
            defaultValue={confirmPassword}
          />
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? colors.secondary : colors.primary,
              },
              styles.loginButton]}
            onPress={onRegisterPress}
          >
            <Text style={styles.loginButtonText}>Register</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? colors.textDisabled : colors.textLight,
              },
              styles.lightButton]}
            onPress={async () => {
              navigation.navigate('Login')
            }}
          >
            <Text style={styles.lightButtonText}>Go to Login</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
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
  icon: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  lightButton: {
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
  lightButtonText: {
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



export default RegisterScreen;