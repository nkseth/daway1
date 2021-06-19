import React from 'react';
import job from '../../asserts/job.png'
import { Image, Row, Col } from 'react-bootstrap'
import RoomIcon from '@material-ui/icons/Room';
import BusinessIcon from '@material-ui/icons/Business';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
const Jobi = () => (
    <div style={{
        border: "1px solid lightblue", borderRadius: "10px",
        padding: '5px', display: 'flex', marginTop: '10px',
        justifyContent: 'space-between', padding: '2vh'

    }}>
        <div className="d-flex align-items-center justify-content-center">
            <Image src={job} fluid />
            <div className="text-left">
                <h3 className="text-left ml-4" style={{ fontSize: "20px" }}>Developer</h3>
                <h3 className="text-left ml-4" style={{ fontSize: "1.5vh" }}>fsdfsdf</h3>
                <div className="text-left ml-4" style={{ display: 'flex' }}>


                    <div style={{ fontSize: "1.5vh", color: 'gray', margin: '5px' }}>
                        <RoomIcon style={{ fontSize: "1.5vh", color: 'gray' }} />
                Nasik
            </div>
                    <div style={{ fontSize: "1.5vh", color: 'gray', margin: '5px' }}>
                        <BusinessIcon style={{ fontSize: "1.5vh", color: 'gray' }} />
              Chef
            </div>
                    <div style={{ fontSize: "1.5vh", color: 'gray', margin: '5px' }}>
                        <QueryBuilderIcon style={{ fontSize: "1.5vh", color: 'gray' }} />
              10 days ago
            </div>
                </div>
            </div>

        </div>

        <div style={{

            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div style={{
                backgroundColor: "rgb(26,64,102)", width: '70px', height: '35px', color: "white",
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2vh'
            }}>
                Apply
            </div>
        </div>
    </div>
)
export default Jobi;