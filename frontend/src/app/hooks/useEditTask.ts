import { useState } from "react";
import { editTask } from "../api/tasks";
import { TaskRequestBody } from "../schema/tasks/request";

type EditTaskProps = {
    taskRequestBody: TaskRequestBody;
    renewTasks: () => void;
}

const useEditTask = ({ taskRequestBody, renewTasks }: EditTaskProps) => {
    const [editTaskId, setEditTaskId] = useState<string>('');
    
    const handleEditTask = () => {
        editTask(editTaskId, taskRequestBody).then(() => {
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
