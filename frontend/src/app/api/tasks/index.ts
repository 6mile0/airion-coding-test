import { TaskRequestBody } from "@/app/schema/tasks/request";

const ORIGIN = 'http://localhost:8000/api/v1';

export type Task = {
    task_id: string
    title: string
    description: string
    is_done: boolean
    expires_at: string
    created_at: string
    updated_at: string
}

export const getTasks = async () : Promise<Task[]> => {
    const response = await fetch(`${ORIGIN}/tasks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    return response.json()
}

export const addTask = async (taskRequestBody: TaskRequestBody) : Promise<Task> => {
    const response = await fetch(`${ORIGIN}/tasks/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ...taskRequestBody }),
    });
    return response.json()
}

export const editTask = async (task_id: string, taskRequestBody: TaskRequestBody) : Promise<Task> => {
    const response = await fetch(`${ORIGIN}/tasks/edit/${task_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ...taskRequestBody }),
    });
    return response.json()
}


export const deleteTask = async (task_id: string) : Promise<Task> => {
    const response = await fetch(`${ORIGIN}/tasks/delete/${task_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    return response.json()
}
