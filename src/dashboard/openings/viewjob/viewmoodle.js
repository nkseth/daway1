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
import Edit from './editint'


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

    return (
        <div>

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title"


                open={props.open} maxWidth={false}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{ boxShadow: '3px 2px 30px lightgray' }} >

                    {props.data.title}


                </DialogTitle>
                <DialogContent dividers className="d-flex flex-column align-items-start" style={{
                    maxHeight: "500px", width: '90vw'
                    , overflowY: 'scroll', padding: '30px'
                }}>

                    <div style={{ padding: '10px', boxShadow: '4px 4px 30px lightgray', width: '100%', marginTop: '20px' }}>

                        <div style={{ display: 'flex', justifyContent: "center" }} className="text-left  flex-column">
                            <strong className="mb-2">Internship id: </strong> {props.data.id}
                        </div>
                    </div>

                    <div style={{ padding: '10px', boxShadow: '4px 4px 30px lightgray', width: '100%', marginTop: '20px' }}>

                        <div style={{ display: 'flex', justifyContent: "center" }} className="text-left  flex-column">
                            <strong className="mb-2">Created Date: </strong> {props.data.createddate}
                        </div>
                    </div>

                    <div style={{ padding: '10px', boxShadow: '4px 4px 30px lightgray', width: '100%', marginTop: '20px' }}>

                        <div style={{ display: 'flex', justifyContent: "center" }} className="text-left  flex-column">
                            <strong className="mb-2">Status: </strong> {props.data.status ? "Active" : 'Inactive'}
                        </div>
                    </div>


                    <div style={{ padding: '10px', boxShadow: '4px 4px 30px lightgray', width: '100%', marginTop: '20px' }}>

                        <div style={{ display: 'flex', justifyContent: "center" }} className="text-left  flex-column">
                            <strong className="mb-2">Category: </strong> {props.data.category}
                        </div>
                    </div>

                    <div style={{ padding: '10px', boxShadow: '4px 4px 30px lightgray', width: '100%', marginTop: '20px' }}>

                        <div style={{ display: 'flex', justifyContent: "center" }} className="text-left  flex-column">
                            <strong className="mb-2">Discription: </strong> {props.data.discription}
                        </div>
                    </div>

                    <div style={{ padding: '10px', boxShadow: '4px 4px 30px lightgray', width: '100%', marginTop: '20px' }}>

                        <div style={{ display: 'flex', justifyContent: "center" }} className="text-left  flex-column">
                            <strong className="mb-2">Duration: </strong> {props.data.duration}
                        </div>
                    </div>

                    <div style={{ padding: '10px', boxShadow: '4px 4px 30px lightgray', width: '100%', marginTop: '20px' }}>

                        <div style={{ display: 'flex', justifyContent: "center" }} className="text-left  flex-column">
                            <strong className="mb-2">Required Skills: </strong> {props.data.skills}
                        </div>
                    </div>
                    {props.data.updatedddate === null || props.data.updatedddate === undefined ? null :
                        <div style={{ padding: '10px', boxShadow: '4px 4px 30px lightgray', width: '100%', marginTop: '20px' }}>

                            <div style={{ display: 'flex', justifyContent: "center" }} className="text-left  flex-column">
                                <strong className="mb-2">Last updated: </strong> {props.data.updatedddate}
                            </div>
                        </div>

                    }



                </DialogContent>
                <DialogActions>

                    <Edit id={props.data.id} />


                </DialogActions>
            </Dialog>
        </div>
    );
}
