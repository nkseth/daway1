import React, { useEffect, useState, useContext } from "react"
import firebase from 'firebase'
import { AuthContext } from '../Auth'

export const PreferContext = React.createContext();
export const Preferprovider = ({ children }) => {
    const { currentUser } = useContext(AuthContext)
    const [prefer, setprefer] = useState({});
    useEffect(() => {

        const feti = async () => {
            console.log('this is thesdfsn')
            const db = firebase.firestore()
            const currentUser = firebase.auth().currentUser?.uid
            const da = await db.collection('user/' + currentUser + '/preferences').doc('selectedcategory')

            da.onSnapshot((data) => {
                setprefer(data.data())
            })

        }
        feti()




    }, [currentUser])

    return (
        < PreferContext.Provider
            value={{ prefer }}
        >
            {children}
        </ PreferContext.Provider>
    )
}