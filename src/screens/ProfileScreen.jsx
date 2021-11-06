import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageConsts from '../assets/AppConstants/AsyncStorgeConsts'
import colors from '../assets/colors/colors';
import { useState } from 'react';
import { Avatar, Header } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Overlay } from 'react-native-elements';
import { ListItem } from 'react-native-elements'

const getUserData= async ()=>{
    try{
        var userJson = await AsyncStorage.getItem(AsyncStorageConsts.userDataJson);
        return userJson != null ? JSON.parse(userJson) : null; 
    }
    catch{
        // de facut ceva aici
    }
}


const ProfileScreen = ({ navigation, route }) => {
    const [userData, setUserData] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
      setVisible(!visible);
    };
    
    const languageList = [
        {
            name: 'English'
        },
        {
            name: 'Romana'
        },
    ]
    getUserData().then((data)=>{
        setUserData(data);
    })
    return (
        <View sytle={styles.container}>
            <Header
                placement="center"
                leftComponent={ 
                <TouchableOpacity
                    onPress={()=>{navigation.goBack()}}
                >
                    <FontAwesomeIcon icon={faAngleLeft} color={colors.lightBackground} />
                </TouchableOpacity>
                }
                centerComponent={{ text: userData==null ? "Profile":userData.email, style: { color: '#fff' } }}
                backgroundColor = {colors.darkBackground}
                containerStyle= {{borderWidth: 0}}
                />
            <View style={styles.containerAvatar}>
            {/* <Svg
                width="600"
                height="600"
                fill={colors.lightBackground}
                viewBox="0 0 544 544"
                >
                <Path stroke="#000" id="svg_3" d="m76,384.38226l0,-232.38226l475,0l0,136.02864c0,0.18438 -105,-58.09557 -220,35.42413c-115,93.51969 -255,60.9295 -255,60.9295z" opacity="NaN" />
                </Svg> */}
            </View>
            <Avatar
                    size = 'xlarge'
                    rounded
                    title={userData==null ? "P":userData.email[0]}
                    source={{ uri: "https://i.imgur.com/Uy5keuJ.jpeg" }}
                    containerStyle = {styles.avatar}
                />
            <View style={styles.infoContainer}>
                <Text style={styles.userName}>Stefan Cirstea</Text>
                <Text style={styles.email}>{userData==null ? "Profile":userData.email}</Text>
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                    {
                    languageList.map((item, i) => (
                        <ListItem key={i} bottomDivider>
                            <Text>{item.name}</Text>
                        </ListItem>
                    ))
                    }
                </Overlay>
                
                <TouchableOpacity
                    style = {styles.profileButton}
                    onPress={toggleOverlay}
                >
                    <Text style ={styles.lightButtonText}>Change language</Text>
                    <FontAwesomeIcon icon={faAngleRight} color={colors.textDark}></FontAwesomeIcon>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.darkBackground,
        flex:1
    },
    infoContainer:{
        paddingTop: 70,
        backgroundColor: colors.lightBackground,
        height: '100%',
        position: 'relative',
        bottom: 0
    },
    containerAvatar: {
        backgroundColor: colors.darkBackground,
        height: 150
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
        color: colors.textDark
    },
    email:{
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: colors.textDisabled
    },
    avatar:{
        alignSelf: 'center',
        borderColor: colors.lightBackground,
        borderWidth: 2,
        position:'absolute',
        zIndex: 200,
        top: 150
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