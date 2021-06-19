import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Rating from '@material-ui/lab/Rating'
import Moodel from './applicentmoodle'
import firebase from '../../firebase'
import { FcApproval } from 'react-icons/fc'
import Alert from '../../snackbar'
import Loder from '../../loader'

const styles = (theme) => ({
    root: {
        margin: 0,

        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: "red",
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;

    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {


    const [value, setValue] = React.useState(0);
    const [textarea, settextarea] = React.useState(null);
    const [alert, setalert] = React.useState(false);
    const [loder, setloader] = React.useState(false)

    const handleClose = () => {
        setValue(0)
        props.closemo()
    };
    const handleClosesubmit = () => {
        setValue(0)
        props.closemo()
    };

    const statuschanger = (statu) => {
        console.log("this is run")
        const fetuserdetails = async () => {
            if (textarea != null && value > 2) {

                const db = firebase.firestore()
                const currentuser = firebase.auth().currentUser.uid
                setloader(true)
                const papl = await db.collection("companies/" + currentuser + "/applieduser/").doc(props.appid)
                papl.update({ status: statu })
                    .then(async () => {

                        const papli = await db.collection("companies/" + currentuser + "/finishedintership/")
                        papli.add({
                            ...props.data, feedback: textarea, rating: value, internshipdata: props.internshipdata,
                            finaltimestamp: firebase.database.ServerValue.TIMESTAMP
                        })
                        setloader(false); handleClosesubmit()
                    })
                    .catch()
            }
            else {
                setalert("please fill all the details")
                setTimeout(function () { setalert(null) }, 2000)
            }




        }
        fetuserdetails()
    }

    return (
        <div>
            <Loder open={loder} />
            <Alert open={alert ? true : false} message={alert} />
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title"


                open={props.open} maxWidth={false} maxHeight={false}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{ boxShadow: '3px 2px 30px lightgray' }} >
                    <div style={{ display: 'flex', justifyContent: "center", marginRight: '30px', alignItems: 'center' }}>

                        {props.data.displayname}

                    </div>



                </DialogTitle>
                <DialogContent dividers className="d-flex flex-column align-items-start" style={{
                    maxHeight: "500px", width: '90vw'
                    , overflowY: 'scroll', padding: '30px'
                }}>
                    <div>Please rate your experience with the {props.data.displayname}</div>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(event.target.value);
                        }}
                    />
                    <div>Your Valuable feedback about the {props.data.displayname}</div>

                    <textarea rows="6" style={{
                        minWidth: "70%", border: "1px solid black",
                        padding: '10px'
                    }} onChange={(event, newValue) => { settextarea(event.target.value) }} />

                </DialogContent>
                <DialogActions>

                    <div style={{
                        display: 'flex', justifyContent: 'space-between',

                        alignItems: 'center', paddingLeft: '5px', paddingRight: '5px', cursor: 'pointer',
                        fontTransform: 'uppercase', fontWeight: 'bold', border: '1px solid #183E56'
                    }} onClick={() => statuschanger("finished")}>



                        Submit Feedback
                        <FcApproval size={32} style={{ cursor: 'pointer' }} />
                    </div>



                </DialogActions>
            </Dialog>
        </div>
    );
}
