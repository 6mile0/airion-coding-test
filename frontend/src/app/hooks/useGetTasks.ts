import { useEffect, useState } from "react";
import { getTasks, Task } from "../api/tasks";

export const useGetTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        getTasks().then((data) => {
            setTasks(data);
        });
    }, [setTasks]);

    const handleGetTasks = async () => {
        getTasks().then((data) => {
            setTasks(data);
        });
    };

    return { tasks, handleGetTasks };
}
