import React, { useEffect, useState, useContext } from "react"
import firebase from 'firebase'
import { AuthContext } from '../Auth'

export const AppliedjobsContext = React.createContext();
export const Appliedjobs = ({ children }) => {
    const { currentUser } = useContext(AuthContext)
    const [appliedjob, setappliedjob] = useState(null);
    const [appliedjobid, setappliedjobid] = useState(null);
    useEffect(() => {
        if (currentUser) {
            const fet = async () => {
                const db = firebase.firestore()
                const currentUser = firebase.auth()?.currentUser.uid
                const da = await db.collection('user/' + currentUser + '/appliedjobs')

                da.onSnapshot(snap => {
                    const data = snap.docs.map(doc => doc.data())
                    console.log(data)
                    setappliedjob(data)
                    const datai = snap.docs.map(doc => doc.id)
                    setappliedjobid(datai)

                })

            }
            fet()
        }

    }, [currentUser])

    return (
        <AppliedjobsContext.Provider
            value={{ appliedjob, appliedjobid }}
        >
            {children}
        </AppliedjobsContext.Provider>
    )
}