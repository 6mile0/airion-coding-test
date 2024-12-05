import { addTask } from '../api/tasks';
import { TaskRequestBody } from '../schema/tasks/request';
import { useState } from 'react';
import { errorToast } from '../utils/errorToast';
import { successToast } from '../utils/successToast';

type AddTaskProps = {
    taskRequestBody: TaskRequestBody
    setTaskRequestBody: (taskRequestBody: TaskRequestBody) => void;
    renewTasks: () => void;
}

export const useAddTask = ({ taskRequestBody, setTaskRequestBody, renewTasks }: AddTaskProps) => {
    const [isError, setIsError] = useState(false);

    const submitAddTask = () => {
        if (!taskRequestBody.title || !taskRequestBody.expires_at) {
            setIsError(true);
            errorToast('タイトルと期限日は必須です');
            return;
        }

        addTask(taskRequestBody).then((data) => {
            if (data.task_id) {
                successToast('タスクを追加しました');
                renewTasks();
                setTaskRequestBody({
                    title: '',
                    description: '',
                    expires_at: ''
                });
            }
        }).catch((error) => {
            setIsError(true);
            console.error('Error:', error);
            errorToast('タスクの追加に失敗しました');
        });
    }

    return {
        isAddError: isError,
        submitAddTask
    };
}
