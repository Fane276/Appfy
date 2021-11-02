import { auth } from '../firebase'
import { saveNewUser } from './saveNewUser'

const registerUserWithEmailAndPassword = async (data) => {
    const authResponse = await auth.createUserWithEmailAndPassword(data.emailAddress, data.password)
    const uid = authResponse.user.uid
    const userData = { uid, ...data }
    return await saveNewUser(userData)
}

export { registerUserWithEmailAndPassword }