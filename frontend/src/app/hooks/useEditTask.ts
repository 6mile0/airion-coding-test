import { useState } from "react";
import { editTask, Task } from "../api/tasks";
import { TaskRequestBody } from "../schema/tasks/request";
import { successToast } from "../utils/successToast";
import { errorToast } from "../utils/errorToast";

type EditTaskProps = {
    taskRequestBody: TaskRequestBody;
    setTaskRequestBody: (taskRequestBody: TaskRequestBody) => void;
    renewTasks: () => void;
}

export const useEditTask = ({ taskRequestBody, setTaskRequestBody, renewTasks }: EditTaskProps) => {
    const [editTaskId, setEditTaskId] = useState<string>('');
    const [isError, setIsError] = useState(false);

    const handleOpenEditModal = (tasks: Task[], task_id?: string) => {
        if (!isError && task_id) {
            setEditTaskId(task_id);
            const targetTask = tasks.find((task) => task.task_id === task_id);
            if (targetTask) {
                setTaskRequestBody({
                    title: targetTask.title,
                    description: targetTask.description,
                    expires_at: targetTask.expires_at
                });
            }
        }
    }

    const handleCancelEdit = () => {
        setEditTaskId('');
        setTaskRequestBody({
            title: '',
            description: '',
            expires_at: ''
        });
    }

    const submitEditTask = () => {
        if (!taskRequestBody.title || !taskRequestBody.expires_at) {
            setIsError(true);
            errorToast('タイトルと期限日は必須です');
            return;
        }

        editTask(editTaskId, taskRequestBody).then(() => {
            successToast('タスクを編集しました');
            renewTasks();
            setEditTaskId('');
            setTaskRequestBody({
                title: '',
                description: '',
                expires_at: ''
            });
        }).catch((error) => {
            setIsError(true);
            console.error(error);
            errorToast('タスクの編集に失敗しました');
        });
    }

    return {
        isEditError: isError,
        editTaskId,
        setEditTaskId,
        submitEditTask,
        handleOpenEditModal,
        handleCancelEdit
    };
}
