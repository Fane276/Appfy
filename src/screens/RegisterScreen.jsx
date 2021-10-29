import React, { useState } from 'react'
import {View, Button,Text, TextInput,StyleSheet, SafeAreaView, Pressable, Image, ScrollView} from 'react-native'

import colors  from '../assets/colors/colors';

  


const RegisterScreen = ({ navigation, route})=>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSecound, setPasswordSecound] = useState('');

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
            onChangeText={passwordSecound => setPasswordSecound(passwordSecound)}
            defaultValue={passwordSecound}
          />
          <Pressable 
            style = {({pressed}) => [
              {
                backgroundColor: pressed ? colors.secondary : colors.primary,
              },
              styles.loginButton]}
            onPress={async ()=>{
              
            }}
            >
              <Text style={styles.loginButtonText}>Register</Text>
            </Pressable>
          <Pressable 
            style = {({pressed}) => [
              {
                backgroundColor: pressed ? colors.textDisabled : colors.textLight,
              },
              styles.lightButton]}
            onPress={()=>{
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
  container:{
    padding:10,
  },
  textInput:{
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
    height:40,
    borderRadius: 20,
    // backgroundColor: colors.primary,
    shadowOpacity: 1,
    shadowRadius: 3,
    marginTop: 10,
    justifyContent:'center',
    alignItems:'center',
  },
  loginButtonText:{
    padding: 5,
    textAlign:'center',
    fontSize:18,
    fontWeight: 'bold',
    color: colors.textLight,
  },
  icon:{
    width:150,
    height:150,
    alignSelf:'center',
  },
  lightButton:{
    height:40,
    borderRadius: 20,
    // backgroundColor: colors.primary,
    shadowOpacity: 1,
    shadowRadius: 3,
    marginTop: 10,
    justifyContent:'center',
    alignItems:'center',
    borderColor: colors.textDisabled,
    borderWidth: 1,
  },
  lightButtonText:{
    padding: 5,
    textAlign:'center',
    fontSize:18,
    color: colors.textDark,
  },
  centerText:{
    height:20,
    textAlign:'center',
    alignSelf:'center',
    fontSize:18,
    color: colors.textDark,
    marginTop: 20,
    marginBottom: 20,
  },
  actionWraper:{
    marginTop:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between',
  },
  textAction:{
    color: colors.primary,
  }
});



export default RegisterScreen;