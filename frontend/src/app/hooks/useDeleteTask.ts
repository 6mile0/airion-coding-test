import { toast, Bounce} from 'react-toastify';
import { deleteTask } from "../api/tasks";

type DeleteTaskProps = {
    renewTasks: () => void;
}

export const useDeleteTask = ({ renewTasks }: DeleteTaskProps) => {
    
    const handleDeleteTask = (deleteTaskId: string) => {
        deleteTask(deleteTaskId).then((data) => {
            if(data.task_id){
                toast.success('タスクを削除しました', {
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
            console.error(error);
            toast.error('タスクの削除に失敗しました', {
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
        handleDeleteTask
    };
}
