import React, {useEffect, useState} from 'react';
import './App.css';
import Papa from 'papaparse';

const App: React.FC = () => {
    const [isLoading, setLoading] = useState(false);
    const [items, setItems] = useState(Array<Object>());

    function loadData() {
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
                                setItems(results.data);
                                console.warn("Item:", results.data[0]);
                            }
                        });
                    }
                });
            }
        });
    }

    useEffect(() => {
        loadData();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="App">
            {isLoading && <p>Loading...</p>}
            {items.length > 0 && <p>{items.length} items loaded</p>}
        </div>
    );
};

export default App;
