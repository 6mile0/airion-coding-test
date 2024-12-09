import { TaskRequestBody } from "@/app/schema/tasks/request";
import { TaskResponse } from "@/app/schema/tasks/response";

if(process.env.NEXT_PUBLIC_API_BASE_URL === undefined) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined")
}

export const getTasks = async () : Promise<TaskResponse[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/tasks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    return response.json()
}

export const addTask = async (taskRequestBody: TaskRequestBody) : Promise<TaskResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/tasks/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ...taskRequestBody }),
    });
    return response.json()
}

export const editTask = async (task_id: string, taskRequestBody: TaskRequestBody) : Promise<TaskResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/tasks/edit/${task_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ...taskRequestBody }),
    });
    return response.json()
}


export const deleteTask = async (task_id: string) : Promise<TaskResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/tasks/delete/${task_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    return response.json()
}
