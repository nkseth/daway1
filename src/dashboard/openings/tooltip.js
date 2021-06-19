import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Moodle from './moodle'

const useStyles = makeStyles((theme) => ({
    fab: {
        margin: theme.spacing(2),
    },
    absolute: {
        position: 'fixed',
        bottom: theme.spacing(10),
        right: theme.spacing(2),
    },
}));

export default function SimpleTooltips() {
    const classes = useStyles();
    const [mopen, setmopen] = useState(false);
    const closemoodel = () => {
        setmopen(false);
    }
    const openmoodel = () => {
        setmopen(true);
    }

    return (
        <div   >

            <Moodle open={mopen} close={closemoodel} />

            <Tooltip title="POST NEW INTERNSHIP" aria-label="add" onClick={openmoodel} >
                <Fab style={{ backgroundColor: '#183E65', color: 'white' }} className={classes.absolute}>
                    <AddIcon />
                </Fab>
            </Tooltip>


        </div >
    );
}
