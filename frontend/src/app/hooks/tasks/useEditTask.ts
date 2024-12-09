import { useState } from "react";
import { editTask } from "../../api/tasks";
import { successToast } from "../../utils/successToast";
import { errorToast } from "../../utils/errorToast";
import { TaskRequestBody } from "../../schema/tasks/request";

type EditTaskProps = {
    renewTasks: () => void;
}

export const useEditTask = ({ renewTasks }: EditTaskProps) => {
    const [isError, setIsError] = useState(false);

    const submitEditTask = (taskRequestBody: TaskRequestBody, editTaskId: string) => {
        editTask(editTaskId, taskRequestBody).then(() => {
            successToast('タスクを編集しました');
            renewTasks();
        }).catch((error) => {
            setIsError(true);
            console.error(error); // TODO: Sentryにつなげる
            errorToast('タスクの編集に失敗しました');
        });
    }

    return {
        isEditError: isError,
        submitEditTask,
    };
}
