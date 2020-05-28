import React from 'react';
import {createMuiTheme} from "@material-ui/core";

export const buildTheme = () => createMuiTheme({
    palette: {
        primary: {
            main: '#607D8B',
        },
        secondary: {
            main: '#FFC107',
        },
    },
});