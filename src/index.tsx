import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {buildTheme} from "./utils/ThemeProvider";
import {ThemeProvider} from '@material-ui/core';

ReactDOM.render(
    <ThemeProvider theme={buildTheme()}>
        <App/>
    </ThemeProvider>,
    document.getElementById('root'));

document.body.style.margin = '0';
