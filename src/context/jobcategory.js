import React, { useEffect, useState, useContext } from "react"
import firebase from 'firebase'
import { AuthContext } from '../Auth'

export const JobcategoryContext = React.createContext();
export const Jobcategory = ({ children }) => {
    const { currentUser } = useContext(AuthContext)
    const [jobcate, setjobcati] = useState(null);
    useEffect(() => {

        const fet = async () => {
            const db = firebase.firestore()

            const data = await db.collection('jobcategories').doc('category').onSnapshot(data => {
                if (data?.data()) {
                    const papi = Object.values(data.data())
                    console.log(papi)
                    setjobcati(papi)

                }

            })

        }
        fet()


    }, [currentUser])

    return (
        <JobcategoryContext.Provider
            value={{ jobcate }}
        >
            {children}
        </JobcategoryContext.Provider>
    )
}