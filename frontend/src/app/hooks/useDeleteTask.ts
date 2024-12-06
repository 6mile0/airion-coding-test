import { deleteTask } from "../api/tasks";
import { errorToast } from '../utils/errorToast';
import { successToast } from '../utils/successToast';

type DeleteTaskProps = {
    renewTasks: () => void;
}

export const useDeleteTask = ({ renewTasks }: DeleteTaskProps) => {
    
    const handleDeleteTask = (deleteTaskId: string) => {
        deleteTask(deleteTaskId).then((data) => {
            if(data.task_id){
                successToast('タスクを削除しました');
                renewTasks();
            }
        }).catch((error) => {
            console.error(error);
            errorToast('タスクの削除に失敗しました');
        });
    }

    return {
        handleDeleteTask
    };
}
