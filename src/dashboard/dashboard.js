import React, { useEffect, useState } from 'react';
import Dashui from './ui/dashboardui'
import { Card, Typography } from '@material-ui/core'
import firebase from 'firebase'
import Logo from '../asserts/logo2.png'
import { Image, Button } from 'react-bootstrap'
import Backdrop from '../loader'
const Dashboard = () => {
    const [status, setstatus] = useState(false)
    const [Load, setLoad] = useState(false)
    useEffect(() => {
        setLoad(true)
        const fetch = async () => {
            const currentuser = firebase.auth().currentUser.uid
            const db = firebase.firestore()
            const snap = await db.collection("companies").doc(currentuser)
            snap.onSnapshot(sinap => {
                const data = sinap.data()
                setstatus(data?.active)
                setLoad(false)
            })


        }
        fetch()
    }, [])

    if (Load) {
        return (<Backdrop open={Load} />)
    }
    else
        return (


            <div>

                {status ? <Dashui /> :

                    <div className='w-100 d-flex justify-content-center align-items-center'
                        style={{ height: '100vh', background: '#ebebeb' }}
                    ><Card className='p-4 m-3 d-flex justify-content-center align-items-center flex-column'>
                            <Image fluid src={Logo}
                                style={{ width: '150px' }} />
                            <Typography gutterBottom variant='h3' style={{ color: '#183E65' }}> Thank you For Joining Us </Typography>
                            <Typography gutterBottom variant='subtitle1' style={{ color: '#183E65' }} align='center'>
                                Our Team will verify your Profile and let you know  </Typography>
                            <Button onClick={() => { firebase.auth().signOut() }}>Signout</Button>

                        </Card>
                    </div>}

            </div>);
}

export default Dashboard;