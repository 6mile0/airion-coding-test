import { useEffect, useState } from "react";
import { getTasks } from "../../api/tasks";
import { Task } from "../../../../model/task";

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
        }).catch((error) => {
            console.error(error); // TODO: Sentryにつなげる
        }).finally(() => {
            setIsLoading(false);
        });
    };

    return { tasks, handleGetTasks, setTasks, isLoading };
}
