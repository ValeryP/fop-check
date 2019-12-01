import React, {useEffect, useState} from 'react'
import Papa from 'papaparse';
import {Virtuoso} from 'react-virtuoso';
import {List, ListItem} from "@material-ui/core";

const App: React.FC = () => {
    const preloadCount = 100;
    const [isLoading, setLoading] = useState(false);
    const [typesMap, setTypesMap] = useState([] as string[]);
    const [departmentMap, setDepartmentMap] = useState([] as string[]);
    const [items, setItems] = useState([] as any[]);
    const [endReached, setEndReached] = useState(false);
    const [loadedCount, setLoadedCount] = useState(preloadCount);

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
                setTypesMap(types);
                Papa.parse('https://fop-check.s3.eu-central-1.amazonaws.com/map_map_department.csv', {
                    ...configPapaparse,
                    complete: function (results_department, _) {
                        let departments = results_department.data.flatMap(it => Object.keys(it).map(key => it[key]));
                        setDepartmentMap(departments);
                        Papa.parse('https://fop-check.s3.eu-central-1.amazonaws.com/db.csv', {
                            ...configPapaparse,
                            complete: function (results, _) {
                                setLoading(false);
                                setItems(results.data);
                            }
                        });
                    }
                });
            }
        });
    };

    useEffect(loadData, []);

    const loadMore = () => {
        if (!endReached) {
            setTimeout(() => {
                let newCount = loadedCount + preloadCount;
                setLoadedCount(newCount);
                if (loadedCount === items.length) {
                    setEndReached(true)
                }
            }, 300)
        }
    };

    // @ts-ignore
    function buildListContainer(listRef, style, children) {
        return (
            <List ref={listRef} style={style}>
                {children}
            </List>
        )
    }

    // @ts-ignore
    function buildItemContainer(children, props) {
        return (
            <ListItem {...props} style={{margin: 0}}>
                {children}
            </ListItem>
        )
    }

    const renderItem = (index: number) => {
        if (!items.length || !departmentMap.length || !typesMap.length) {
            return <div/>;
        }
        if (items[index] === undefined || !items[index].hasOwnProperty('address')) {
            console.warn('hasOwnProperty', index);
            return <div/>;
        }
        const address = items[index]['address'];
        const code = items[index]['code'];
        const date = items[index]['date'];
        const department_id = Number(items[index]['department_id']);
        const department = departmentMap[department_id];
        const duration = items[index]['duration'];
        const name = items[index]['name'];
        const risk = items[index]['risk'];
        const type_id = Number(items[index]['type_id']);
        const type = typesMap[type_id];
        return <p>{[address, code, date, department, duration, name, risk, type]}</p>;
    };

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {items.length > 0 && <p>{items.length} items loaded</p>}
            <Virtuoso
                ListContainer={({listRef, style, children}) => {
                    return buildListContainer(listRef, style, children);
                }}
                ItemContainer={({children, ...props}) => {
                    return buildItemContainer(children, props);
                }}
                item={renderItem}
                totalCount={loadedCount}
                endReached={loadMore}
                overscan={preloadCount}
            />
        </>
    );
};

export default App;
