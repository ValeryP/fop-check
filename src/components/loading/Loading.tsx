import React from 'react'
import './Loading.scss';
import {Container, Grid, Typography} from "@material-ui/core";

export default function Loading() {
    return <Grid container justify={"center"} alignContent={"center"} style={{textAlign: "center"}}>
        <Grid item xs={12}>
            <Container maxWidth={"xs"} className="loader" style={{maxWidth: 75}}>
                <div className="loader__bar"/>
                <div className="loader__bar"/>
                <div className="loader__bar"/>
                <div className="loader__bar"/>
                <div className="loader__bar"/>
                <div className="loader__ball"/>
            </Container>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="h4"
                        style={{fontWeight: 100, letterSpacing: 4}}>
                Завантаження
            </Typography>
        </Grid>
    </Grid>;
};