import React, {ChangeEvent, useEffect, useRef, useState} from 'react'
import {Button, Grid, Snackbar, TextField, Typography} from "@material-ui/core";
import stringSimilarity from 'string-similarity'
import InputText from "./InputText";
import Loading from "./loading/Loading";
import {TableItem} from "../model/TableItem";
import {loadData} from "../network/Api";
import FopTable from "./Table";
import {saveSubscription} from "../utils/Firestore";
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import * as EmailValidator from 'email-validator';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const App: React.FC = () => {
    const [filterParam, setFilterParam] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [items, setItems] = useState([] as any[]);
    const [showSnackbar, setShowSnackbar] = React.useState();
    const [emailInvalid, setEmailInvalid] = React.useState(false);
    let email = useRef('')

    useEffect(() => {
        setLoading(true);
        loadData((results: TableItem[]) => {
            setLoading(false);
            setItems(results);
        })
    }, []);

    const searchDomains = filterParam.trim().toLowerCase().split(/[, ]+/).map(it => it.toString().trim()).filter(it => it);

    const filteredItems = items
        .filter(item => searchDomains.map(domain => `${item['name']} ${item['address']} ${item['code']}`.toLowerCase().indexOf(domain) !== -1).some(it => it))
        .map(item => {
            item['similarity'] = stringSimilarity.compareTwoStrings(filterParam.trim().toLowerCase(), `${item['name']} ${item['address']} ${item['code']}`.toLowerCase());
            return item;
        })
        .sort((t1, t2) => t2['similarity'] < t1['similarity'] ? -1 : 1)
        .map((item, index) => {
            item['index'] = index + 1;
            return item;
        });

    const isEmptyState = filteredItems.length === 0 && filterParam.length !== 0
    const isInitialState = filterParam.length === 0;

    function onSubscribeMeClicked() {
        if (EmailValidator.validate(email.current)) {
            saveSubscription({
                email: email.current,
                query: filterParam,
                timestamp: new Date()
            }).then(() => {
                email.current = '';
                setShowSnackbar(true)
            });
        } else {
            setEmailInvalid(true)
        }
    }

    function onEmailChange(event: ChangeEvent<HTMLInputElement>) {
        email.current = event.target.value;
        setEmailInvalid(false)
    }

    function handleSnackbarClose() {
        setShowSnackbar(false)
        setFilterParam('');
    }

    function buildEmptyState() {
        return <Grid container alignContent={"center"} justify={"center"} spacing={1}
                     style={{textAlign: "center", height: '80vh'}}>
            <Grid item xs={12}>
                <Typography variant={"h5"} color={"textPrimary"}>
                    За вашим запитом не знайдено об'єктів для перевірок
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant={"caption"} color={"textSecondary"}>
                    Підпишіться на оновлення та отримайте сповіщення про появу вашого підприємства в
                    списку.
                </Typography>
            </Grid>
            <Grid item xs={12} style={{padding: 16}}>
                <TextField error={emailInvalid} variant="outlined" disabled={showSnackbar}
                           label={emailInvalid ? "Помилка" : "Електронна пошта"}
                           helperText={emailInvalid ? "Введена невірна адреса електронної пошта" : undefined}
                           placeholder="stepan.bender@gmail.com"
                           style={{minWidth: 300}} onChange={onEmailChange}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" size="large" disabled={showSnackbar}
                        style={{background: '#37C085', color: "white"}}
                        onClick={onSubscribeMeClicked}>
                    Підписатися
                </Button>
            </Grid>
        </Grid>;
    }

    return <Grid container justify={"center"} alignContent={"center"} style={{height: '100vh'}}>
        {
            isLoading
                ? <Grid item xs={12}><Loading/></Grid>
                : <>
                    {
                        isInitialState &&
                        <Grid item>
                            <Typography variant={"h4"}>
                                Перевірки підприємств держорганами
                            </Typography>
                            <Typography variant={"h3"} color={"textSecondary"} align={"center"}>
                                2020
                            </Typography>
                        </Grid>
                    }
                    <Grid item xs={12} style={{textAlign: "center"}}>
                        <InputText updateResultsCallback={setFilterParam}/>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            !isInitialState &&
                            (isEmptyState
                                ? buildEmptyState()
                                : <FopTable domains={searchDomains} items={filteredItems}/>)
                        }
                    </Grid>
                    <Snackbar open={showSnackbar} autoHideDuration={5000} onClose={handleSnackbarClose}>
                        <Alert onClose={handleSnackbarClose} severity="success">
                            Ви успішно підписалися на оновлення!
                        </Alert>
                    </Snackbar>
                </>
        }
    </Grid>;
};

export default App;
