import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Label, PinDropSharp } from '@material-ui/icons';
import firebase from "firebase";
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '../../loader'
import Snackbar from '../../snackbar'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));


export default function UploadButtons(props) {
    const [fil, setfil] = React.useState()
    const [bd, setbd] = useState(false)
    const [errori, seterror] = useState(null)

    const classes = useStyles();
    const [imgprogress, setimgprogress] = React.useState(0)
    const [catergorylogo, setcategorylogo] = React.useState()

    const uploadhandler = (e) => {
        setfil({ file: e.target.files, name: e.target.name })
    }

    const uploading = () => {
        var file = fil.file[0]
        setbd(true)
        var storageRef = firebase.storage().ref();
        // Create the file metadata
        var metadata = {
            contentType: 'userprofile/jpeg'
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = storageRef.child('userprofile/' + file.name).put(file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function (snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setimgprogress(progress)
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, function (error) {

                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;

                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;

                }

                seterror(error.message)
                setTimeout(function () { seterror(null) }, 2000);
                setbd(false);
            }, function () {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    console.log('File available at', downloadURL);
                    setcategorylogo(downloadURL)
                    props.urli(downloadURL)
                    setbd(false);
                    setfil(null)
                    const fetuserdetails = async () => {
                        const db = firebase.firestore()
                        const currentuser = firebase.auth().currentUser.uid
                        const papl = await db.collection("user").doc(currentuser).update({ logourl: downloadURL })

                    }
                    fetuserdetails()
                });
            });

    }




    return (
        <div className='d-flex p-3 justify-content-center align-items-center'>
            <Backdrop open={bd} />
            <Snackbar open={errori ? true : false} message={errori} />
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={uploadhandler}
            />

            <label htmlFor="contained-button-file">
                <Button variant='contained' style={{ backgroundColor: '#183E65', color: 'white' }} component="span">
                    {fil ? fil.file[0].name : 'Update Company Logo'}
                </Button>
            </label>
            {fil ?
                <Button
                    onClick={uploading}
                    color='secondary' style={{ textTransform: 'capitalize' }} >
                    Click Here to update</Button>
                : null}
        </div>
    );
}
