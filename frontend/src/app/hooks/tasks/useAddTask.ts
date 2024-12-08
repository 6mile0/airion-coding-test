import { addTask } from '../../api/tasks';
import { useState } from 'react';
import { errorToast } from '../../utils/errorToast';
import { successToast } from '../../utils/successToast';
import { TaskRequestBody } from '../../schema/tasks/request';

type AddTaskProps = {
    renewTasks: () => void;
}

export const useAddTask = ({ renewTasks }: AddTaskProps) => {
    const [isError, setIsError] = useState(false);

    const submitAddTask = (taskRequestBody: TaskRequestBody) => {
        addTask(taskRequestBody).then((data) => {
            if (data.task_id) {
                successToast('タスクを追加しました');
                renewTasks();
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
