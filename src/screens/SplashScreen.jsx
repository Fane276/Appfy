import React, { useEffect } from 'react'
import {  View } from 'react-native'
import GradientBackground from '../components/GradientBackground';
import { Image } from 'react-native-elements';
import {auth} from '../firebase/firebase';

function SplashScreen ({ navigation}){

  useEffect(()=>{
    NavigateToLoginOrHome()
  },[navigation])


  function NavigateToLoginOrHome(){
    setTimeout(function (){
      auth.onAuthStateChanged((user)=>{
        if(user!=null){
          navigation.reset({
            index:0,
            routes:[{name: 'Home'}]
          })
        }
        else{
          navigation.reset({
            index:0,
            routes:[{name: 'Login'}]
          })
        }
      })
    }, 1000)
  }
  return(
    <GradientBackground >
      <View style={{height:'100%', justifyContent: 'center', alignItems: 'center'}}>

      <Image 
        source={require("../assets/img/AppfyLogo.png")}
        style={{width: 200, height: 200}}
        />
      </View>
    </GradientBackground>
  )
}

export default SplashScreen;