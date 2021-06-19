import React, { useState } from 'react';
import papo from '../../asserts/2.PNG';
import { Button } from '@material-ui/core'
import Moodel from './moodleopner'
import Moodel1 from './moodletest'


const Course = (props) => {
    const [opner, setopner] = useState(false)
    const [opner1, setopner1] = useState(false)
    const closer = () => {
        setopner(false)
    }

    const closer1 = () => {
        setopner1(false)
    }
    return (<div >
        <Moodel open={opner} closer={closer} playlist={props.playlist} title={props.title} />
        <Moodel1 open={opner1} closer={closer1} test={props.testquestions} title={props.title} />
        <div style={{
            display: 'flex', flexDirection: 'column', margin: '20px',
            maxWidth: '300px',
            padding: '10px', border: '1px solid lightgray', borderRadius: '20px', backgroundColor: 'white'
        }}>

            <img src={props.thumbnail} style={{ maxWidth: '300px', objectFit: "contain" }}></img>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <lable style={{ fontSize: '20px', fontWeight: 'bold' }}>{props.title}</lable>
                <label style={{
                    fontSize: '15px', color: 'gray', backgroundColor: 'lightgray',
                    borderRadius: '50px', padding: "0px 10px"
                }}>{props.category}</label>
            </div>

            <label>{props.discription}</label>
            <Button variant='contained'
                onClick={() => { setopner(true); }}
                style={{ backgroundColor: '#183E65', color: 'white' }}>Start Learning</Button>
            <Button variant='contained'
                onClick={() => { setopner1(true); }}
                style={{ border: '#183E65 1px solid', color: '#183E65', marginTop: '5px' }}>Take Quiz</Button>
        </div>

    </div>);
}

export default Course;