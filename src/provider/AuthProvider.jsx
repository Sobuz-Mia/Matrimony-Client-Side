import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "./../firebase/firebase.confiq";
import useAxiosPublic from "../hooks/useAxiosPublic";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create user
  const createUser = async (email, password) => {
    setLoading(true);
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  // update user
  const handleUpdateProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  // loggedIn user
  const loggedInUser = async (email, password) => {
    setLoading(true);
    return await signInWithEmailAndPassword(auth, email, password);
  };
  // Google login
  const googleLogIn = async () => {
    setLoading(true);
    return await signInWithPopup(auth, googleProvider);
  };

  // logOut
  const loggedOut = async () => {
    setLoading(true);
    return await signOut(auth);
  };
  // onstate manintein
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        axiosPublic
          .post("/jwt/token", { email: currentUser.email })
          .then((res) => {
            if (res.data.token) {
              setUser(currentUser);
              localStorage.setItem("access-token", res.data.token);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
        setUser(null);
      }
    });
    return () => unSubscribe();
  }, [axiosPublic]);
  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    loggedInUser,
    googleLogIn,
    loggedOut,
    handleUpdateProfile,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
