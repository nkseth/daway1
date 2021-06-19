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
import Moodel from './applicentmoodle'
import firebase from '../../firebase'

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



    const handleClose = () => {

        props.closemo()
    };

    const statuschanger = (statu) => {
        console.log("this is run")
        const fetuserdetails = async () => {
            const db = firebase.firestore()
            const currentuser = firebase.auth().currentUser.uid
            const papl = await db.collection("companies/" + currentuser + "/applieduser/").doc(props.appid)
            papl.update({ status: statu })
                .then(() => props.closemo())



        }
        fetuserdetails()
    }

    return (
        <div>

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title"


                open={props.open} maxWidth={false}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{ boxShadow: '3px 2px 30px lightgray' }} >
                    <div style={{ display: 'flex', justifyContent: "center", marginRight: '30px', alignItems: 'center' }}>

                        {props.data.displayname}

                    </div>



                </DialogTitle>
                <DialogContent dividers className="d-flex flex-column align-items-start" style={{
                    maxHeight: "500px", width: '90vw'
                    , overflowY: 'scroll', padding: '30px'
                }}>

                    <div style={{ display: 'flex', justifyContent: "center", marginRight: '30px', alignItems: 'center', width: '100%' }}>
                        <Avatar className=" mr-2" style={{ height: "200px", width: '200px' }} src={props.data.studentlogo} />

                    </div>
                    <div style={{ padding: '10px', boxShadow: '4px 4px 30px lightgray', width: '100%', marginTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: "center" }} className="text-left  flex-column">
                            <strong className="mb-2">Phone No. : </strong> {props.data.phone}
                        </div>
                        <div style={{ display: 'flex', justifyContent: "center" }} className="text-left  mt-1 flex-column">
                            <strong className="mb-2"> Address : </strong> {props.data.Address}
                        </div>
                    </div>

                    <div style={{ padding: '10px', boxShadow: '4px 4px 30px lightgray', width: '100%', marginTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: "center" }} className="text-left  flex-column">
                            <strong className="mb-2">Presentation : </strong> {props.data.Presentation}
                        </div>
                    </div>

                    <div style={{ padding: '10px', boxShadow: '4px 4px 30px lightgray', width: '100%', marginTop: '20px' }}>

                        <div style={{ display: 'flex', justifyContent: "center" }} className="text-left  flex-column">
                            <strong className="mb-2">Experience : </strong> {props.data.Experience}
                        </div>
                    </div>
                    <div style={{ padding: '10px', boxShadow: '4px 4px 30px lightgray', width: '100%', marginTop: '20px' }}>

                        <div style={{ display: 'flex', justifyContent: "center" }} className="text-left  flex-column">
                            <strong className="mb-2">Skills: </strong> {props.data.skills}
                        </div>
                    </div>

                    <div style={{ padding: '10px', boxShadow: '4px 4px 30px lightgray', width: '100%', marginTop: '20px' }}>

                        <div style={{ display: 'flex', justifyContent: "center" }} className="text-left  flex-column">
                            <strong className="mb-2">Education: </strong> {props.data.Education}
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    {console.log(props.idatastatus)}

                    {props.idatastatus === "finished" ? null
                        : <div style={{
                            display: 'flex', justifyContent: 'space-between',
                            minWidth: "200px",
                            alignItems: 'center', paddingLeft: '5px', paddingRight: '5px'
                        }}>
                            <ThumbUpIcon onClick={() => statuschanger("selected")} style={{ color: "blue", fontSize: '40px' }} />
                            <CancelIcon onClick={() => statuschanger("rejected")} style={{ color: "red", fontSize: '40px' }} />
                        </div>}




                </DialogActions>
            </Dialog>
        </div>
    );
}
