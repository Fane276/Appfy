import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, Alert } from 'react-native'
import GradientBackground from '../components/GradientBackground';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEnvelope, faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { useForm, useFormState } from 'react-hook-form';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import FormInput from '../components/FormInput';
import colors from '../assets/colors/colors';
import { useTranslation } from 'react-i18next';
import { registerUserWithEmailAndPassword } from '../firebase/utils/registerWithEmailAndPassword'
import { Dimensions } from 'react-native';


const screenHeight = Dimensions.get('screen').height;

const RegisterScreen = ({ navigation, route }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      emailAddress: '',
      password: ''
    },
    mode: "onBlur"
  });

  const { t, i18n } = useTranslation();

  const onSubmit = async (data) => {
    try {
      if (dirtyFields) {
        await registerUserWithEmailAndPassword(data)
        navigation.navigate("Home")
      }
      else {
        Alert.alert(t('lang:invalidLogin'))
      }
    }
    catch (error) {
      Alert.alert(t("lang:anErrorOccurred"))
    }
  };

  const { dirtyFields } = useFormState({
    control
  });

  return (
    <ScrollView>

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
              placeholder={t('lang:name')}
              label={t('lang:name')}
              name="name"
              errorMessage={t('lang:errName')}
              control={control}
            />
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
              <Text style={styles.loginButtonText}>{t('lang:register')}</Text>

            </TouchableOpacity>

            <View style={styles.registerWraper}>
              <Text style={styles.registerMessage}>
                {t('lang:existentAccount')}
              </Text>
              <TouchableOpacity
                onPress={async () => {
                  navigation.navigate('Login')
                }}
              >
                <Text style={styles.register}>
                  {t('lang:login')}
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