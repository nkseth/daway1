import React from 'react'
import Jobi from './jobi'
import job from '../../asserts/job.png'
import { Image, Row, Col } from 'react-bootstrap'

import Navbar from '../navbar/navbar'
const Noti = () => {
    return (
        < div id='dsdd' className="d-flex container-fluid text-center
        flex-column mt-5 justify-content-center p-0 m-0 
        " style={{ alignItems: 'center' }}>

            <div className="container-fluid  d-flex flex-row justify-content-around row">


                <Col lg={6} >

                    <h1 style={{
                        color: '#333333',
                        fontSize: '3vh'
                    }}>Job Details</h1>
                    <h2
                        style={{ fontSize: '2vh', color: 'gray' }}
                    >Learn new-age skills on the go</h2>
                    <Jobi />
                    <Jobi />
                    <Jobi />
                </Col>


                <Col lg={6} >

                    <h1 style={{
                        color: '#333333',
                        fontSize: '3vh'
                    }}>Internship details</h1>
                    <h2
                        style={{ fontSize: '2vh', color: 'gray' }}
                    >Learn new-age skills on the go</h2>
                    <Jobi />
                    <Jobi />
                    <Jobi />
                </Col>



            </div>
        </div >)

}
export default Noti