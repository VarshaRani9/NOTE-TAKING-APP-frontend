import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

export async function oAuthWithGoogle() {
    try{
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        const userCredentials = await signInWithPopup(auth, provider);
        const user = userCredentials.user;
        console.log(user);
        return user;
    }
    catch(err){
        throw err;
    }
}
