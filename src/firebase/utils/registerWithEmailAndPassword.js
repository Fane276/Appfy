import { auth, firestore } from '../firebase'

const registerUserWithEmailAndPassword = async (email, password, confirmPassword) => {
    try {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }

        const authResponse = await auth.createUserWithEmailAndPassword(email, password)
        
        return await saveNewUser(authResponse, email)
    }
    catch (error) {
        alert(error)
        console.log(error)
    }
}

const saveNewUser = async (authResponse, email) => {
    const uid = authResponse.user.uid
    const data = {
        id: uid,
        email
    }

    await firestore
        .collection('users')
        .doc(uid)
        .set(data)

    return data
}

export { registerUserWithEmailAndPassword }