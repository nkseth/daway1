import React, { useEffect, useState, useContext } from "react"
import firebase from 'firebase'
import { AuthContext } from '../Auth'

export const CompanyContext = React.createContext();
export const Company = ({ children }) => {
    const { currentUser } = useContext(AuthContext)
    const [company, setcompany] = useState(null);
    useEffect(() => {
        if (currentUser) {
            const fet = async () => {
                const db = firebase.firestore()
                console.log("in company")
                const data = await db.collection('companies').doc(currentUser.uid).onSnapshot(data => {
                    if (data?.data()) {

                        setcompany(data?.data())
                        console.log(data?.data())
                    }

                })

            }
            fet()
        }




    }, [currentUser])

    return (
        < CompanyContext.Provider
            value={{ company }}
        >
            {children}
        </ CompanyContext.Provider>
    )
}