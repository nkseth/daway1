
import React, { useState, useContext, useEffect } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Input } from '@material-ui/core'
import Firebase from 'firebase'


import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';



import moment from 'moment'

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Postbnt = (props) => {

    const [postjob, setpostjob] = useState({})
    const [category, setcategory] = useState([])

    const [open, setopen] = useState(false)
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
            const currentUser = Firebase.auth().currentUser.uid

            const datai = await db.collection('companies/' + currentUser + "/postedjobs").doc(props.id).get().then(data => {
                if (data.data() === null || data.data() === undefined) {

                }
                else {


                    setpostjob(data.data())
                }


            })

        }
        dat()


    }, [])

    const openhandler = () => {
        setopen(true)
    }
    const closehandler = () => {
        setopen(false)
        console.log('closing')
    }


    const postclick = () => {
        const postyjob = async () => {
            const db = Firebase.firestore()

            const cuUser = Firebase.auth().currentUser.uid
            const data = await db.collection(`companies/${cuUser}/postedjobs`).doc(props.id).update({
                ...postjob, status: true, updatedddate: moment(Date.now()).format("DD-MM-YYYY")
                , companyid: cuUser
            }).then((response) => {
                console.log(response)
                console.log('this is then')


            })
        }
        postyjob()
        closehandler()
    }
    const classes = useStyles();
    return (<>
        <Button onClick={openhandler}>Edit</Button>
        <Dialog fullScreen open={open} onClose={closehandler} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={props.close} aria-label="close">
                        <CloseIcon onClick={closehandler} />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Edit Internship
    </Typography>

                </Toolbar>
            </AppBar>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: "100%" }}>
                <div className="d-flex flex-column p-5 mt-3"
                    style={{


                        boxShadow: '3px 2px 30px blue',
                        width: "70%"

                    }}>
                    <div className='mt-2 d-flex flex-col'>
                        <lable>Internship Title</lable>
                        <input
                            style={{ padding: '5px', border: "1px solid", }} value={postjob?.title}
                            className="m-2" variant='outlined' id="standard" placeholder="Internship Title Eg. React developer"
                            onChange={(e) => { setpostjob({ ...postjob, title: e.target.value }) }} />

                    </div>
                    <div className='mt-2 d-flex flex-col'>
                        <lable>Internship Category</lable>

                        <select
                            value={postjob?.category}
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
                            value={postjob?.type}
                            style={{ padding: '5px', border: "1px solid", }}
                            onChange={(e) => { setpostjob({ ...postjob, type: e.target.value }) }}
                        >

                            <option key={0} aria-label="select Category" value='not selected'>in Office </option>
                            <option key={1} aria-label="select Category" value='not selected'>Work from home</option>


                        </select>
                    </div>

                    <div className='mt-2 d-flex flex-col'>

                        <lable>Skill Level</lable>
                        <select
                            value={postjob?.skilllevel}
                            style={{ padding: '5px', border: "1px solid", }}
                            onChange={(e) => { setpostjob({ ...postjob, skilllevel: e.target.value }) }}
                        >

                            <option key={0} aria-label="select Category" value='beginer'>BE-beginner </option>
                            <option key={1} aria-label="select Category" value='intermediate'>IM-intermediate</option>
                            <option key={2} aria-label="select Category" value='expert'>EX-Expert</option>


                        </select>
                    </div>


                    <div className='mt-2 d-flex flex-col'>
                        <lable>Job Discription</lable>
                        <textarea
                            value={postjob?.discription}
                            style={{ padding: '5px', border: "1px solid", }}
                            variant='outlined' id="standard-bas" placeholder="Job Discription Eg. responsibilities,
         required skills, perks etc." rows="2" className="m-2"
                            onChange={(e) => { setpostjob({ ...postjob, discription: e.target.value }) }} />
                    </div>
                    <div className='mt-2 d-flex flex-col'>
                        <lable>Required skills</lable>
                        <textarea
                            value={postjob?.skills}
                            style={{ padding: '5px', border: "1px solid", }}
                            variant='outlined' id="standard-bas" placeholder="skills Required" rows="3" className="m-2"
                            multiline onChange={(e) => { setpostjob({ ...postjob, skills: e.target.value }) }} />

                    </div>
                    <div className='mt-2 d-flex flex-col'>
                        <lable>Duration</lable>
                        <input
                            value={postjob?.duration}
                            style={{ padding: '5px', border: "1px solid", }}
                            variant='outlined' id="standard-basi" placeholder="Duration" className="m-2"
                            onChange={(e) => { setpostjob({ ...postjob, duration: e.target.value }) }} />

                    </div>
                    <div className='mt-2 d-flex flex-col'>
                        <lable>Location</lable>
                        <input
                            value={postjob?.location}
                            style={{ padding: '5px', border: "1px solid", }}
                            variant='outlined' id="standard-basi" placeholder="location" className="m-2"
                            onChange={(e) => { setpostjob({ ...postjob, location: e.target.value }) }} />

                    </div>

                    <div style={{ display: "flex", justifyContent: 'flex-end' }}>
                        <Button style={{ fontSize: "15px", backgroundColor: '#183E65', color: 'white', maxWidth: '200px' }}
                            onClick={postclick}
                        >
                            Save changes </Button>
                    </div>
                </div>
            </div>
        </Dialog>



    </>
    );
}

export default Postbnt
