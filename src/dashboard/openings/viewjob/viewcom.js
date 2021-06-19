import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Switch } from '@material-ui/core';
import firebase from 'firebase';
import Alert from "../../ui/alertmo";
import EventNoteIcon from '@material-ui/icons/EventNote';
import CategoryIcon from '@material-ui/icons/Category';
import VisibilityIcon from '@material-ui/icons/Visibility';

import Moodel from './viewmoodle'


import { Avatar } from '@material-ui/core';
const Appcomp = (props) => {
    const [mo, setmo] = useState(false);
    const closemo = () => { setmo(false); };

    const [opener, setopner] = useState(false);
    const swchange = () => {
        const fet = async () => {
            const db = firebase.firestore()
            const currentUser = firebase.auth().currentUser.uid
            const da = await db.collection('companies/' + currentUser + '/postedjobs').doc(props.postid)

            da.update({ status: !props.jobstatus })

        }
        fet()
    }

    const finaldel = (res) => {

        const fet = async () => {
            const db = firebase.firestore()
            const currentUser = firebase.auth().currentUser.uid
            const da = await db.collection('companies/' + currentUser + '/postedjobs').doc(props.postid)

            da.delete().then(async () => {
                const datai = await db.collection("companies").doc(currentUser).update({
                    postedjobs: firebase.firestore.FieldValue.increment(-1)
                }).then((response) => {
                    console.log(response)
                    console.log('this is then')


                })
            })

        }
        if (res === 'agree') {
            fet()
        }
        setopner(false)
    }

    const Del = () => {
        setopner(true)
    }

    return (
        <>
            <Moodel open={mo} closemo={closemo} data={props.appdata} />
            <Alert content='are you sure you want to delete' fun={finaldel} open={opener} />
            <tr>

                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left items-center">



                    {props.title}

                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left  items-center">
                    {props.location}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    <i className="fas fa-circle text-orange-500 mr-2"></i> {props.category}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    <span className="flex">
                        {props.createddate}
                    </span>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    <div className="flex items-center">
                        <span className="mr-2">{props.jobstatus ? "Active" : "inactive"}</span>


                    </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                    <div className='d-flex w-100 mt-4' style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                        <VisibilityIcon onClick={() => { setmo(true) }}>View</VisibilityIcon>
                        <Switch
                            style={{ color: '#183E65' }}
                            checked={props.jobstatus}
                            color='primary'
                            onChange={() => swchange()}
                        />
                        <DeleteIcon onClick={Del} />

                    </div>

                </td>
            </tr>
        </>
    );
}

export default Appcomp;