import { Avatar } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React from 'react';
const Feedbackcomp = (props) => {
    return (<div>

        <Rating value={props.value} readonly />
        <div>{props.companyname}</div>

        <div>{props.enddate}</div>

        <div>{props.feedback}</div>
    </div>);
}

export default Feedbackcomp;