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
import rigbg from '../asserts/img/register_bg_2.png'
const Loginpage = ({ history }) => {
  const [bd, setbd] = useState(false)
  const [errori, seterror] = useState(null)



  const handleLogin = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    setbd(true);
    try {
      await firebase.auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then((Curuser) => {

          const data = firebase.firestore().collection('companies').doc(Curuser.user.uid)
          data.get().then((onsnapshot) => {
            if (onsnapshot.exists) {

              history.push("/cdashboard")
            } else {
              const data = firebase.firestore().collection('user').doc(Curuser.user.uid)
              data.get().then((onsnapshot) => {
                if (onsnapshot.exists)

                  history.push("/sdashboard")
              })
            }
          })
        }).catch(err => {
          seterror(err.message)
          setTimeout(function () { seterror(null) }, 2000);
          setbd(false);
        })
    } catch (error) {
      seterror(error.message)
      setTimeout(function () { seterror(null) }, 2000);
      setbd(false);
    }
  }, [history]);
  const { currentUser } = useContext(AuthContext)
  console.log({ currentUser })

  if (currentUser) {

    const data = firebase.firestore().collection('companies').doc(currentUser.uid)
    data.get().then((onsnapshot) => {
      if (onsnapshot.exists) {

        history.push("/cdashboard")
      } else {
        const data = firebase.firestore().collection('user').doc(currentUser.uid)
        data.get().then((onsnapshot) => {
          if (onsnapshot.exists)

            history.push("/sdashboard")
        })
      }
    })

  }


  const SignUpbutton = () => {
    history.push('/Signuppage')

  }


  return (
    <>
      <main>

        <section className="relative w-full h-full pt-20 min-h-screen">
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
              <div className="w-full lg:w-4/12 px-12">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-sm font-bold">
                        Sign in with
                  </h6>
                    </div>
                    <div className="btn-wrapper text-center">

                      <button
                        className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                        type="button"
                      >
                        <img src={google} className="w-7 mr-1" />

                        Google
                  </button>
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-500 text-center mb-3 font-bold">
                      <small>Or sign in with credentials</small>
                    </div>
                    <form onSubmit={handleLogin}>
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


                      <div className="text-center mt-6">
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
                      to="/forgotpass"

                      className="text-gray-300"
                    >
                      <small>Forgot password?</small>
                    </Link>
                  </div>
                  <div className="w-1/2 text-right">
                    <Link to="/signuppage" className="text-gray-300">
                      <small>Create new account</small>
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