import React, { useState } from 'react';
import TableDropdown from "../../components/Dropdowns/TableDropdown";
import CancelIcon from '@material-ui/icons/Cancel';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Moodel from './applicentmoodle'
import firebase from "../../firebase"
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Avatar } from '@material-ui/core';
import { FcApproval } from "react-icons/fc"
import Finishedmoodle from "./finishedmoodle"
const Appcomp = (props) => {
    const [mo, setmo] = useState(false);
    const [mo1, setmo1] = useState(false);
    const closemo = () => { setmo(false); };
    const closemo1 = () => { setmo1(false); };

    const statuschanger = (statu) => {
        console.log("this is run")
        const fetuserdetails = async () => {
            const db = firebase.firestore()
            const currentuser = firebase.auth().currentUser.uid
            const papl = await db.collection("companies/" + currentuser + "/applieduser/").doc(props.appliedid)
            papl.update({ status: statu })




        }
        fetuserdetails()
    }

    return (<tr>
        <Finishedmoodle open={mo1} closemo={closemo1} data={props.appdata} appid={props.appliedid} internshipdata={props.internshipdata} />
        <Moodel open={mo} closemo={closemo} data={props.appdata} appid={props.appliedid} idatastatus={props.internshipdata.status} />
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center">
            <Avatar src={props.appdata.studentlogo} />
            {console.log()}
            <span
                className={
                    "ml-3 font-bold "

                }
            >
                {props.name}

            </span>
        </th>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
            {props.title}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
            <i className="fas fa-circle text-orange-500 mr-2"></i> {props.status}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
            <div className="flex">
                {props.date}
            </div>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
            <div className="flex items-center">
                <span className="mr-2">60%</span>
                <div className="relative w-full">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                        <div
                            style={{ width: "60%" }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                        ></div>
                    </div>
                </div>
            </div>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">

            {props.status === 'finished'
                ? <VisibilityIcon style={{ color: "#183E65", cursor: 'pointer' }} onClick={() => { setmo(true) }} /> :

                <div style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center', paddingLeft: '5px', paddingRight: '5px' }}>
                    <VisibilityIcon style={{ color: "#183E65", cursor: 'pointer' }} onClick={() => { setmo(true) }} />
                    <ThumbUpIcon style={{ color: "#183E65", cursor: 'pointer' }} onClick={() => statuschanger("selected")} style={{ color: "blue", }} />
                    <CancelIcon style={{ color: "#183E65", cursor: 'pointer' }} onClick={() => statuschanger("rejected")} style={{ color: "red", }} />
                    <FcApproval style={{ color: "#183E65", cursor: 'pointer' }} size={25} onClick={() => { setmo1(true) }} style={{ color: "red", }} />


                </div>}
        </td>
    </tr>);
}

export default Appcomp;