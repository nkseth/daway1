import { Button } from '@material-ui/core';
import React, { useContext, useState, useEffect } from 'react';
import Firebase from 'firebase'
import { AuthContext } from '../Auth';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom'

const Loginusertype = ({ history }) => {
    const { currentUser } = useContext(AuthContext)


    const student = () => {


        const cali = Firebase.functions().httpsCallable('createUsertype')
        cali({ type: 'student', eil: currentUser.email }).then((result) => {
            console.log(result)


            Firebase.auth().signOut()
            history.push('/Loginpage')

        })



    }
    const company = () => {

        const cali = Firebase.functions().httpsCallable('createUsertype')
        cali({ type: 'company', eil: currentUser.email }).then(async (result) => {
            console.log(result)

            await Firebase.auth().signOut().then(() => {
                history.push('/Loginpage')
                console.log('signout success')
                console.log(currentUser)
            })


        })
    }



    console.log(currentUser.usertype)

    return (

        <div>
            <Button onClick={student}>log in as student </Button>
            <Button onClick={company}>log in as company </Button>

            <h1>{currentUser.usertype}sdsadsa</h1>

        </div>
    )
}

export default withRouter(Loginusertype);