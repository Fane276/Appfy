import React, { useEffect } from 'react'
import { Image, View } from 'react-native'
import GradientBackground from '../components/GradientBackground';
import { auth } from '../firebase/firebase';

import { useTranslation } from 'react-i18next';

import { logInWithEmailAndPassword } from '../firebase/utils/logInWithEmailAndPassword'
import colors from "../assets/colors/colors"
import { LinearProgress } from 'react-native-elements'

function LoadingScreen({ navigation, route }) {
  
  const { t, i18n } = useTranslation();
  
  useEffect( () => {
    const fetch = async () =>{
      await NavigateToHome()
    }
    fetch();
  }, [navigation]);
  
  
  async function NavigateToHome() {
    const {emailAddress, password} = route.params;
    try{
      await logInWithEmailAndPassword(emailAddress, password);
      auth.onAuthStateChanged((user) => {
        if (user != null) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainScreen' }]
          })
        }
      })

    }
    catch (e){
      alert(e.message);
      // alert(t("lang:invalidLogin"));
      navigation.goBack();
    }
  }

  return (
    <GradientBackground >
      <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require("../assets/img/AppfyLogo.png")}
          style={{ width: 200, height: 200 }}
        />
        <LinearProgress color='#ff8457' style={{ width: 200, borderRadius: 20}}/>
      </View>
    </GradientBackground>
  )
}

export default LoadingScreen;