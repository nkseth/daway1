import React, { useContext, useEffect, useState } from 'react';
import Card from '@material-ui/core/Card'
import { Checkbox, Button } from '@material-ui/core'
import firebase from 'firebase'
import { JobcategoryContext } from '../../context/jobcategory'

const Prefer = (props) => {
    const [cate, setcate] = useState([])
    const { jobcate } = useContext(JobcategoryContext)
    const [check, setcheck] = useState(null)


    useEffect(() => {
        const feti = async () => {
            console.log('this is thesdfsn')
            const db = firebase.firestore()
            const currentUser = firebase.auth().currentUser?.uid
            const da = await db.collection('user/' + currentUser + '/preferences').doc('selectedcategory')

            da.get().then((data) => {
                setcheck(data.data())
                props.satcheck(data.data())
                setcate(jobcate)
            })


        }
        feti()






    }, [])



    const checkboxhandler = (event, ame) => {

        setcheck({ ...check, [ame]: event.target.checked })

        props.satcheck({ ...check, [ame]: event.target.checked })




    }
    const saver = () => {
        const fet = async () => {
            console.log('this is thesdfsn')
            const db = firebase.firestore()
            const currentUser = firebase.auth().currentUser.uid
            const da = await db.collection('user/' + currentUser + '/preferences').doc('selectedcategory')

            da.set(check)
                .then(() => {
                    console.log('this is then')
                }).catch((error) => {
                    console.log(error)
                })

        }
        fet()
    }

    return (<div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
        backgroundColor: 'white', padding: '5px', boxShadow: '2px 3px 50px lightgray'
        , borderBottom: '4px solid #183E65', maxWidth: '200px', height: "400px", borderRadius: "5px"
    }}>
        <h1 style={{ fontSize: "20px", fontFamily: 'sans-serif' }}>Select Internships Category</h1>

        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }} className="p-3 m-2">

            {cate?.map((item) => (
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Checkbox color='primary'
                            checked={check === undefined || check === null ? false : check[item] === undefined ? false : check[item]}
                            onChange={(e) => checkboxhandler(e, item)}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <div style={{ textTransform: 'capitalize', fontSize: '20px', fontWeight: 'lighter' }}>{item}</div>
                    </div>

                </div>
            ))}
            <div>
                <Button onClick={saver}> Save</Button>
            </div>

        </div>
    </div>


    );
}

export default Prefer;