import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap'
import Upimg from './uploadimg'
import firebase from 'firebase'
import Snackbar from '../../snackbar'


import { TextField, Button, Avatar } from '@material-ui/core'
const Editprofile = () => {
    const [imgurl, setimgurl] = useState(null)
    const [profile, setprofile] = useState({ lastname: "", firstname: '', logourl: "" })
    const [oldprofile, setoldprofile] = useState({})
    const [snack, setsnack] = useState(null)

    const urli = (down) => {
        setimgurl(down)
    }

    const updateprofile = () => {

        const fetuserdetails = async () => {
            const db = firebase.firestore()
            const currentuser = firebase.auth().currentUser.uid
            const papl = await db.collection("user").doc(currentuser).update(profile).then(() => {
                setsnack('Updated Successfully')
                setTimeout(function () { setsnack(null) }, 2000);

            }).catch(err => {
                setsnack(err.message)
                setTimeout(function () { setsnack(null) }, 2000);
            })

        }
        fetuserdetails()
    }

    useEffect(() => {
        const fetuserdetails = async () => {
            const db = firebase.firestore()
            const currentuser = firebase.auth().currentUser.uid
            const papl = await db.collection("user").doc(currentuser).onSnapshot(data => {
                console.log(data.data())
                setprofile(data.data())
                setoldprofile(data.data())
            })
        }
        fetuserdetails()
    }, [])


    return (<div >

        <Snackbar open={snack ? true : false} message={snack} />
        <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Col className='d-flex flex-column p-5 '>
                <TextField variant="outlined" placeholder="First Name" className='mt-2'
                    value={profile === null || profile === undefined ? "" : profile.firstname} onChange={(e) => { setprofile({ ...profile, firstname: e.target.value }) }} />
                <TextField variant="outlined" placeholder="Last Name" className='mt-2'
                    value={profile === null || profile === undefined ? "" : profile.lastname} onChange={(e) => { setprofile({ ...profile, lastname: e.target.value }) }} />

                <Button variant='contained' style={{ backgroundColor: '#183E65', color: 'white' }}
                    className='mt-2' onClick={updateprofile}
                >Update</Button>
            </Col>

            <Col className='d-flex flex-column p-5 justify-content-center align-items-center'>
                <Avatar style={{ width: "200px", height: "200px" }} src={profile === null || profile === undefined ? "" : profile.logourl} />
                <Upimg urli={urli} />
                <Button variant='contained' style={{ backgroundColor: '#183E65', color: 'white' }} className='mt-2'>Change Password</Button>
            </Col>

        </Row>

    </div>);
}

export default Editprofile;