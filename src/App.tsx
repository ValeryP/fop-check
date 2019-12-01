import React, {useEffect, useRef, useState} from 'react'
import './App.css';
import Papa from 'papaparse';
import {Virtuoso} from 'react-virtuoso';
import {List, ListItem} from "@material-ui/core";

const App: React.FC = () => {
    const preloadCount = 100;
    const [isLoading, setLoading] = useState(false);
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
                console.warn("Item:", results_types.data[0]);
                Papa.parse('https://fop-check.s3.eu-central-1.amazonaws.com/map_map_department.csv', {
                    ...configPapaparse,
                    complete: function (results_department, _) {
                        console.warn("Item:", results_department.data[0]);
                        Papa.parse('https://fop-check.s3.eu-central-1.amazonaws.com/db.csv', {
                            ...configPapaparse,
                            complete: function (results, _) {
                                setLoading(false);
                                console.warn("Item:", results.data[0]);
                                setItems(results.data);
                            }
                        });
                    }
                });
            }
        });
    };

    useEffect(loadData, []);

    const renderItem = (index: React.ReactNode) => {
        return <div>Item {index}</div>;
    };

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

    return (
        <div className="App">
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
        </div>
    );
};

export default App;
