import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native'
import { Image } from 'react-native-elements';

import colors from '../assets/colors/colors';

import { logInWithEmailAndPassword } from '../firebase/utils/logInWithEmailAndPassword'
import { googleSignIn } from '../firebase/utils/googleSignIn'

import GradientBackground from '../components/GradientBackground';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faFacebookF, faApple } from '@fortawesome/free-brands-svg-icons'
import { useForm, useFormState } from 'react-hook-form';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FormInput from '../components/FormInput';


function LoginScreen({ navigation, route }) {

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      emailAddress: '',
      password: ''
    },
    mode: "onBlur"
  });

  const onSubmit = async ({ emailAddress, password }) => {
    try {
      if (dirtyFields) {
        await logInWithEmailAndPassword(emailAddress, password)
        navigation.navigate("Home")
      }
      else {
        Alert.alert("Please provide valid login information")
      }
    }
    catch (error) {
      Alert.alert(error.message)
    }
  };

  const { dirtyFields } = useFormState({
    control
  });

  const onGoogleButtonPress = async () => {
    try {
      await googleSignIn();
    }
    catch (error) {
      Alert.alert(error.message)
    }
  }

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
              <Text style={styles.loginButtonText}>Login</Text>

            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>
                Forgot password?
              </Text>
            </TouchableOpacity>

            <View style={styles.registerWraper}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={onGoogleButtonPress}>
                <FontAwesomeIcon icon={faGoogle} color={"#4267B2"} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesomeIcon icon={faFacebookF} color={"#4267B2"} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesomeIcon icon={faApple} color={"#4267B2"} />
              </TouchableOpacity>
            </View>
            <View style={styles.registerWraper}>
              <Text style={styles.registerMessage}>
                Dont have and account?
              </Text>
              <TouchableOpacity
                onPress={async () => {
                  navigation.navigate('Register')
                }}
              >
                <Text style={styles.register}>
                  Register
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



export default LoginScreen;