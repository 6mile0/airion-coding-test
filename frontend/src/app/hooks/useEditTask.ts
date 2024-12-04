import { useState } from "react";
import { editTask } from "../api/tasks";

type EditTaskProps = {
    title: string;
    description: string;
    expiration: string;
    renewTasks: () => void;
}

const useEditTask = ({ title, description, expiration, renewTasks }: EditTaskProps) => {
    const [editTaskId, setEditTaskId] = useState<string>('');
    
    const handleEditTask = () => {
        editTask(editTaskId, title, description, expiration).then(() => {
            renewTasks();
            setEditTaskId('');
        });
    }
    
    return {
        editTaskId,
        setEditTaskId,
        handleEditTask
    };
}

export default useEditTask;
