import React from 'react'
import { Pressable, Text, View, StyleSheet, SafeAreaView, ScrollView, Touchable } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageConsts from '../assets/AppConstants/AsyncStorgeConsts'
import colors from '../assets/colors/colors';
import { useState } from 'react';
import {auth} from '../firebase/firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useTranslation } from 'react-i18next';



const getUserData= async ()=>{
    try{
        var userJson = await AsyncStorage.getItem(AsyncStorageConsts.userDataJson);
        return userJson != null ? JSON.parse(userJson) : null; 
    }
    catch{
        // de facut ceva aici
    }
}



const HomeScreen = ({ navigation, route }) => {
    const { t, i18n } = useTranslation();
    const [userData, setUserData] = useState(null);
    getUserData().then((data)=>{
        setUserData(data);
    })
    return (
        <ScrollView>
            <SafeAreaView>
                <View style={styles.container}>
                    <Text>{userData==null ? "":userData.email}</Text>
                    <Pressable
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed ? colors.textDisabled : colors.textLight,
                            },
                            styles.lightButton]}
                        onPress={async () => {
                            await auth.signOut();
                        }}
                    >
                        <Text style={styles.lightButtonText}>{t('lang:logout')}</Text>
                    </Pressable>
                    <TouchableOpacity style = {styles.lightButton}
                        onPress={()=> navigation.navigate("ProfileScreen")}
                    >
                        <Text style={styles.lightButtonText}>{t('lang:profile')}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
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
        height: 40,
        borderRadius: 20,
        // backgroundColor: colors.primary,
        shadowOpacity: 1,
        shadowRadius: 3,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
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

export default HomeScreen