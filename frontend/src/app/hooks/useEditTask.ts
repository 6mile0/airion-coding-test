import { useState } from "react";
import { editTask, Task } from "../api/tasks";
import { TaskRequestBody } from "../schema/tasks/request";
import { toast, Bounce } from 'react-toastify';

type EditTaskProps = {
    taskRequestBody: TaskRequestBody;
    setTaskRequestBody: (taskRequestBody: TaskRequestBody) => void;
    renewTasks: () => void;
}

export const useEditTask = ({ taskRequestBody, setTaskRequestBody, renewTasks }: EditTaskProps) => {
    const [editTaskId, setEditTaskId] = useState<string>('');
    const [isError, setIsError] = useState(false);

    const handleOpenEditModal = (task_id: string, tasks: Task[]) => {
        if(!isError) {
            setEditTaskId(task_id);
            const targetTask = tasks.find((task) => task.task_id === task_id);
            if(targetTask) {
                setTaskRequestBody({
                    title: targetTask.title,
                    description: targetTask.description,
                    expires_at: targetTask.expires_at
                });
            }
        }
    }
    
    const submitEditTask = () => {
        if(!taskRequestBody.title || !taskRequestBody.expires_at) {
            setIsError(true);
            toast.error('タイトルと期限日は必須です', {
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
            return;
        }

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
            setIsError(true);
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
        isEditError: isError,
        editTaskId,
        setEditTaskId,
        submitEditTask,
        handleOpenEditModal
    };
}
