import styles from './DataTable.module.scss';
import React from "react";

export type Column<T> = {
    key: keyof T;
    header: string;
    render?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
};

type DataTableProps<T> = {
    data: T[];
    columns: Column<T>[];
    loading?: boolean;
};

type TableHeaderProps<T> = {
    columns: Column<T>[];
};

type TableCellProps<T> = {
    value: T[keyof T];
    row: T;
    rowIndex: number;
    render?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
};

type TableRowProps<T> = {
    row: T;
    columns: Column<T>[];
};

// Компонент для заголовков таблицы
const TableHeader = <T,>({ columns }: TableHeaderProps<T>) => {
    return (
        <thead className={styles["data-table-header"]}>
            <tr>
                {columns.map((column, index) => (
                    <th key={index}>{column.header}</th>
                ))}
            </tr>
        </thead>
    );
};

// Компонент для ячейки таблицы
const TableCell = <T,>({ value, row, rowIndex, render }: TableCellProps<T>) => {
    return (
        <td>
            {render ? render(value, row, rowIndex) : String(value)}
        </td>
    );
};

// Компонент для строки таблицы
const TableRow = <T,>({ row, columns }: TableRowProps<T>) => {
    return (
        <tr>
            {columns.map((column, index) => (
                <TableCell
                    key={String(column.key)}
                    row={row}
                    rowIndex={index}
                    value={row[column.key]}
                    render={column.render}
                />
            ))}
        </tr>
    );
};

export const DataTable = <T extends { id: number | string }>({data, columns, loading}: DataTableProps<T>) => {
    return (
        <div className={styles["data-table-container"]}>
            <table className={styles["data-table"]}>
                <TableHeader columns={columns}/>
                {!loading &&
                <tbody className={styles["data-table-body"]}>
                {data.map((row) => (
                    <TableRow key={row.id} row={row} columns={columns}/>
                ))}
                </tbody>}
                {loading &&
                <div className={styles["data-table-loading"]}>
                    LOADING...
                </div>}
            </table>
        </div>
    )
}