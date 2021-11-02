import { firestore } from "../firebase"

const saveNewUser = async ({ uid, ...data }) => {
    await firestore
        .collection('users')
        .doc(uid)
        .set({ uid, ...data })

    return data
}

export { saveNewUser }