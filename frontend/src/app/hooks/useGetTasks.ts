import { useEffect, useState } from "react";
import { getTasks, Task } from "../api/tasks";

export const useGetTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getTasks().then((data) => {
            setTasks(data);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    const handleGetTasks = async () => {
        setIsLoading(true);
        getTasks().then((data) => {
            setTasks(data);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    return { tasks, handleGetTasks, setTasks, isLoading };
}
