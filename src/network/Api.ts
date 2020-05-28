import Papa from "papaparse";
import {TableItem} from "../model/TableItem";

export const loadData = (onDataLoaded: (list: TableItem[]) => void) => {
    const configPapaparse = {
        skipEmptyLines: true, header: true, download: true, worker: true, delimiter: ','
    };
    Papa.parse('https://fop-check.s3.eu-central-1.amazonaws.com/map_type.csv', {
        ...configPapaparse,
        complete: function (results_types, _) {
            let types = results_types.data.flatMap(it => Object.keys(it).map(key => it[key]));
            Papa.parse('https://fop-check.s3.eu-central-1.amazonaws.com/map_map_department.csv', {
                ...configPapaparse,
                complete: function (results_department, _) {
                    let departments = results_department.data.flatMap(it => Object.keys(it).map(key => it[key]));
                    // setDepartmentMap(departments);
                    Papa.parse('https://fop-check.s3.eu-central-1.amazonaws.com/db.csv', {
                        ...configPapaparse,
                        complete: function (results, _) {
                            onDataLoaded(results.data.map((item, index) => parseItem(index + 1, item, departments, types)));
                        }
                    });
                }
            });
        }
    });
};

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
    } as TableItem;
}