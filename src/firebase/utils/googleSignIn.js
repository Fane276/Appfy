import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { auth, firestore, providerGoogle } from '../firebase'
import { saveNewUser } from './saveNewUser';


const onGoogleButtonPress = async () => {
    // Get the users ID token
    // await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn().then((userInfo) => { alert(JSON.stringify(userInfo)) }).catch((error) => alert(error));

    alert(JSON.stringify(userInfo))

    // Create a Google credential with the token
    const googleCredential = providerGoogle.credential(idToken);

    // Sign-in the user with the credential
    const signInResponse = await auth.signInWithCredential(googleCredential);

    if (signInResponse.additionalUserInfo.isNewUser) {
        await saveNewUser(userData)
    }
}

export { onGoogleButtonPress }