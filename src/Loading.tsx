import React from 'react'
import './Loading.scss';
import {Grid, Typography} from "@material-ui/core";

export default function Loading() {
    return (<Grid container spacing={4} style={{textAlign: 'center'}}>
            <Grid item xs={12}>
                <div className="loader">
                    <div className="loader__bar"/>
                    <div className="loader__bar"/>
                    <div className="loader__bar"/>
                    <div className="loader__bar"/>
                    <div className="loader__bar"/>
                    <div className="loader__ball"/>
                </div>
            </Grid>
            <Grid>
                <Typography variant="h4"
                            style={{fontWeight: 100, letterSpacing: 4}}>
                    Завантаження...
                </Typography>
            </Grid>
        </Grid>
    );
};