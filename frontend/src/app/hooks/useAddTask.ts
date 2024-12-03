import { toast, Bounce } from 'react-toastify';
import { addTask } from '../api/tasks';

type AddTaskProps = {
    title: string;
    description: string;
    renewTasks: () => void;
}

export const useAddTask = ({ title, description, renewTasks }: AddTaskProps) => {

    const handleAddTask = () => {
        addTask(title, description).then((data) => {
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
