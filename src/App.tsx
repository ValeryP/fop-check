import React, {useEffect, useState} from 'react'
import Papa from 'papaparse';
import {
    createStyles,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Theme
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            marginTop: theme.spacing(3),
            width: '100%',
            overflowX: 'auto',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 650,
        }
    }),
);

interface IDictionary {
    [index: string]: { name: string, size: string };
}

const App: React.FC = () => {
    // const preloadCount = 100;
    const [isLoading, setLoading] = useState(false);
    // const [typesMap, setTypesMap] = useState([] as string[]);
    // const [departmentMap, setDepartmentMap] = useState([] as string[]);
    const [items, setItems] = useState([] as any[]);
    // const [endReached, setEndReached] = useState(false);
    // const [loadedCount, setLoadedCount] = useState(preloadCount);

    function parseItem(item: any, departments: any[], types: any[]) {
        let type = String(types[Number(item['type_id'])]);
        let department = String(departments[Number(item['department_id'])]);
        return {
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
            skipEmptyLines: true,
            header: true,
            download: true,
            worker: true,
            delimiter: ','
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
                                setItems(results.data.map(item => parseItem(item, departments, types)));
                            }
                        });
                    }
                });
            }
        });
    };

    useEffect(loadData, []);

    // const loadMore = () => {
    //     if (!endReached) {
    //         setTimeout(() => {
    //             let newCount = loadedCount + preloadCount;
    //             setLoadedCount(newCount);
    //             if (loadedCount === items.length) {
    //                 setEndReached(true)
    //             }
    //         }, 300)
    //     }
    // };
    //
    // // @ts-ignore
    // function buildListContainer(listRef, style, children) {
    //     return (
    //         <List ref={listRef} style={style}>
    //             {children}
    //         </List>
    //     )
    // }
    //
    // // @ts-ignore
    // function buildItemContainer(children, props) {
    //     return (
    //         <ListItem {...props} style={{margin: 0}}>
    //             {children}
    //         </ListItem>
    //     )
    // }
    //
    // const renderItem = (index: number) => {
    //     if (!items.length || !departmentMap.length || !typesMap.length) {
    //         return <div/>;
    //     }
    //     if (items[index] === undefined || !items[index].hasOwnProperty('address')) {
    //         console.warn('hasOwnProperty', index);
    //         return <div/>;
    //     }
    //     const address = items[index]['address'];
    //     const code = items[index]['code'];
    //     const date = items[index]['date'];
    //     const duration = items[index]['duration'];
    //     const name = items[index]['name'];
    //     const risk = items[index]['risk'];
    //     const department_id = Number(items[index]['department_id']);
    //     const department = departmentMap[department_id];
    //     const type_id = Number(items[index]['type_id']);
    //     const type = typesMap[type_id];
    //     return <p>{[address, code, date, department, duration, name, risk, type]}</p>;
    // };

    const classes = useStyles();
    const columnNames = ['name', 'address', 'code', 'type', 'risk', 'department', 'date', 'duration'];
    const columnNamesMap = {
        'name': {name: 'Підприємство', size: '10%'},
        'address': {name: 'Адреса', size: '20%'},
        'code': {name: 'ЄДРПОУ / РНОКПП', size: '5%'},
        'type': {name: 'Предмет контролю', size: '20%'},
        'risk': {name: 'Ризик', size: '5%'},
        'department': {name: 'Департамент', size: '30%'},
        'date': {name: 'Дата', size: '5%'},
        'duration': {name: 'Тривалість', size: '5%'}
    } as IDictionary;
    return (
        <>
            {isLoading && <p>Loading...</p>}
            {items.length > 0 && <p>{items.length} items loaded</p>}
            <Paper className={classes.paper}>
                <Table className={classes.table} size="small" aria-label="table">
                    <TableHead>
                        <TableRow>
                            {columnNames.map((column, indexColumn) =>
                                <TableCell style={{width: columnNamesMap[column].size}}
                                           key={indexColumn}>
                                    {columnNamesMap[column].name}
                                </TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.slice(0, 50).map((row, indexRow) => (
                            <TableRow key={indexRow}>
                                {columnNames.map((column, indexColumn) =>
                                    <TableCell key={indexColumn}>{row[column]}</TableCell>)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            {/*<Virtuoso*/}
            {/*    ListContainer={({listRef, style, children}) => {*/}
            {/*        return buildListContainer(listRef, style, children);*/}
            {/*    }}*/}
            {/*    ItemContainer={({children, ...props}) => {*/}
            {/*        return buildItemContainer(children, props);*/}
            {/*    }}*/}
            {/*    item={renderItem}*/}
            {/*    totalCount={loadedCount}*/}
            {/*    endReached={loadMore}*/}
            {/*    overscan={preloadCount}*/}
            {/*/>*/}
        </>
    );
};

export default App;
