import { useState } from "react";
import { Task } from "../../api/tasks";

export const useSearchTask = (tasks: Task[]) => {
    const [searchWord, setSearchWord] = useState('');
    const [result, setResult] = useState<Task[]|null>(null);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const word = e.target.value;
        setSearchWord(word);

        if (word === '') {
            setResult(tasks);
            return;
        }

        const filteredTasks = tasks.filter((task) => {
            return task.title.includes(word);
        });
        setResult(filteredTasks);
    }

    return { searchResult: result, searchWord, handleSearch };
}
