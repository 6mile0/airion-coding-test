const ORIGIN = 'http://localhost:8000/api/v1';

export type Task = {
    task_id: string
    title: string
    description: string
    is_done: boolean
    created_at: string
    updated_at: string
}

export const addTask = async (title: string, description: string) : Promise<Task> => {
    const response = await fetch(`${ORIGIN}/tasks/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
    });
    return response.json()
}
