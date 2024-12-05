import { toast, Bounce } from 'react-toastify';
import { addTask } from '../api/tasks';
import { TaskRequestBody } from '../schema/tasks/request';

type AddTaskProps = {
    taskRequestBody: TaskRequestBody
    renewTasks: () => void;
}

export const useAddTask = ({ taskRequestBody, renewTasks }: AddTaskProps) => {

    const handleAddTask = () => {
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
        handleAddTask
    };
}
