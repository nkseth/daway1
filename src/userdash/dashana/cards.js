import React, { useEffect, useState } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { Card, Divider, Typography, Button } from '@material-ui/core'
import Graph from './graph'
import { Col, Row } from 'react-bootstrap'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import Recent from './recentacti'
import CardStats from './cardi'
import Timeline from './timeline'
import firebase from '../../firebase'
import { FcBusinessContact, FcApprove, FcReadingEbook, FcPortraitMode } from "react-icons/fc"



const Stats = (props) => {
    const [totalapplied, settotalapplied] = useState(0)
    const [totalfinished, settotalfinished] = useState(0)
    const [totalselected, settotalselected] = useState(0)
    const [totalava, settotaava] = useState(0)
    useEffect(() => {

        const dfetc = async () => {
            const db = firebase.firestore()

            const cuUser = firebase.auth().currentUser.uid
            const data = await db.collection(`user/${cuUser}/appliedjobs`)
            data.onSnapshot(snap => {
                const palo = snap.docs.map(doc => doc.data())
                console.log(palo)
                settotalapplied(palo.length.toString())

                totalelectedsetter(palo)

                totalelectedfinished(palo)
            })
            const datao = await db.collection(`jobpostedbycategory`)

            datao.onSnapshot(snap => {
                const palo = snap.docs.map(doc => doc.data())
                console.log(palo)
                settotaava(palo.length.toString())


            })
        }
        dfetc()

    }, [])

    const totalelectedsetter = (palo) => {
        let toi = 0
        palo.map(item => {
            if (item.status === "selected") {
                toi = toi + 1
            }
        })
        return settotalselected(toi)
    }

    const totalelectedfinished = (palo) => {
        let toi = 0
        palo.map(item => {
            if (item.status === "finished") {
                toi = toi + 1
            }
        })
        return settotalfinished(toi)
    }


    return (<div>

        <Row className='d-flex justify-content-between'>

            <Col lg={12} sm={12} className=" mt-2 p-3 d-flex justify-content-center">

                <CardStats statSubtitle="Total Avalable Internship " statTitle={totalava}  >
                    <FcBusinessContact size={32} /></CardStats>
                <CardStats statSubtitle="Total Applied Internship " statTitle={totalapplied}>
                    <FcReadingEbook size={32} />
                </CardStats>
                <CardStats statSubtitle="Total Shortlisted Internships" statTitle={totalselected} >

                    <FcApprove size={32} />
                </CardStats>
                <CardStats statSubtitle="Total finished Internships" statTitle={totalselected}
                >
                    <FcPortraitMode size={32} />
                </CardStats>

            </Col>

        </Row>
        <Row className='d-flex justify-content-between'>
            <Col lg={6} className=" mt-2 d-flex justify-content-center ">
                <Graph />
            </Col>
            <Col lg={6} sm={12}
                className="d-flex flex-column   flex-wrap mt-2 "
                style={{ alignItems: 'flex-start' }}
            >

                < Timeline />
            </Col>
        </Row>


    </div >);
}

export default Stats;