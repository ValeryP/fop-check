import React, {ChangeEvent, useEffect, useState} from 'react'
import {createStyles, makeStyles, TextField, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            margin: theme.spacing(4),
            [theme.breakpoints.up('xs')]: {
                minWidth: 270
            },
            [theme.breakpoints.up('sm')]: {
                minWidth: 500
            },
        }
    }),
);

export default function InputText({updateResultsCallback}: { updateResultsCallback: (s: string) => void }) {
    const classes = useStyles();

    const [text, setText] = useState('');
    const [timer, setTimer] = useState<NodeJS.Timer>();

    useEffect(() => {
        if (timer) {
            clearTimeout(timer);
        }
        setTimer(setTimeout(() => {
            updateResultsCallback(text)
        }, 500));
        // eslint-disable-next-line
    }, [text]);

    const onChangeText = (event: ChangeEvent<HTMLInputElement>) => {
        event.persist();
        return new Promise((resolve, _) => {
            resolve(event.target.value);
        }).then(v => {
            setText(v as string);
        });
    };
    return (
        <TextField className={classes.textField} variant="outlined" onChange={onChangeText}
                   label="Пошук" placeholder="василь іванович, 40885849, київ"
        />
    );
};