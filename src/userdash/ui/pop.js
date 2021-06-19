import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import firebase from '../../firebase'
import { AiOutlineLogout } from "react-icons/ai"

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

export default function SimplePopover(props) {
    const classes = useStyles();




    const handleClose = () => {

        props.close()
    };

    const open = Boolean(props.anchor);
    const id = props.open ? 'simple-popover' : undefined;

    return (
        <div>

            <Popover
                id={id}
                open={props.open}
                anchorEl={props.anchor}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {props.children}
            </Popover>
        </div>
    );
}