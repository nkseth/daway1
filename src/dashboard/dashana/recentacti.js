import { Card } from '@material-ui/core';
import React from 'react';
import Timeline from './timeline'

const Rcent = () => {
    return (<div>


        <div>
            Notifications
</div>
        <div style={{
            height: '40vh', width: '100%', overflowX: 'hidden', display: 'flex',
            flexDirection: 'column', justifyContent: 'left'
        }}>

            <Timeline date='10 FEB 2020' noti='hello ghnghfg ffghfdgfdg dgfgsdfg' />

        </div>

    </div>);
}

export default Rcent;