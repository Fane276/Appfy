import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, Alert, Image } from 'react-native'
import { useTranslation } from 'react-i18next';

import colors from '../assets/colors/colors';

// import { googleSignIn } from '../firebase/utils/googleSignIn'

import GradientBackground from '../components/GradientBackground';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faFacebookF, faApple } from '@fortawesome/free-brands-svg-icons'
import { useForm, useFormState } from 'react-hook-form';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import FormInput from '../components/FormInput';
import { Dimensions } from 'react-native';
import { useState } from 'react';
import { Overlay } from 'react-native-elements/dist/overlay/Overlay';


const screenHeight = Dimensions.get('screen').height;

function LoginScreen({ navigation, route }) {
  const [visible, setVisible] = useState(false);
  const { t, i18n } = useTranslation();
  
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
        navigation.navigate("LoadingScreen", {emailAddress, password})
      }
      else {
        Alert.alert(t('lang:invalidLogin'))
      }
    }
    catch (error) {
      Alert.alert(t("lang:anErrorOccurred"))
      // Alert.alert(error.message)
    }
  };

  const { dirtyFields } = useFormState({
    control
  });

  // const onGoogleButtonPress = async () => {
  //   try {
  //     await googleSignIn();
  //   }
  //   catch (error) {
  //     Alert.alert(error.message)
  //   }
  // }

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const languageList = [
    {
        name: t('lang:english'),
        code: 'en'
    },
    {
        name: t('lang:romanian'),
        code: 'ro'
    },
    {
        name: t('lang:german'),
        code: 'de'
    },
]
  return (
    <ScrollView >
    <GradientBackground style={styles.background}>
      
      <View style={styles.container}>
        <SafeAreaView>
          <View>
            <View style={styles.topButtonsContainer}>
              <TouchableOpacity
                  style={styles.changeLanguageButton}
                  onPress={toggleOverlay}>
                  <FontAwesomeIcon icon={faLanguage} color={colors.textLight} />
              </TouchableOpacity>
            </View>
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/img/AppfyLogo.png")}
                style={styles.logo}
              />
            </View>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlayStyle}>
            {
                languageList.map(item => (
                    <View>
                        <TouchableOpacity style={styles.languageButton} onPress={()=>{i18n.changeLanguage(item.code); toggleOverlay()}} >
                            <Text style={styles.languageButtonText}>{item.name}</Text>
                        </TouchableOpacity>
                        <View style={item.code=="de"?{height:0.5, backgroundColor: colors.textDisabled}: {display:'none'}}></View>
                    </View>
                ))
            }
            </Overlay>
            <FormInput
              rules={{
                require: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('lang:errInvalidEmail')
                }
              }}
              icon={
                <FontAwesomeIcon icon={faEnvelope} color={colors.lightBackground} />
              }
              keyboardType={'email-address'}
              placeholder="email@address.com"
              label={t('lang:email')}
              name="emailAddress"
              errorMessage={t('lang:invalidEmail')}
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
              placeholder={t('lang:password')}
              label={t('lang:password')}
              name="password"
              errorMessage={t('lang:errPassword')}
              control={control}
            />
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleSubmit(onSubmit)}>
              <Text style={styles.loginButtonText}>{t('lang:login')}</Text>

            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>
                {t('lang:forgotPassword')}
              </Text>
            </TouchableOpacity>

            {/* <View style={styles.registerWraper}>
              <TouchableOpacity
                style={styles.socialButton}
                // onPress={onGoogleButtonPress}
                >
                <FontAwesomeIcon icon={faGoogle} color={"#4267B2"} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesomeIcon icon={faFacebookF} color={"#4267B2"} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesomeIcon icon={faApple} color={"#4267B2"} />
              </TouchableOpacity>
            </View> */}
            <View style={styles.registerWraper}>
              <Text style={styles.registerMessage}>
                {t('lang:noAccount')}
              </Text>
              <TouchableOpacity
                onPress={async () => {
                  navigation.navigate('Register')
                }}
              >
                <Text style={styles.register}>
                  {t('lang:register')}
                </Text>
              </TouchableOpacity>
            </View>
                

          </View>
        </SafeAreaView>
      </View>
    </GradientBackground>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 50,
    height:screenHeight
  },
  topButtonsContainer:{
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  changeLanguageButton:{
    height: 50,
    width: 50,
    borderRadius: 30,
    backgroundColor: colors.darkBackground,
    borderColor: colors.textDark,
    borderWidth: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
  
  languageButtonText:{
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.textLight,
  },
  overlayStyle:{
      backgroundColor: colors.darkBackground,
      zIndex: 2000
  },
  languageButton:{
      width: 200,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.darkBackground

  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  background:{
    backgroundColor: colors.darkBackground,
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
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.textDisabled,
    borderWidth: 1,
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
    color: colors.labelColor,
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  }
});



export default LoginScreen;