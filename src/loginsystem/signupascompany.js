import React, { useCallback, useContext, useState } from 'react'
import { withRouter, Redirect } from 'react-router';
import firebase from 'firebase'
import Backdrop from '../loader'
import Snackbar from '../snackbar'
import { Image } from 'react-bootstrap'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import { CardContent, CardActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import logo from '../asserts/logo2.png'
import Upload from './uploadbtn'
import { Link } from 'react-router-dom'
import google from '../asserts/google.png'
import rigbg from '../asserts/img/pattern_react.png'

const Signuppage = ({ history }) => {
    const [bd, setbd] = useState(false)
    const [errori, seterror] = useState(null)
    const [urlli, seturlli] = useState("")

    const handleSignup = useCallback(async event => {
        event.preventDefault();
        const { email, password, companyname, firstname, lastname } = event.target.elements;
        console.log(companyname.value)
        console.log(firstname.value)

        console.log(lastname.value)

        setbd(true);
        try {
            await firebase.auth()
                .createUserWithEmailAndPassword(email.value, password.value)
                .then((data) => {
                    const currentuser = firebase.auth().currentUser.uid
                    console.log(currentuser)
                    console.log(data.user.getIdToken())



                    return firebase.firestore().collection('companies').doc(currentuser).set({
                        active: false, docurl: urlli, companyname: companyname.value, lastname: lastname.value,
                        firstname: firstname.value
                    }).then(() => {
                        setbd(false);
                        history.push('/Loginpage');
                    }

                    )
                        .catch(error => {
                            seterror(error.message)
                            setTimeout(function () { seterror(null) }, 2000);
                            setbd(false);
                            console.log(error.message)
                        })


                }

                )

        } catch (error) {
            seterror(error.message)
            setTimeout(function () { seterror(null) }, 2000);
            setbd(false);
        }
    }, [history]);


    const loginpaa = () => {
        history.push('/Loginpage')
    }
    const loginpaaa = () => {
        history.push('/Signuppage')
    }
    const heel = (papi) => {
        seturlli(papi)
        seterror("uploaded successfully")
        setTimeout(function () { seterror(null) }, 2000);
        setbd(false);

    }
    return (
        <>
            <main>

                <section className="relative w-full h-full pt-6 min-h-screen">
                    <div
                        className="absolute top-0 w-full h-full bg-gray-900 bg-no-repeat bg-full"
                        style={{
                            backgroundImage:
                                `url(${rigbg})`,
                        }}
                    ></div>
                    <Backdrop open={bd} />
                    <Snackbar open={errori ? true : false} message={errori} />

                    <div className="container mx-auto px-4 h-full">
                        <div className="flex content-center items-center justify-center h-full">
                            <div className="w-full lg:w-4/12 px-5">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                                    <div className="rounded-t mb-0 px-6 py-6">
                                        <div className="text-center mb-3">
                                            <h6 className="text-gray-600 text-sm font-bold">
                                                Company Registration
                </h6>
                                        </div>

                                        <hr className="mt-6 border-b-1 border-gray-400" />
                                    </div>
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

                                        <form onSubmit={handleSignup}>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>


                                                <div className="relative w-full mb-3">
                                                    <label
                                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                        htmlFor="grid-password"
                                                    >
                                                        Firstname
</label>
                                                    <input name="firstname"
                                                        type="text"
                                                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                                        placeholder="firstname"
                                                    />
                                                </div>
                                                <div className="relative w-full mb-3 ml-2">
                                                    <label
                                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                        htmlFor="grid-password"
                                                    >
                                                        Lastname
</label>
                                                    <input name="lastname"
                                                        type="text"
                                                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                                        placeholder="Lastname"
                                                    />
                                                </div>

                                            </div>
                                            <div className="relative w-full mb-3 ">
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Company Name
</label>
                                                <input name="companyname"
                                                    type="text"
                                                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                                    placeholder="Company name"
                                                />
                                            </div>

                                            <div className="relative w-full mb-3">
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

                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Password
                  </label>
                                                <input name="password"
                                                    type="password"
                                                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                                    placeholder="Password"
                                                />
                                            </div>



                                            <Upload urli={heel} />

                                            <div className="text-center mt-1">
                                                <button
                                                    className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                                    type="submit"
                                                >
                                                    Sign In
                  </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="flex flex-wrap mt-6 relative">
                                    <div className="w-1/2">
                                        <Link
                                            to="/loginpage"

                                            className="text-gray-300"
                                        >
                                            <small>Signin</small>
                                        </Link>
                                    </div>
                                    <div className="w-1/2 text-right">
                                        <Link to="/signuppage" className="text-gray-300">
                                            <small>Signup as User</small>
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
export default withRouter(Signuppage); 