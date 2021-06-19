import React, { useEffect, useState } from "react"
import firebase from './firebase'

export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        const ffab = async () => {
            await firebase.auth().onAuthStateChanged(setCurrentUser)
        }
        ffab();


    }, []);

    return (
        <AuthContext.Provider
            value={{ currentUser }}
        >
            {children}
        </AuthContext.Provider>
    )
}