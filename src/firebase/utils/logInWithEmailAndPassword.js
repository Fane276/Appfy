import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageConsts from '../../assets/AppConstants/AsyncStorgeConsts'
import { auth, firestore } from '../firebase'

const logInWithEmailAndPassword = async (email, password) => {
    const signInResponse = await auth.signInWithEmailAndPassword(email, password)
    return await getUser(signInResponse.user.uid)
}

const getUser = async (uid) => {
    const userDoc = await firestore
        .collection('users')
        .doc(uid)
        .get()

    const user = userDoc.data()
    // alert(JSON.stringify(user));

    await AsyncStorage.setItem(AsyncStorageConsts.userRole, user.role);

    return user
}

export { logInWithEmailAndPassword, getUser}