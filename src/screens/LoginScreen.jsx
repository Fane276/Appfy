
import React, { useState  } from 'react'
import {View, Text, TextInput,StyleSheet, SafeAreaView, Pressable, Alert } from 'react-native'
import { Image, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


import colors from '../assets/colors/colors';

import { logInWithEmailAndPassword } from '../firebase/utils/logInWithEmailAndPassword'

import GradientBackground from '../components/GradientBackground';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEgg, faEnvelope, faGhost, faLock } from '@fortawesome/free-solid-svg-icons'
import { useController, useForm, useFormState } from 'react-hook-form';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FormInput from '../components/FormInput';
import { SocialIcon } from 'react-native-elements'



function LoginScreen ({ navigation, route}){
  console.log(route);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues:{
      emailAddress:'',
      password:''
    },
    mode: "onBlur"
  });
  const onSubmit = (data) => {
    if(dirtyFields){
      Alert.alert(JSON.stringify(data))
      onLoginPress()
    }
  };
  const { dirtyFields } = useFormState({
    control
  });

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
                <FontAwesomeIcon icon={ faEnvelope } color={colors.lightBackground} />
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
                <FontAwesomeIcon icon={ faLock } color={colors.lightBackground} />
              }
              placeholder="Password"
              label="Password"
              name="password" 
              errorMessage="Please enter a password"
              control={control} 
            />
            <TouchableOpacity 
              style = {styles.loginButton}
              onPress={handleSubmit(onSubmit)}>
              <Text style={styles.loginButtonText}>Login</Text>

            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>
                Forgot password?
              </Text>
            </TouchableOpacity>
            
            <View style={styles.registerWraper}>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesomeIcon icon={ faGhost } color={"#4267B2"}/>
              </TouchableOpacity>
            </View>  
            <View style={styles.registerWraper}>
              <Text style={styles.registerMessage}>
                  Dont have and account?
              </Text>
              <TouchableOpacity 
                onPress={async ()=>{
                  navigation.navigate('RegisterUser')
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
  container:{
    padding:10,
    paddingTop: 50,
  },
  logoContainer:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo:{
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
  loginButton:{
    height:60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    shadowOpacity: 1,
    shadowRadius: 3,
    marginTop: 10,
    marginHorizontal: 60,
    justifyContent:'center',
    alignItems:'center',
  },
  loginButtonText: {
    padding: 5,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  socialButton:{
    height:40,
    width:40,
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
    justifyContent:'center',
    alignItems:'center',
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
  registerWraper:{
    marginTop:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center',
  },
  forgotPassword:{
    color: colors.primary,
    textAlign: 'center',
    marginTop: 10
  },
  register:{
    color: colors.primary,
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
    marginLeft: 5
  },
  registerMessage:{
    color: colors.textDark,
    textAlign: 'center',
    flexDirection:'row',
    alignItems:'center',
  }
});



export default LoginScreen;