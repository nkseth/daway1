import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';


export default function SimpleSnackbar(props) {



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }


    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={props.open}
                autoHideDuration={4000}
                onClose={handleClose}
                message={props.message}

            />
        </div>
    );
}
