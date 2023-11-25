import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useState } from "react";
import app from './../firebase/firebase.confiq';

const googleProvider = new GoogleAuthProvider();
export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    // create user

    const createUser =async(email,password) =>{
        setLoading(true)
        return await createUserWithEmailAndPassword(auth,email,password)
    }
    // loggedIn user
    const loggedInUser =async(email,password)=>{
        setLoading(true)
        return await signInWithEmailAndPassword(auth,email,password)
    }
    // Google login
    const googleLogIn = async() =>{
        setLoading(true)
        return await signInWithPopup(auth,googleProvider)
    }

    // logOut
    const loggedOut=async()=>{
        setLoading(true)
        return await signOut(auth)
    }
    const authInfo = {
        user,
        loading,
        createUser,
        loggedInUser,
        googleLogIn,
        loggedOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;