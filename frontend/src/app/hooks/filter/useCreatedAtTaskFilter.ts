import { useState } from "react";
import { Task } from "../../api/tasks";

export const useCreatedAtTaskFilter = (tasks: Task[], setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>) => {
    const [isAsc, setIsAsc] = useState(false);

    console.log(tasks);

    const handleCreateOrder = () => {
        const sortedTasks = [...tasks].sort((a, b) => {
            if (isAsc) {
                return a.created_at.localeCompare(b.created_at);
            } else {
                return b.created_at.localeCompare(a.created_at);
            }
        });
        setIsAsc(!isAsc);
        setFilteredTasks(sortedTasks);
    }

    return { handleCreateOrder };
}
