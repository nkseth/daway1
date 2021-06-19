import { Button } from '@material-ui/core';
import React, { useContext, useState, useEffect } from 'react';
import { ViewjobContext } from '../../context/viewjob'
import firebase from 'firebase'
import { AppliedjobsContext } from '../../context/appliedjobs'
import VisibilityIcon from '@material-ui/icons/Visibility';
import Moodle from '../ui/jobdetailsmoodle'
import Prefer from '../prefer/preference'
import { Row, Col } from 'react-bootstrap'
import Loder from '../../loader'
import moment from 'moment'
import { Avatar } from "@material-ui/core"
import { FcDepartment, FcCalendar } from "react-icons/fc"

const Viewj = () => {
    const { viewjob } = useContext(ViewjobContext)
    const [loder, setloader] = useState(false)
    const { appliedjob, appliedjobid } = useContext(AppliedjobsContext)
    const [vj, setvj] = useState([])
    const [mod, setmod] = useState(false)
    const [moddata, setmoddata] = useState(null)
    const [settiing, setsetting] = useState([])
    const [applyjob, setapplyjob] = useState(false)

    const modclose = () => {
        setmod(false)
    }
    const modopen = (item) => {
        setmoddata(item)
        setmod(true)
    }
    const setting = (neo) => {
        const final = []
        const pri = neo
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
            setsetting(final)
        }

    }


    useEffect(() => {
        setvj(viewjob)
        console.log("vj hasi chanaged")
    }, [viewjob])

    useEffect(() => {
        setloader(true)
        const resummechecker = async () => {
            const df = firebase.firestore()
            const currentUser = firebase.auth().currentUser.uid
            const dbi = df.collection("user/" + currentUser + '/userresume')
            await

                dbi.onSnapshot((snap) => {
                    setloader(false)
                    if (snap.docs.length > 0) {
                        setapplyjob(true)
                    }
                })
        }
        resummechecker()
    }, [])


    const applyforjob = (iit) => {
        const apply = async () => {
            const df = firebase.firestore()
            const currentUser = firebase.auth().currentUser.uid
            const dbi = df.collection("user/" + currentUser + '/appliedjobs').doc(iit.id)
            await dbi.set({
                ...iit, status: 'applied', applieduser: currentUser,
                applieddate: moment(Date.now()).format("DD-MM-YYYY")
            })
        }
        apply()
    }
    return (
        <>
            {applyjob ?
                <div >
                    <Loder open={loder} />

                    <Moodle closefun={modclose} open={mod} data={moddata} />
                    <Row>
                        <Col lg={3}>
                            <Prefer satcheck={setting} />
                        </Col>
                        <Col style={{ maxHeight: '80vh', overflowY: 'scroll', display: 'flex', flexWrap: 'wrap' }}>
                            {vj === null ? null :
                                vj.length > 0 ? vj.map(item => {

                                    if (settiing === null || settiing.includes(item.category) || settiing.length < 1)
                                        return (
                                            <div className='m-2 p-3 d-flex flex-column  ' style={{
                                                boxShadow: '2px 4px 20px lightgray', backgroundColor: 'white'
                                                , justifyContent: 'flex-start', width: '30vw', flexWrap: 'wrap',
                                                alignItems: 'left', padding: '20px'
                                            }}>
                                                <Row>


                                                    <Col lg={3} style={{
                                                        display: 'flex', alignItems: 'center'
                                                        , justifyContent: 'center'
                                                    }}>
                                                        <Avatar
                                                            src={item.companylogo}
                                                            style={{ width: '70px', height: '70px', margin: '5px' }} />
                                                    </Col>
                                                    <Col
                                                    >
                                                        <div style={{
                                                            fontWeight: 'bold', color: 'Black', textTransform: 'capitalize',
                                                            fontFamily: 'unset', fontSize: '15px', color: '#183E65'

                                                        }}>{item.title}</div>
                                                        <div style={{ textTransform: 'uppercase', color: 'gray', fontSize: '15px', fontWeight: 'bold', fontFamily: 'sans-serif', fontSize: '15px' }}>

                                                            {item.companyname}</div>

                                                        <div
                                                            style={{
                                                                color: 'gray', textTransform: 'capitalize',
                                                                paddingBottom: '3px', fontSize: '13px',
                                                                borderRadius: '10px', marginTop: '5px',
                                                                display: 'flex', alignItems: 'center',
                                                                fontWeight: 'bold'
                                                            }}

                                                        ><FcDepartment size={20} />
                                                            {item.location}</div>





                                                    </Col>

                                                    <Col lg={4}>

                                                        <div
                                                            style={{
                                                                color: 'gray', textTransform: 'capitalize',
                                                                paddingBottom: '3px', fontSize: '13px',
                                                                borderRadius: '10px', marginTop: '5px',
                                                                display: 'flex', alignItems: 'center',
                                                                fontWeight: 'bold'
                                                            }}

                                                        ><FcCalendar size={20} />

                                                            {moment(item.timestamp.toDate()).format("DD/MM/YYYY")}</div>
                                                        <div
                                                            style={{
                                                                backgroundColor: 'lightgray', textTransform: 'capitalize', width: 'fit-content',
                                                                padding: '5px', paddingTop: '3px', paddingBottom: '3px', fontSize: '10px',
                                                                borderRadius: '10px', marginTop: '5px', height: 'fit-content'
                                                            }}
                                                        >{item.category}</div>

                                                    </Col>


                                                </Row>

                                                <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                                                    {appliedjobid.includes(item.id) ?
                                                        <Button disabled onClick={() => applyforjob(item)}>Applied</Button> :

                                                        <Button variant="contained" size="small" style={{ backgroundColor: "#183E65", color: 'white', marginRight: "5px" }} onClick={() => applyforjob(item)}>Apply</Button>

                                                    }
                                                    <Button variant="contained" size="small" style={{ backgroundColor: "#183E65", color: 'white' }} onClick={() => modopen(item)} className='text-blue-600'>View More</Button>



                                                </div>


                                            </div>

                                        )
                                    else
                                        return null
                                }) : null
                            }
                        </Col>

                    </Row>
                </div> : <div>plase make your resume first</div>
            }
        </>
    );

}

export default Viewj;


