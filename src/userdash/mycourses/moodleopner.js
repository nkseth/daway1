import React, { useState } from 'react';
import { Backdrop, Button } from '@material-ui/core'
import ReactPlayer from 'react-player'
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Vediomoodle = (props) => {
    const [currentvideo, setcurrvideo] = useState(true)
    const closerfun = () => {
        setcurrvideo(false)
        props.closer()

    }

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);



    const handleClose = () => {
        setOpen(false);
    };
    return (




        <div>

            <Dialog fullScreen open={props.open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={closerfun} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {props.title}
                        </Typography>

                    </Toolbar>
                </AppBar>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{
                        margin: '10px', display: 'flex', alignItems: 'flex-start',
                        justifyContent: 'flex-start', height: '350px', width: '100%', flexDirection: 'column',
                    }}>
                        <ReactPlayer url={props.playlist + "&listType=playlist"} height="100%" width="100%" controls playing={currentvideo}
                            config={{
                                youtube: {
                                    playerVars: { showinfo: 0, listType: 'playlist', rel: 0 },

                                },
                                facebook: {
                                    appId: '12345'
                                }
                            }}


                        />



                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginRight: '10px' }}>
                        <iframe
                            src="https://codesandbox.io/embed/new?view=split"
                            style={{ width: "100%", height: "650px", border: "0", marginTop: "10px", borderRadius: "4px", overflow: "hidden" }}
                            allow={"accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"}
                            sandbox={"allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"}
                        />
                    </div>

                </div>

            </Dialog>
        </div>





    );
}

export default Vediomoodle;