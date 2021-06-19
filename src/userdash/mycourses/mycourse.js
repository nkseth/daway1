import React, { useEffect, useState } from 'react';
import Course from './course'
import firebase from '../../firebase'
import { Toolbar, AppBar } from "@material-ui/core"
const Mycourses = () => {
    const [cor, setcor] = useState([])
    useEffect(() => {
        const fetchdata = async () => {
            const db = firebase.firestore()
            const currentuser = firebase.auth().currentUser.uid
            const gp = db.collection("/courses")
            const data = gp.onSnapshot(snap => {
                const d = snap.docs.map(doc => doc.data())
                setcor(d)

            })
        }

        fetchdata()
    }, [])
    return (
        <>
            <AppBar>
                <Toolbar />
            </AppBar>
            <div style={{ position: 'relative', display: 'flex', padding: "20px", flexWrap: 'wrap' }}>
                {cor.map(item => {
                    return (
                        <Course
                            discription={item.discription}
                            thumbnail={item.thumnail} title={item.title} playlist={item.playlist}
                            testquestions={item.testquestions}
                            category={item.category} />
                    )
                })}


            </div>
        </>
    );
}

export default Mycourses;