import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageConsts from '../assets/AppConstants/AsyncStorgeConsts'
import colors from '../assets/colors/colors';
import { useState } from 'react';
import { Avatar, Header } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from 'react-native';
import { Overlay } from 'react-native-elements';
import { ListItem } from 'react-native-elements';
import { useTranslation } from 'react-i18next'
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../firebase/firebase';
import { getUser } from '../firebase/utils/logInWithEmailAndPassword';

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



const ProfileScreen = ({ navigation, route }) => {
    // const [userData, setUserData] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [visible, setVisible] = useState(false);
    const { t, i18n } = useTranslation();

    const [userData, setUserData] = useState(null);
    getUserData().then((data)=>{
        setUserData(data);
    });
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
        <View sytle={styles.container}>
            <Header
                placement="center"
                leftComponent={
                    <TouchableOpacity
                    onPress={() => { navigation.navigate("MainScreen")}}
                    >
                    <FontAwesomeIcon icon={faAngleLeft} color={colors.lightBackground} />
                    </TouchableOpacity>
                }
                centerComponent={{ text: t('lang:profile'), style: { color: '#fff' } }}
                backgroundColor = {colors.darkBackground}
                containerStyle= {{borderWidth: 0}}
                />
            <LinearGradient style={styles.containerAvatar}
                colors={['#28313b','#485461']}
                start={{
                    x: 1,
                    y: 0
                }}
                end={{
                    x: 1,
                    y: 1
                }}
                >
                </LinearGradient>
            <View style={styles.avatarInfoContainer}>
                <View>

                    <Avatar
                            size = 'xlarge'
                            rounded
                            title={userData==null || userData.email=="" ? "P":userData.emailAddress[0]}
                            source={require("../assets/img/profile_icon3.png")}
                            containerStyle = {styles.avatar}
                            />
                </View>
            
            {/* <View style={styles.containerAvatar}> */}
            {/* <Svg
                width="600"
                height="600"
                fill={colors.lightBackground}
                viewBox="0 0 544 544"
                >
                <Path stroke="#000" id="svg_3" d="m76,384.38226l0,-232.38226l475,0l0,136.02864c0,0.18438 -105,-58.09557 -220,35.42413c-115,93.51969 -255,60.9295 -255,60.9295z" opacity="NaN" />
                </Svg> */}
            {/* </View> */}
        <View style={styles.infoContainer}>
            <Text style={styles.userName}>{userData==null ? "Profile":userData.name}</Text>
            <Text style={styles.email}>{userData==null ? "Profile":userData.emailAddress}</Text>
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
            
            <TouchableOpacity
                style = {styles.profileButton}
                onPress={toggleOverlay}
            >
                <Text style ={styles.lightButtonText}>{t('lang:changeLanguage')}</Text>
                <FontAwesomeIcon icon={faAngleRight} color={colors.textDark}></FontAwesomeIcon>
            </TouchableOpacity>
            
            <View>
                <TouchableOpacity
                    style = {styles.profileButton}
                    onPress={() => {navigation.navigate("SelectDate")}}   
                >
                    <Text>{t('lang:makeAppointment')}</Text>
                </TouchableOpacity>
            </View>
            
            <View>
                <TouchableOpacity
                    style = {styles.profileButton}
                    onPress={async () => {await auth.signOut();}}   
                >
                    <Text>{t('lang:logout')}</Text>
                </TouchableOpacity>
            </View>
        </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.primary,
    },
    overlayStyle:{
        backgroundColor: colors.darkBackground
    },
    infoContainer:{
        backgroundColor: colors.lightBackground,
        height: '80%',
        position: 'relative',
        top: -40
    },
    languageButton:{
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.darkBackground

    },
    containerAvatar: {
        backgroundColor: colors.darkBackground,
        height: '20%'
    },
    chevronDown: {
        display: "none",
    },
    chevronUp: {
        display: "none",
    },
    userName:{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.textDark
    },
    languageSelect:{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: colors.darkBackground
    },
    languageButtonText:{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.textLight,
    },
    email:{
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: colors.textDisabled
    },
    avatar:{
        alignSelf: 'center',
        backgroundColor: colors.darkBackground,
        borderColor: colors.lightBackground,
        borderWidth: 2,
        position: 'relative',
        top: -80
    },
    avatarInfoContainer:{
        backgroundColor: colors.lightBackground
    },
    picker:{
        marginHorizontal: 100,
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
    profileButton: {
        height: 40,
        width: 250,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        borderBottomColor: colors.textDisabled,
        borderBottomWidth: 1
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
        fontSize: 14,
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

export default ProfileScreen