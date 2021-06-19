
import React, { useState, useContext, useEffect } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Input } from '@material-ui/core'
import Firebase from 'firebase'
import { AuthContext } from '../../Auth'
import { CompanyContext } from '../../context/companycontext'
import moment from 'moment'
const Postbnt = (props) => {

    const [postjob, setpostjob] = useState({})
    const [category, setcategory] = useState([])
    const { currentUser } = useContext(AuthContext)
    const { company } = useContext(CompanyContext)


    useEffect(() => {
        const dat = async () => {
            const db = Firebase.firestore()


            const data = await db.collection('jobcategories').doc('category').get().then(data => {
                if (data.data() === null || data.data() === undefined) {

                }
                else {
                    const papi = Object?.values(data.data())
                    console.log(papi)
                    setcategory(papi)
                }


            })

        }
        dat()


    }, [])
    const postclick = () => {
        const postyjob = async () => {
            const db = Firebase.firestore()

            const cuUser = currentUser.uid
            const data = await db.collection(`companies/${cuUser}/postedjobs`).add({
                ...postjob, status: true, createddate: moment(Date.now()).format("DD-MM-YYYY")
                , companyid: cuUser, timestamp: Firebase.firestore.Timestamp.fromDate(new Date()),
                companyname: company.companyname, companylogo: company.logourl
            }).then((response) => {
                console.log(response)
                console.log('this is then')


            })
            const datai = await db.collection("companies").doc(cuUser).update({
                postedjobs: Firebase.firestore.FieldValue.increment(1)
            }).then((response) => {
                console.log(response)
                console.log('this is then')


            })
        }
        postyjob()
        props.closemo()
    }

    return (<div className="d-flex flex-column p-5 "
        style={{


            boxShadow: '3px 2px 30px blue'
        }}>
        <div className='mt-2 d-flex flex-col'>
            <lable>Internship Title</lable>
            <input
                style={{ padding: '5px', border: "1px solid", }}
                className="m-2" variant='outlined' id="standard" placeholder="Internship Title Eg. React developer"
                onChange={(e) => { setpostjob({ ...postjob, title: e.target.value }) }} />

        </div>
        <div className='mt-2 d-flex flex-col'>
            <lable>Internship Category</lable>

            <select

                style={{ padding: '5px', border: "1px solid", }}
                onChange={(e) => { setpostjob({ ...postjob, category: e.target.value }) }}
            >
                <option key={0} aria-label="select Category" value='not selected'>Select Category</option>

                {category.map((cat, inde) => (
                    <option value={cat}>{cat}</option>

                ))}
            </select>
        </div>
        <div className='mt-2 d-flex flex-col'>
            <lable>Internship Type</lable>
            <select

                style={{ padding: '5px', border: "1px solid", }}
                onChange={(e) => { setpostjob({ ...postjob, type: e.target.value }) }}
            >

                <option key={0} aria-label="select Category" value='not selected'>in Office </option>
                <option key={1} aria-label="select Category" value='not selected'>Work from home</option>


            </select>
        </div>
        <div className='mt-2 d-flex flex-col'>
            <lable>Job Discription</lable>
            <textarea

                style={{ padding: '5px', border: "1px solid", }}
                variant='outlined' id="standard-bas" placeholder="Job Discription Eg. responsibilities,
         required skills, perks etc." rows="2" className="m-2"
                onChange={(e) => { setpostjob({ ...postjob, discription: e.target.value }) }} />
        </div>
        <div className='mt-2 d-flex flex-col'>
            <lable>Required skills</lable>
            <textarea
                style={{ padding: '5px', border: "1px solid", }}
                variant='outlined' id="standard-bas" placeholder="skills Required" rows="3" className="m-2"
                multiline onChange={(e) => { setpostjob({ ...postjob, skills: e.target.value }) }} />

        </div>
        <div className='mt-2 d-flex flex-col'>
            <lable>Duration</lable>
            <input
                style={{ padding: '5px', border: "1px solid", }}
                variant='outlined' id="standard-basi" placeholder="Duration" className="m-2"
                onChange={(e) => { setpostjob({ ...postjob, duration: e.target.value }) }} />

        </div>
        <div className='mt-2 d-flex flex-col'>
            <lable>Location</lable>
            <input
                style={{ padding: '5px', border: "1px solid", }}
                variant='outlined' id="standard-basi" placeholder="location" className="m-2"
                onChange={(e) => { setpostjob({ ...postjob, location: e.target.value }) }} />

        </div>
        <div>

            <lable>Skill Level</lable>
            <select

                style={{ padding: '5px', border: "1px solid", }}
                onChange={(e) => { setpostjob({ ...postjob, skilllevel: e.target.value }) }}
            >

                <option key={0} aria-label="select Category" value='beginer'>BE-beginner </option>
                <option key={1} aria-label="select Category" value='intermediate'>IM-intermediate</option>
                <option key={2} aria-label="select Category" value='expert'>EX-Expert</option>


            </select>
        </div>
        <div style={{ display: "flex", justifyContent: 'flex-end' }}>
            <Button style={{ fontSize: "15px", backgroundColor: '#183E65', color: 'white', maxWidth: '200px' }}
                onClick={postclick}
            >
                POST INTERNSHIP </Button>
        </div>
    </div>);
}

export default Postbnt
