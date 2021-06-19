import React, { useEffect, useState, useContext } from "react"
import firebase from 'firebase'
import { AuthContext } from '../Auth'

export const JobcategoryContext = React.createContext();
export const J = ({ children }) => {
    const { currentUser } = useContext(AuthContext)
    const [jobcate, setjobcati] = useState(null);
    useEffect(() => {
        if (currentUser) {
            const fet = async () => {
                const db = firebase.firestore()
                const currentUser = firebase.auth()?.currentUser.uid
                const da = await db.collection('jobcategories')

                da.onSnapshot(snap => {
                    const data = snap.docs.map(doc => doc.data())
                    console.log(data)
                    setjobcati(data)
                })

            }
            fet()
        }

    }, [currentUser])

    return (
        <JobcategoryContext.Provider
            value={{ jobcate }}
        >
            {children}
        </JobcategoryContext.Provider>
    )
}