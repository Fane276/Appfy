import { auth, firestore } from '../firebase'

const logInWithEmailAndPassword = async (email, password) => {
    try {
        const signInResponse = await auth.signInWithEmailAndPassword(email, password)

        return await getUser(signInResponse)
    }
    catch (error) {
        alert(error)
        console.log(error)
    }
}

const getUser = async (signInResponse) => {
    const uid = signInResponse.user.uid

    const userDoc = await firestore
        .collection('users')
        .doc(uid)
        .get()

    const user = userDoc.data()

    return user
}

export { logInWithEmailAndPassword }