import React, { useCallback, useContext, useEffect, useState } from 'react'
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import { AuthContext } from '../Auth';
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import { CardContent, CardActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Backdrop from '../loader'
import Snackbar from '../snackbar'
import { Image } from 'react-bootstrap'
import logo from '../asserts/logo2.png'
import Navbarmin from '../components/Navbars/AuthNavbar'
import google from '../asserts/google.png'
const Loginpage = ({ history }) => {
    const [bd, setbd] = useState(false)
    const [errori, seterror] = useState(null)



    const forgrotpass = (e) => {
        var auth = firebase.auth();
        e.preventDefault()
        var { email } = e.target.elements;
        setbd(true);
        auth.sendPasswordResetEmail(email.value).then(function () {
            setbd(false);
            seterror("email send successfully")
            setTimeout(function () {
                seterror(null)
                history.push("/loginpage")
            }, 2000);

        }).catch(function (error) {
            seterror(error.message)
            setTimeout(function () { seterror(null) }, 2000);
            setbd(false);
            // An error happened.
        });
    }






    return (
        <>
            <main>

                <section className="relative w-full h-full pt-20 min-h-screen">
                    <div
                        className="absolute top-0 w-full h-full bg-gray-900 bg-no-repeat bg-full"
                        style={{
                            backgroundImage:
                                "url(" + require("../asserts/img/register_bg_2.png") + ")",
                        }}
                    ></div>
                    <Backdrop open={bd} />
                    <Snackbar open={errori ? true : false} message={errori} />

                    <div className="container mx-auto px-4 h-full">
                        <div className="flex content-center items-center justify-center h-full">
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">

                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

                                        <form onSubmit={forgrotpass}>
                                            <div className="relative w-full mb-3 mt-3">
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Email
                    </label>
                                                <input name="email"
                                                    type="email"
                                                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                                    placeholder="Email"
                                                />
                                            </div>





                                            <div className="text-center mt-6">
                                                <button
                                                    className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                                    type="submit"
                                                >
                                                    Send reset password email
                    </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="flex flex-wrap mt-6 relative">
                                    <div className="w-1/2">
                                        <Link to="/loginpage"


                                            className="text-gray-300"
                                        >
                                            <small>Sign in</small>
                                        </Link>
                                    </div>
                                    <div className="w-1/2 text-right">
                                        <Link to="/signuppage" className="text-gray-300">
                                            <small>Sign up</small>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
export default withRouter(Loginpage); 