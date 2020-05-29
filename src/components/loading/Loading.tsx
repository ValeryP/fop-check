import React from 'react'
import './Loading.scss';
import {Box, Typography} from "@material-ui/core";

export default function Loading() {
    return <Box style={{textAlign: 'center'}}>
        <Box className="loader" style={{left: '43%'}}>
            <div className="loader__bar"/>
            <div className="loader__bar"/>
            <div className="loader__bar"/>
            <div className="loader__bar"/>
            <div className="loader__bar"/>
            <div className="loader__ball"/>
        </Box>
        <Typography variant="h4"
                    style={{fontWeight: 100, letterSpacing: 4}}>
            Завантаження
        </Typography>
    </Box>;
};