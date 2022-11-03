import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateCurrentUser, sendPasswordResetEmail} from "firebase/auth";
const UserContext=createContext();
export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logout = () =>{
        return(
            signOut(auth)
        );
    };
    const forgotPassword = (email) => {
        //returns reset promise
        return sendPasswordResetEmail(auth, email);
    };
    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            //console.log(currentUser)
            setUser(currentUser)
        })
        return () => {
            unsub();
        }
    },[]
    );
    return(
        <UserContext.Provider value={{createUser, user, signIn, logout, forgotPassword}}>
            {children}
        </UserContext.Provider>
    );
};
export const UserAuth = () => {
    return useContext(UserContext)
};