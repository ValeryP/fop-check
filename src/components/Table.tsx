import React from 'react'
import Highlighter from "react-highlight-words";
import {
    createStyles,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    Theme
} from "@material-ui/core";
import {grey} from '@material-ui/core/colors';
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";

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

export default function FopTable({domains, items}: { domains: string[], items: any[] }) {
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);

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

    const handleChangePage = (_: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function buildRowItem(indexRow: number, row: any) {
        return <TableRow key={indexRow}>
            {columnNames.map((column, indexColumn) =>
                <TableCell style={{verticalAlign: 'top'}}
                           key={indexColumn}>
                    {
                        ['name', 'address', 'code'].includes(column)
                            ? <Highlighter
                                searchWords={domains}
                                autoEscape={true}
                                highlightStyle={{fontWeight: 'bold'}}
                                textToHighlight={row[column].toString()}
                            />
                            : row[column]
                    }

                </TableCell>)}
        </TableRow>;
    }

    function buildTableCell(indexColumn: number, column: string) {
        return <TableCell key={indexColumn} style={{
            width: columnNamesMap[column].size,
            textAlign: columnNamesMap[column].align as 'left' | 'center'
        }}>
            {columnNamesMap[column].name}
        </TableCell>;
    }

    return <TableContainer className={classes.paper}>
        <Table stickyHeader className={classes.table} size="small"
               aria-label="custom pagination table">
            <TableHead>
                <TableRow style={{background: grey[100]}}>
                    {columnNames
                        .map((column, indexColumn) => buildTableCell(indexColumn, column))}
                </TableRow>
            </TableHead>
            <TableBody>
                {items
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, indexRow) => buildRowItem(indexRow, row))}
            </TableBody>
            <TableFooter style={{marginRight: 16}}>
                <TableRow>
                    <TablePagination
                        labelRowsPerPage={'Відображати результатів на сторінці:'}
                        rowsPerPageOptions={[50, 100, 250]}
                        count={items.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                </TableRow>
            </TableFooter>
        </Table>
    </TableContainer>;
};