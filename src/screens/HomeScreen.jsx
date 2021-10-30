import React from 'react'
import { Pressable, Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native'

import colors from '../assets/colors/colors';

const HomeScreen = ({ navigation, route }) => {
    console.log(route);

    return (
        <ScrollView>
            <SafeAreaView>
                <View style={styles.container}>
                    <Text>Home Screen</Text>
                    <Pressable
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed ? colors.textDisabled : colors.textLight,
                            },
                            styles.lightButton]}
                        onPress={async () => {
                            navigation.navigate('Login')
                        }}
                    >
                        <Text style={styles.lightButtonText}>Log Out</Text>
                    </Pressable>
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