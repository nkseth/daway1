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
import Quiz from "./tests/QuizMain"

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
                <div style={{ backgroundColor: '#F4F3EF', width: "100%", height: "100%", display: "flex", alignItems: 'center', justifyContent: "center" }}>
                    <div style={{
                        maxWidth: '50%', width: '50%',
                        boxShadow: '2px 2px 15px lightgray', borderRadius: "15px", backgroundColor: 'white'
                        , padding: "20px"
                    }} >
                        <Quiz testquestions={props.test} />
                    </div>

                </div>



            </Dialog>
        </div>





    );
}

export default Vediomoodle;