import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from './../firebase/firebase.confiq';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    // create user
    const createUser =async(email,password) =>{
        setLoading(true)
        return await createUserWithEmailAndPassword(auth,email,password)
    }
    // update user
    const handleUpdateProfile = (name,photo)=>{
        setLoading(true)
        console.log(name,photo)
        return updateProfile(auth.currentUser,{
            displayName: name,
            photoURL:photo
        })
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
    // onstate manintein
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>unSubscribe();
    },[])
    console.log(user);
    const authInfo = {
        user,
        loading,
        createUser,
        loggedInUser,
        googleLogIn,
        loggedOut,
        handleUpdateProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;