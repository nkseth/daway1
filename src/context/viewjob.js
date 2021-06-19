import React, { useEffect, useState, useContext } from "react"
import firebase from 'firebase'
import { AuthContext } from '../Auth'



export const ViewjobContext = React.createContext();
export const Viewjobprovider = ({ children }) => {
    const { currentUser } = useContext(AuthContext)



    const [viewjob, setviewjob] = useState(null);
    const [prefer, setprefer] = useState(null);


    useEffect(() => {

        /*    const fetchprefer = async () => {
                const db = firebase.firestore()
                const currentUser = firebase.auth().currentUser?.uid
                const da = await db.collection('user/' + currentUser + '/preferences').doc('selectedcategory')
    
                da.onSnapshot((data) => {
                    setprefer(data.data())
                    console.log(data.data())
                    const pri = data.data()
                    console.log(pri)
                    if (pri === undefined) {
    
                    } else {
                        let oop = Object.keys(pri)
                        let ooi = Object.values(pri)
                        let final = []
                        console.log(oop)
                        console.log(ooi)
    
                        ooi.map((item, i) => {
                            if (item === true) {
                                final.push(oop[i])
                            }
                        })
                        console.log('thsi si final')
                        console.log(final)
                        const sff = async () => {
                            if (final.length > 0) {
                                const papi = await db.collection('jobpostedbycategory').where('category', "in", final)
                                papi.onSnapshot((data) => {
                                    console.log('this is finaaaa')
                                    const da = data.docs.map((doc) => doc.data())
                                    console.log(da)
                                    setviewjob(da)
                                })
                            }
    
    
    
                        }
                        sff()
                    }
    
                    // const papi= await db.collection('jobpostedbycategory').where('category',)
                })
    
    
    
    
    
            }
            fetchprefer()
    
            
    
    */
        const dataf = async () => {
            const db = firebase.firestore()
            const currentUser = firebase.auth().currentUser?.uid
            const papi = await db.collection('jobpostedbycategory')
            papi.onSnapshot((data) => {
                console.log('this is finaaaa')
                const da = data.docs.map((doc) => doc?.data())
                console.log(da)
                setviewjob(da)
            })

        }

        dataf()
    }, [])

    return (
        < ViewjobContext.Provider
            value={{ viewjob }}
        >
            {children}
        </ViewjobContext.Provider>
    )
}