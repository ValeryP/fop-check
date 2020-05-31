import React, {useEffect, useState} from 'react'
import {Grid} from "@material-ui/core";
import stringSimilarity from 'string-similarity'
import InputText from "./InputText";
import Loading from "./loading/Loading";
import {TableItem} from "../model/TableItem";
import {loadData} from "../network/Api";
import FopTable from "./Table";

const App: React.FC = () => {
    const [filterParam, setFilterParam] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [items, setItems] = useState([] as any[]);

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

    return <Grid container justify={"center"} alignContent={"center"} style={{height: '100vh'}}>
        {
            isLoading
                ? <Grid item xs={12}><Loading/></Grid>
                : <>
                    <Grid item xs={12} style={{textAlign: "center"}}>
                        <InputText updateResultsCallback={setFilterParam}/>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            filterParam.length !== 0 &&
                            <FopTable domains={searchDomains} items={filteredItems}/>
                        }
                    </Grid>
                </>
        }
    </Grid>;
};

export default App;
