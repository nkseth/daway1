import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function CircularProgressWithLabel(props) {
    return (
        <Box position="relative" display="inline-flex">
            <LinearProgress variant="determinate" {...props} style={{
                color: 'black'
            }} />
            < Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >

                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
                    props.value
                )}%`} </Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

export default function CircularStatic() {



    return (
        <div>

            <Typography variant="caption" component="div" color="textSecondary">Skill level 60%</Typography>


            <div style={{ width: '100px', height: '10px', border: '1px solid lightgray', borderRadius: '30px', padding: '2px' }}
            >
                <div style={{ width: '60%', height: '100%', backgroundColor: '#183E65', borderRadius: '30px', margin: 0 }}></div>
            </div>

        </div>
    )

}
