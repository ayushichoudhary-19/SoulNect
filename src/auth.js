import {getAuth, signInWithPopup, GoogleAuthProvider,
    createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile} from "firebase/auth";
import {app} from "./firebase";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.log(error.message);
    }
};
// export const signOut = async () => {
//     try {
//         await auth.signOut();
//     } catch (error) {
//         console.log(error.message);
//     }
// };
export const getCurrentUser = () => {
    return auth.currentUser;
};
export const createUser = async (email, password, displayName) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {displayName});
    } catch (error) {
        console.log(error.message);
    }
}
export const signIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error.message);
    }
}
export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        console.log(error.message);
    }
}

export default auth;
