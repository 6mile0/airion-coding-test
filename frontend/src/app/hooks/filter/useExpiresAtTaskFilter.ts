import { Task } from '../../api/tasks';
import { useState } from 'react';

export const useExpireTaskFilter = (tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>>) => {
    const [isAsc, setIsAsc] = useState(true);

    const handleExpireOrder = () => {
        const sortedTasks = [...tasks].sort((a, b) => {
            if (isAsc) {
                return a.expires_at.localeCompare(b.expires_at);
            } else {
                return b.expires_at.localeCompare(a.expires_at);
            }
        });
        setIsAsc(!isAsc);
        setTasks(sortedTasks);
    }

    return { handleExpireOrder };
}
