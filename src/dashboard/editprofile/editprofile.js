import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap'
import Upimg from './uploadimg'
import firebase from 'firebase'
import Snackbar from '../../snackbar'


import { TextField, Button, Avatar, Input } from '@material-ui/core'
const Editprofile = () => {
    const [imgurl, setimgurl] = useState(null)
    const [profile, setprofile] = useState({})
    const [oldprofile, setoldprofile] = useState({})
    const [snack, setsnack] = useState(null)

    const urli = (down) => {
        setimgurl(down)
    }

    const updateprofile = () => {

        const fetuserdetails = async () => {
            const db = firebase.firestore()
            const currentuser = firebase.auth().currentUser.uid
            const papl = await db.collection("companies").doc(currentuser).update(profile).then(() => {
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
            const papl = await db.collection("companies").doc(currentuser).onSnapshot(data => {
                console.log(data.data())
                setprofile(data.data())
                setoldprofile(data.data())
            })
        }
        fetuserdetails()
    }, [])


    return (<div >
        {console.log(profile.firstname)}
        <Snackbar open={snack ? true : false} message={snack} />


        <div style={{ margin: '20px', boxShadow: '2px 2px 20px blue', position: 'relative' }}>
            <Row style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Col className='d-flex flex-column p-5 '>
                    <div className='mt-2 d-flex flex-col'>
                        <lable>First Name*</lable>
                        <input

                            style={{ padding: '5px', border: "1px solid", }}
                            variant="outlined" placeholder="First Name" className='mt-2'
                            value={profile === null || profile === undefined ? null : profile.firstname} onChange={(e) => { setprofile({ ...profile, firstname: e.target.value }) }} />
                    </div>

                    <div className='mt-2 d-flex flex-col'>
                        <lable>Last Name*</lable>
                        <input
                            style={{ padding: '5px', border: "1px solid" }}
                            variant="outlined" placeholder="Last Name" className='mt-2'
                            value={profile === null || profile === undefined ? null : profile.lastname} onChange={(e) => { setprofile({ ...profile, lastname: e.target.value }) }} />
                    </div>
                    <div className='mt-2 d-flex flex-col'>
                        <lable>Company Name*</lable>
                        <input
                            style={{ padding: '5px', border: "1px solid" }}
                            variant="outlined" placeholder="Company Name" className='mt-2'
                            value={profile === null || profile === undefined ? null : profile.companyname} onChange={(e) => { setprofile({ ...profile, companyname: e.target.value }) }} />
                    </div>

                    <div className='mt-2 d-flex flex-col'>
                        <lable>Date of Incorporation*</lable>
                        <input
                            style={{ padding: '5px', border: "1px solid" }} type="date"
                            variant="outlined" placeholder="Date of Incorporation" className='mt-2'
                            value={profile === null || profile === undefined ? null : profile.doi} onChange={(e) => { setprofile({ ...profile, doi: e.target.value }) }} />
                    </div>

                    <div className='mt-2 d-flex flex-col'>
                        <lable>Director Name*</lable>
                        <input
                            style={{ padding: '5px', border: "1px solid" }} type="text"
                            variant="outlined" placeholder="Director Name" className='mt-2'
                            value={profile === null || profile === undefined ? null : profile.directorname} onChange={(e) => { setprofile({ ...profile, directorname: e.target.value }) }} />
                    </div>

                    <div className='mt-2 d-flex flex-col'>
                        <lable>Company Website*</lable>
                        <input
                            style={{ padding: '5px', border: "1px solid" }} type="url"
                            variant="outlined" placeholder="Company Website" className='mt-2'
                            value={profile === null || profile === undefined ? null : profile.companywebsite} onChange={(e) => { setprofile({ ...profile, companywebsite: e.target.value }) }} />
                    </div>

                    <div className='mt-2 d-flex flex-col'>
                        <lable>Team size*</lable>
                        <input
                            style={{ padding: '5px', border: "1px solid" }} type="number"
                            variant="outlined" placeholder="Team size" className='mt-2'
                            value={profile === null || profile === undefined ? null : profile.teamsize} onChange={(e) => { setprofile({ ...profile, teamsize: e.target.value }) }} />
                    </div>

                    <div className='mt-2 d-flex flex-col'>
                        <lable>Turnover*</lable>
                        <input
                            style={{ padding: '5px', border: "1px solid" }} type="number"
                            variant="outlined" placeholder="Turnover" className='mt-2'
                            value={profile === null || profile === undefined ? null : profile.turnover} onChange={(e) => { setprofile({ ...profile, turnover: e.target.value }) }} />
                    </div>

                    <div className='mt-2 d-flex flex-col'>
                        <lable>About*</lable>
                        <textarea
                            style={{ padding: '5px', border: "1px solid" }}
                            variant="outlined" placeholder="About" className='mt-2'
                            value={profile === null || profile === undefined ? null : profile.about} onChange={(e) => { setprofile({ ...profile, about: e.target.value }) }} />
                    </div>

                    <div className='mt-2 d-flex flex-col'>
                        <lable>Industry Type </lable>
                        <select
                            style={{ padding: '5px', border: "1px solid" }}
                            variant="outlined" placeholder="Industry Type" className='mt-2' type=""
                            value={profile === null || profile === undefined ? null : profile.industrytype} onChange={(e) => { setprofile({ ...profile, industrytype: e.target.value }) }} >

                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="fiat">Fiat</option>
                            <option value="audi">Audi</option>

                        </select>
                    </div>






                </Col>

                <Col className='d-flex flex-column p-5 justify-content-center align-items-center'>
                    <Avatar style={{ width: "200px", height: "200px" }} src={profile === "null" ? "1" : profile.logourl} />
                    <Upimg urli={urli} />
                    <Button variant='contained' style={{ backgroundColor: '#183E65', color: 'white' }} className='mt-2'>Change Password</Button>
                </Col>

            </Row>

            <Button variant='contained' style={{
                backgroundColor: '#183E65',
                top: "20px", right: "20px",
                color: 'white', margin: '20px', position: 'absolute'
            }}
                className='mt-2' onClick={updateprofile}
            >Update</Button>
        </div>


    </div>);
}

export default Editprofile;