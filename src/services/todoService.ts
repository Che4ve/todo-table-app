import { Todo } from '../models';

export const fetchTodos = async (): Promise<Todo[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    return response.json();
};

export const fetchTodosByUserId = async (userId: number): Promise<Todo[]> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
    return response.json();
};