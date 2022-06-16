import { Box } from '@mui/material';
import React from 'react';
import './CTAButton.scss';

//Handling Styles
/*
    - passing in the inverted classname switches 
    - passing in a width/height value as a prop allows custom widths and heights
*/ 

const CTAButton = ({text, classname, width, height, buttonFunction, component}) => {
    return(
        <Box 
            aria-label="open"
            className={`${classname === 'inverted' ? classname : 'cta-btn'}`}
            sx={{
                minWidth: `${width ? width + 'px' : '100px'}`,
                minHeight: `${height ? height + 'px' : '35px'} !important`,
                gap: component && text ? '10px' : 'none'
            }}
            onClick={buttonFunction}
        >

            {component ? component : ''}
            {text ? text : ''}

        </Box>
    );
};

export default CTAButton;