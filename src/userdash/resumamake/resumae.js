import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core'
import Prefer from '../prefer/preference'
import firebase from 'firebase'
import { Col, Row } from 'react-bootstrap'
import './placeholder.css'
import Alert from '../../snackbar'
import Loder from '../../loader'

const Resume = () => {
    const [resum, setresume] = useState({})
    const [alert, setalert] = useState(null)
    const [loder, setloader] = useState(false)
    const [userdata, setuserdata] = useState({})
    const [userid, setuserid] = useState(null)
    const inputhandler = (e) => {

        setresume({ ...resum, [e.target.id]: e.target.value })

    }

    useEffect(() => {

        const fetchresume = async () => {
            setloader(true)
            const db = firebase.firestore()
            const currentUser = firebase.auth().currentUser.uid
            const pa = db.collection('/user/' + currentUser + '/userresume').doc('resume')
            await pa.get().then(async (da) => {
                setresume(da.data())
                const pia = db.collection('/user/').doc(currentUser)
                await pia.get().then((da) => {
                    setuserdata(da.data())
                    setuserid(currentUser)
                    setloader(false)
                })
                setloader(false)
            })
        }
        fetchresume()


    }, [])
    const savechangestate = () => {
        const savechange = async () => {
            const db = firebase.firestore()
            setloader(true)
            const currentUser = firebase.auth().currentUser.uid
            const s = db.collection('/user/' + currentUser + "/userresume").doc("resume")
            await s.set({ ...resum, studentid: userid, studentlogo: userdata.logourl }).then(() => {
                console.log('saved changes')
                setloader(false)
                setalert("successfully updated")
                setTimeout(function () { setalert(null) }, 2000)
            }).catch(err => {
                setloader(false)
                setalert(err.message)
                setTimeout(function () { setalert(null) }, 2000)
            })
        }
        savechange()
    }





    return (<div className="d-flex flex-column p-5 m-5" style={{ backgroundColor: 'white', boxShadow: '2px 3px 20px blue' }}>
        <Alert open={alert ? true : false} message={alert} />
       
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            <h1 style={{ fontSize: "2em", fontWeight: 'bold' }}>Create Your Resume</h1>
        </div>

        <Row>

            <Col className="d-flex flex-column">
                <lable className="mt-4 font-weight-bold">Display Name</lable>
                <TextField
                    autoFocus={resum === null ? false : true} placeholder="Display name" variant="outlined"
                    className="mt-1" required id='displayname'
                    onChange={inputhandler} value={resum?.displayname}
                />
                <lable className="mt-4 font-weight-bold">Current Profession</lable>
                <TextField
                    autoFocus={resum === null ? false : true} placeholder="Current Professional status Eg. Student, manager"
                    variant="outlined" className="mt-1" required id='pstatus' onChange={inputhandler}
                    value={resum?.pstatus}
                />
                <lable className="mt-4 font-weight-bold">Contact No.</lable>
                <TextField
                    autoFocus={resum === null ? false : true} placeholder="Contact Number" variant="outlined"
                    type="phone"
                    className="mt-1" required id='phone' onChange={inputhandler} value={resum?.phone} type='number' />
                <lable className="mt-4 font-weight-bold">Current Address.</lable>
                <TextField
                    autoFocus={resum === null ? false : true}
                    id="Address"
                    placeholder="Address"
                    multiline
                    rows={2}
                    variant="outlined"
                    onChange={inputhandler}
                    value={resum?.Address}
                    className="mt-1"
                    required
                />
                <lable className="mt-4 font-weight-bold">About Yourself</lable>
                <TextField
                    autoFocus={resum === null ? false : true}
                    id="Presentation"
                    placeholder="Presentation"
                    multiline
                    rows={3}
                    variant="outlined"
                    onChange={inputhandler}
                    className="mt-1"
                    required
                    value={resum?.Presentation}
                />
                <lable className="mt-4 font-weight-bold">Your Education</lable>
                <TextField
                    autoFocus={resum === null ? false : true}
                    id="Education"

                    multiline
                    placeholder="Education Eg. I did my schooling from happly senior seconday school..."
                    rows={3}
                    variant="outlined"
                    required
                    onChange={inputhandler}
                    className="mt-1"
                    value={resum?.Education}
                />
                <lable className="mt-4 font-weight-bold">Your Past Working Experience ? if Any</lable>
                <TextField
                    autoFocus={resum === null ? false : true}
                    id="Experience"

                    multiline
                    placeholder=" Experience Eg. I was a team manager at company.... "
                    rows={3}
                    variant="outlined"
                    required
                    onChange={inputhandler}
                    className="mt-1"
                    value={resum?.Experience}
                />

            </Col>
            <Col className="d-flex flex-column">
                <lable className="mt-4 font-weight-bold">Your Achivements</lable>
                <TextField
                    autoFocus={resum === null ? false : true}
                    id="Achivements"

                    multiline
                    placeholder=" Achivements Eg. I was a team manager at company.... "
                    rows={3}
                    onChange={inputhandler}
                    variant="outlined"
                    required
                    className="mt-1"
                    value={resum?.Achivements}
                />
                <lable className="mt-4 font-weight-bold">Languages you are comfertable with</lable>
                <TextField
                    autoFocus={resum === null ? false : true}
                    id="Languages"
                    variant="outlined" className="mt-1" required
                    placeholder="Languages Eg. Hindi ,English"
                    onChange={inputhandler}
                    value={resum?.Languages}
                />
                <lable className="mt-4 font-weight-bold">What is your Current Skills</lable>
                <TextField
                    autoFocus={resum === null ? false : true}
                    id="skills"

                    multiline
                    rows={2}
                    variant="outlined"
                    required
                    className="mt-3"
                    placeholder=' Skills Eg. Web development ,AWS , Google Cloud Platform '
                    onChange={inputhandler}
                    value={resum?.skills}
                />


                <lable className="mt-4 font-weight-bold">Your work link or website </lable>
                <TextField variant="outlined"
                    className="mt-3" id="Github" onChange={inputhandler}
                    value={resum?.Github} placeholder='Github Link,Canva designs'
                />
                <lable className="mt-4 font-weight-bold">Your Social links </lable>
                <TextField
                    variant="outlined" className="mt-3"
                    id="instagram" onChange={inputhandler} value={resum?.instagram} placeholder='instagram Link' />
                <TextField variant="outlined" className="mt-3"
                    id="facebook" onChange={inputhandler} value={resum?.facebook} placeholder='Facebook Link' />
                <Button onClick={savechangestate} disabled={resum === null ? true : false} variant="contained"
                    style={{ backgroundColor: '#183E65', color: 'white' }} className='mt-5'
                >Save Changes</Button>
            </Col>

        </Row>



    </div >);
}

export default Resume;