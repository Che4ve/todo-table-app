import { User } from '../models';

export const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return response.json();
};