import React from 'react'
import { Carousel, Image } from 'react-bootstrap'
import c1 from '../../asserts/11.PNG'
import c2 from '../../asserts/2.PNG'
import c3 from '../../asserts/3.PNG'
const Curo = () => {
    const mwnuwidth = window.innerWidth
    return (
        <Carousel className="m-lg-5 m-2 mt-3 " indicators={false}  >
            <Carousel.Item>
                <Image fluid
                    className="d-block w-100"
                    src={c1}
                    alt="First slide"
                    style={{ height: mwnuwidth < 800 ? '20vh' : '50vh', }}
                />

            </Carousel.Item>
            <Carousel.Item>
                <Image fluid
                    className="d-block w-100"
                    src={c2}
                    alt="Third slide"
                    style={{ height: mwnuwidth < 800 ? '20vh' : '50vh', }}
                />


            </Carousel.Item>
            <Carousel.Item>
                <Image fluid
                    className="d-block w-100"
                    src={c3}
                    alt="Third slide"
                    style={{ height: mwnuwidth < 800 ? '20vh' : '50vh', }}
                />


            </Carousel.Item>
        </Carousel>
    )
}
export default Curo