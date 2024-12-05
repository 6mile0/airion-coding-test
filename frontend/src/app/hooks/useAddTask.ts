import { toast, Bounce } from 'react-toastify';
import { addTask } from '../api/tasks';
import { TaskRequestBody } from '../schema/tasks/request';
import { useState } from 'react';

type AddTaskProps = {
    taskRequestBody: TaskRequestBody
    setTaskRequestBody: (taskRequestBody: TaskRequestBody) => void;
    renewTasks: () => void;
}

export const useAddTask = ({ taskRequestBody, setTaskRequestBody, renewTasks }: AddTaskProps) => {
    const [isError, setIsError] = useState(false);

    const handleOpenAddModal = () => {
        if(!isError) {
            setTaskRequestBody({
                title: '',
                description: '',
                expires_at: ''
            });
        }
    }

    const submitAddTask = () => {
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

        addTask(taskRequestBody).then((data) => {
            if (data.task_id) {
                toast.success('タスクを追加しました', {
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
            }
        }).catch((error) => {
            setIsError(true);
            console.error('Error:', error);
            toast.error('エラーが発生しました', {
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
        isAddError: isError,
        submitAddTask,
        handleOpenAddModal
    };
}
