import React, {useEffect, useState} from 'react'
import Papa from 'papaparse';
import Highlighter from "react-highlight-words";
import './App.scss';
import {
    createStyles,
    Grid,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Theme
} from "@material-ui/core";
import {grey} from '@material-ui/core/colors';
import stringSimilarity from 'string-similarity'
import InputText from "./InputText";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            overflowX: 'auto',
            marginTop: theme.spacing(3),
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(1),
            marginLeft: theme.spacing(1)
        },
        table: {
            minWidth: 650,
        },
    }),
);

interface IDictionary {
    [index: string]: { name: string, size: string, align: string };
}

const App: React.FC = () => {
    const [filterParam, setFilterParam] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [items, setItems] = useState([] as any[]);

    function parseItem(index: number, item: any, departments: any[], types: any[]) {
        let type = String(types[Number(item['type_id'])]);
        let department = String(departments[Number(item['department_id'])]);
        return {
            'index': index,
            'name': item['name'],
            'address': item['address'],
            'code': item['code'],
            'type': type[0].toUpperCase() + type.slice(1),
            'risk': item['risk'],
            'department': department[0].toUpperCase() + department.slice(1),
            'date': item['date'],
            'duration': item['duration']
        };
    }

    const loadData = () => {
        setLoading(true);
        const configPapaparse = {
            skipEmptyLines: true, header: true, download: true, worker: true, delimiter: ','
        };
        Papa.parse('https://fop-check.s3.eu-central-1.amazonaws.com/map_type.csv', {
            ...configPapaparse,
            complete: function (results_types, _) {
                let types = results_types.data.flatMap(it => Object.keys(it).map(key => it[key]));
                // setTypesMap(types);
                Papa.parse('https://fop-check.s3.eu-central-1.amazonaws.com/map_map_department.csv', {
                    ...configPapaparse,
                    complete: function (results_department, _) {
                        let departments = results_department.data.flatMap(it => Object.keys(it).map(key => it[key]));
                        // setDepartmentMap(departments);
                        Papa.parse('https://fop-check.s3.eu-central-1.amazonaws.com/db.csv', {
                            ...configPapaparse,
                            complete: function (results, _) {
                                setLoading(false);
                                setItems(results.data.map((item, index) => parseItem(index + 1, item, departments, types)));
                            }
                        });
                    }
                });
            }
        });
    };

    useEffect(loadData, []);

    const columnNames = ['index', 'name', 'address', 'code', 'type', 'risk', 'department', 'date', 'duration'];
    const columnNamesMap = {
        'index': {name: '#', size: '1%', align: 'center'},
        'name': {name: 'Підприємство', size: '10%', align: 'left'},
        'address': {name: 'Адреса', size: '20%', align: 'left'},
        'code': {name: 'ЄДРПОУ або РНОКПП', size: '4%', align: 'center'},
        'type': {name: 'Предмет контролю', size: '20%', align: 'left'},
        'risk': {name: 'Ризик', size: '5%', align: 'left'},
        'department': {name: 'Департамент', size: '30%', align: 'left'},
        'date': {name: 'Дата', size: '5%', align: 'left'},
        'duration': {name: 'Тривалість', size: '5%', align: 'left'}
    } as IDictionary;
    const classes = useStyles();

    const searchDomains = filterParam.trim().toLowerCase().split(/(?:,| )+/).map(it => it.toString().trim()).filter(it => it);
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
    return (
        <>
            <Grid container style={{textAlign: 'center'}}>
                <Grid item xs={12}>
                    <InputText updateResultsCallback={setFilterParam}/>
                </Grid>
            </Grid>
            {
                Boolean(filteredItems.length) &&
                <Paper className={classes.paper}>
                    <Table className={classes.table} size="small" aria-label="table">
                        <TableHead>
                            <TableRow style={{background: grey[100]}}>
                                {columnNames.map((column, indexColumn) =>
                                    <TableCell key={indexColumn} style={{
                                        width: columnNamesMap[column].size,
                                        textAlign: columnNamesMap[column].align as 'left' | 'center'
                                    }}>
                                        {columnNamesMap[column].name}
                                    </TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredItems.map((row, indexRow) => (
                                <TableRow key={indexRow}>
                                    {columnNames.map((column, indexColumn) =>
                                        <TableCell style={{verticalAlign: 'top'}}
                                                   key={indexColumn}>
                                            {
                                                ['name', 'address', 'code'].includes(column)
                                                    ? <Highlighter
                                                        searchWords={searchDomains}
                                                        autoEscape={true}
                                                        highlightStyle={{fontWeight: 'bold'}}
                                                        textToHighlight={row[column].toString()}
                                                    />
                                                    : row[column]
                                            }

                                        </TableCell>)}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            }
        </>
    );
};

export default App;
