import React from 'react'
import './homepage.css'
import Curo from './curasol'
import Train from './dawaytrainings'
import Noti from './noti'
import Tosti from './testimonial'
import { Link } from 'react-router-dom'
import Navbar from './navbar'
import Footer from './footer'
import { Button } from '@material-ui/core'
const Homepage = () => {
    return (
        < div className="homepage" style={{ maxWidth: '100%' }}>
            <Button variant="contained" component={Link} to='/Loginpage'>Login</Button>
            <Navbar />
            <Curo />
            <Train />
            <Noti />
            <Tosti />
            <Footer />
        </div >)

}
export default Homepage