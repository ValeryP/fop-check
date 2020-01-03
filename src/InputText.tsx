import React, {ChangeEvent, useEffect, useState} from 'react'
import './App.scss';
import {TextField} from "@material-ui/core";

// @ts-ignore
export default function InputText({updateResultsCallback}) {
    const [text, setText] = useState('');

    const [timer, setTimer] = useState<NodeJS.Timer | undefined>();
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
        if (event.target.value.length > 3) {
            event.persist();
            return new Promise((resolve, _) => {
                resolve(event.target.value);
            }).then(v => {
                setText(v as string);
            });
        }
    };
    return (
        <TextField style={{minWidth: 500, marginTop: 32}}
                   variant="outlined"
                   onChange={onChangeText}
                   label="Пошук"
                   placeholder="василь іванович, 40885849, київ"
        />
    );
};