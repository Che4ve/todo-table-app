import styles from './MainScreen.module.scss';
import React, {useEffect, useState} from 'react';
import {Column, DataTable} from "../components/DataTable.tsx";
import {User, Todo} from '../models';
import {fetchTodos, fetchUsers} from "../services";
import {ProfileSVG} from "../components/icons/ProfileSVG.tsx";

type UserTableRow = Omit<User, 'name'> & {
    todoCount: number;
};

type UserTableData = Array<UserTableRow>;

export const MainScreen: React.FC = () => {
    const columns: Column<UserTableRow>[] = [
        {
            key: 'id',
            header: '#',
            render: (index) => (
                <p>{index}</p>
            )
        },
        {
            key: 'username',
            header: 'USERNAME',
            render: (value, row) => (
                <div className={styles['data-table__username-column']}>
                    <ProfileSVG/>
                    <div>
                        <span>{value}</span>
                        <a href={`mailto:${row.email}`}>{row.email}</a>
                    </div>
                </div>
            )
        },
        {key: 'todoCount', header: 'TO-DO COUNT'},
    ];

    const [users, setUsers] = useState<User[]>([]);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [data, setData] = useState<UserTableData>([]);

    useEffect(() => {
        fetchUsers()
            .then(users => {
                setUsers(() => [...users]);
            })
        fetchTodos()
            .then(todos => {
                setTodos(() => [...todos]);
            });
    }, []);

    useEffect(() => {
        if (users.length === 0 || todos.length === 0) {
            return;
        }
        setData(prev =>
            [...prev, ...mergeUserTodos(users, todos)]
        );
    }, [users.length, todos.length]);

    const mergeUserTodos = (users: User[], todos: Todo[]): UserTableData => {
        const todosByUserId: Record<number, number> = {};
        todos.forEach((todo) => {
            if (!todosByUserId[todo.userId]) {
                todosByUserId[todo.userId] = 0;
            }
            todosByUserId[todo.userId]++;
        });

        return users.map((user) => ({
            id: user.id,
            username: user.username,
            email: user.email,
            todoCount: todosByUserId[user.id] || 0,
        }));
    }

    return (
        <div className={styles['main-screen-container']}>
            <div className={styles['main-screen__content']}>
                <div className={styles['main-screen__table-title']}>
                    <h1>User To-Do Table</h1>
                    <h4>User task table for effective planning.</h4>
                </div>
                <DataTable<UserTableRow>
                    data={data}
                    columns={columns}
                />
            </div>
        </div>
    )
}