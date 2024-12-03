import { useState } from "react";
import { editTask } from "../api/tasks";

type EditTaskProps = {
    title: string;
    description: string;
    renewTasks: () => void;
}

const useEditTask = ({ title, description, renewTasks }: EditTaskProps) => {
    const [editTaskId, setEditTaskId] = useState<string>('');
    
    const handleEditTask = () => {
        editTask(editTaskId, title, description).then(() => {
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
