import React from 'react';
import Jobi from './job'
import ViewJobs from './viewjob/view'
import Tooltip from './tooltip'

const Open = (props) => {
    return (<div style={{ padding: '0px', margin: '0px' }}>
        <ViewJobs />

        <Tooltip />


    </div>);
}

export default Open;