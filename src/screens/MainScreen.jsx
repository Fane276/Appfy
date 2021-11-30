import React from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import colors from '../assets/colors/colors';
import { useState } from 'react';
import {auth} from '../firebase/firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GradientBackground from '../components/GradientBackground';

import { useTranslation } from 'react-i18next';
import { getUser }from '../firebase/utils/logInWithEmailAndPassword'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarAlt, faHistory, faMapMarkerAlt, faMarker, faUserAlt, faUserAltSlash } from '@fortawesome/free-solid-svg-icons';



const getUserData= async ()=>{
    try{
        var userJson = auth.currentUser;
        var currentUser = await getUser(userJson.uid);
        
        return currentUser;
    }
    catch{
        // de facut ceva aici
    }
}



const MainScreen = ({ navigation, route }) => {
    const { t, i18n } = useTranslation();
    const [userData, setUserData] = useState(null);
    getUserData().then((data)=>{
        setUserData(data);
    })
    return (
      <GradientBackground >
        <View style={styles.logo}>
          <Image
            source={require("../assets/img/AppfyLogo.png")}
            style={{ width: 200, height: 200 }}
          />
        </View>
        <View style={styles.containerButtons}>
          <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Home', { screen: 'ProfileScreen' })}}>
              <FontAwesomeIcon icon={faUserAlt} size={50} color={colors.lightBackground}></FontAwesomeIcon>
              <Text style={styles.buttonText}>{t('lang:profile')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {marginLeft: 20}]} onPress={()=>{navigation.navigate('Home', {screen: 'AppointmentsScreen'})}}>
              <FontAwesomeIcon icon={faCalendarAlt} size={50} color={colors.lightBackground}></FontAwesomeIcon>
              <Text style={styles.buttonText}>{t('lang:appointment')}</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.buttonsRow, {marginTop: 20}]}>
            <TouchableOpacity style={styles.button}>
              <FontAwesomeIcon icon={faHistory} size={50} color={colors.lightBackground}></FontAwesomeIcon>
              <Text style={styles.buttonText}>{t('lang:history')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {marginLeft: 20}]} onPress={()=>{navigation.navigate('Home', { screen: 'MapScreen' })}}>
              <FontAwesomeIcon icon={faMapMarkerAlt} size={50} color={colors.lightBackground}></FontAwesomeIcon>
              <Text style={styles.buttonText}>{t('lang:location')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </GradientBackground>
    );
}

const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    logo:{
      height: "40%", 
      justifyContent: 'center',
      alignItems: 'center'
    },
    containerButtons:{
      margin:20,
      height: "60%", 
    },
    buttonsRow:{
      width:"100%",
      flexDirection: 'row',
      justifyContent: 'center'
    },
    button:{
      width: 150,
      height: 150,
      backgroundColor: colors.darkBackground,
      borderRadius: 10,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20
    },
    buttonText:{
      color: colors.textLight,
      textAlign: 'center',
      marginTop: 8
    }
});

export default MainScreen