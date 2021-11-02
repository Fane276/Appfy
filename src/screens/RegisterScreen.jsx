import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, Alert } from 'react-native'

import GradientBackground from '../components/GradientBackground';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEnvelope, faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { useForm, useFormState } from 'react-hook-form';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FormInput from '../components/FormInput';
import colors from '../assets/colors/colors';

import { registerUserWithEmailAndPassword } from '../firebase/utils/registerWithEmailAndPassword'

const RegisterScreen = ({ navigation, route }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      emailAddress: '',
      password: ''
    },
    mode: "onBlur"
  });

  const onSubmit = async (data) => {
    try {
      if (dirtyFields) {
        await registerUserWithEmailAndPassword(data)
        navigation.navigate("Home")
      }
      else {
        Alert.alert("Please provide valid sign in information")
      }
    }
    catch (error) {
      Alert.alert(error.message)
    }
  };

  const { dirtyFields } = useFormState({
    control
  });

  return (
    <GradientBackground style={styles.background}>

      <View style={styles.container}>
        <SafeAreaView>
          <View>
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/img/AppfyLogo.png")}
                style={styles.logo}
              />
            </View>

            <FormInput
              rules={{
                require: true
              }}
              icon={
                <FontAwesomeIcon icon={faUser} color={colors.lightBackground} />
              }
              placeholder="First name and last name"
              label="Full Name"
              name="fullName"
              errorMessage="This field should not be empty"
              control={control}
            />
            <FormInput
              rules={{
                require: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address"
                }
              }}
              icon={
                <FontAwesomeIcon icon={faEnvelope} color={colors.lightBackground} />
              }
              placeholder="email@address.com"
              label="Email address"
              name="emailAddress"
              errorMessage="Please provide a valid email address"
              control={control}
            />
            <FormInput
              rules={{
                require: true,
                pattern: null
              }}
              secure={true}
              icon={
                <FontAwesomeIcon icon={faLock} color={colors.lightBackground} />
              }
              placeholder="Password"
              label="Password"
              name="password"
              errorMessage="Please enter a password"
              control={control}
            />
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleSubmit(onSubmit)}>
              <Text style={styles.loginButtonText}>Register</Text>

            </TouchableOpacity>

            <View style={styles.registerWraper}>
              <Text style={styles.registerMessage}>
                Already have an account?
              </Text>
              <TouchableOpacity
                onPress={async () => {
                  navigation.navigate('Login')
                }}
              >
                <Text style={styles.register}>
                  Log in
                </Text>
              </TouchableOpacity>
            </View>


          </View>
        </SafeAreaView>
      </View>
    </GradientBackground>
  )
};



const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 50,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    height: 200,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center'
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
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    marginTop: 10,
    marginHorizontal: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    padding: 5,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  socialButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: colors.lightBackground,
    shadowOpacity: 1,
    shadowRadius: 3,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.textDisabled,
    borderWidth: 1,
    shadowRadius: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: colors.textDisabled,
    // borderWidth: 1,
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
  registerWraper: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPassword: {
    color: colors.primary,
    textAlign: 'center',
    marginTop: 10
  },
  register: {
    color: colors.primary,
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
    marginLeft: 5
  },
  registerMessage: {
    color: colors.textDark,
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  }
});



export default RegisterScreen;