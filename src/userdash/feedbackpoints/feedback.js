import React, { useEffect, useState } from 'react';
import Feedbackcomp from './feedbackcomp'
import firebase from '../../firebase'
import moment from 'moment'
const Feedback = () => {

    const [feed, setfeed] = useState([])
    useEffect(() => {

        const fetuserdetails = async () => {
            const db = firebase.firestore()
            const currentuser = firebase.auth().currentUser.uid
            const papl = await db.collection("user/" + currentuser + "/finishedinternship/")
            papl.onSnapshot((snap) => {
                const sui = snap.docs.map(doc => doc.data())
                setfeed(sui)
            })




        }
        fetuserdetails()
    }, [])

    return (<div>
        {feed.map((item) => {
            return (
                <Feedbackcomp value={item.rating} feedback={item.feedback} companyname={item.internshipdata.companyname}
                    enddate={moment(item.finishedtimestamp).format("DD/MM/YYYY")}
                />
            )
        })}



    </div>);
}

export default Feedback;