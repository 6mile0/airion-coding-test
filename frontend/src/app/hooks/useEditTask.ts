import { useState } from "react";
import { editTask } from "../api/tasks";
import { TaskRequestBody } from "../schema/tasks/request";
import { toast, Bounce } from 'react-toastify';

type EditTaskProps = {
    taskRequestBody: TaskRequestBody;
    renewTasks: () => void;
}

const useEditTask = ({ taskRequestBody, renewTasks }: EditTaskProps) => {
    const [editTaskId, setEditTaskId] = useState<string>('');
    
    const handleEditTask = () => {
        editTask(editTaskId, taskRequestBody).then(() => {
            toast.success('タスクの編集に成功しました', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            renewTasks();
            setEditTaskId('');
        }).catch((error) => {
            console.error(error);
            toast.error('タスクの編集に失敗しました', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        });
    }
    
    return {
        editTaskId,
        setEditTaskId,
        handleEditTask
    };
}

export default useEditTask;
