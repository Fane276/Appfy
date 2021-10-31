import { Alert } from 'react-native'
import { auth, firestore } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageConsts from '../../assets/AppConstants/AsyncStorgeConsts'


const logInWithEmailAndPassword = async (email, password) => {
    try {
        // Alert.alert(email);
        const signInResponse = await auth.signInWithEmailAndPassword(email, password)
        return await getUser(signInResponse)
    }
    catch (error) {
        alert(error)
        // console.log(error)
    }
}

const getUser = async (signInResponse) => {
    const uid = signInResponse.user.uid

    const userDoc = await firestore
        .collection('users')
        .doc(uid)
        .get()

    const user = userDoc.data()

    await AsyncStorage.setItem(AsyncStorageConsts.userDataJson, JSON.stringify(user))

    return user
}

export { logInWithEmailAndPassword }