import React from 'react'
import py from '../../asserts/py.svg'
import wd from '../../asserts/wd.svg'
import dm from '../../asserts/dm.svg'
import ml from '../../asserts/ml.svg'
import and from '../../asserts/and.png'
import { Image, Row, Col } from 'react-bootstrap'

import Navbar from '../navbar/navbar'
const Train = () => {
    return (
        < div className="d-flex container-fluid  
        flex-column  justify-content-center
       
        ">
            <div className="d-flex container justify-content-center
         flex-column
        ">
                <h1 style={{
                    color: '#333333',
                    fontSize: '3vh'
                }}>Daway Learnings</h1>
                <h2
                    style={{ fontSize: '2vh', color: 'gray' }}
                >Learn new-age skills on the go</h2>
            </div>
            <div className="container">
                <Row className="d-flex flex-row justify-content-around" >
                    <Row>
                        <Col sm={12} className='m-2'>
                            <Image fluid
                                src={py} />
                            <h3
                                style={{ fontSize: '15px' }}
                            >Programming in python</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} className='m-2'>
                            <Image fluid
                                src={wd} />
                            <h3
                                style={{ fontSize: '15px' }}
                            >Web Development</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} className='m-2'>
                            <Image fluid
                                src={dm} />
                            <h3
                                style={{ fontSize: '15px' }}
                            >Digital Marketing</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} className='m-2'>
                            <Image fluid
                                src={ml} />
                            <h3
                                style={{ fontSize: '15px' }}
                            >Machine Learning</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} className='m-2'>
                            <Image fluid
                                src={and} style={{ height: '85px' }} />
                            <h3
                                style={{ fontSize: '15px' }}
                            >Android Development</h3>
                        </Col>
                    </Row>
                </Row>
            </div>
        </div >)

}
export default Train