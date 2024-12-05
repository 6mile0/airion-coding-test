import { useCallback, useEffect, useState } from "react";
import { Task } from "../../api/tasks";

export const useSearchTask = (tasks: Task[]) => {
    console.log(tasks)

    const [searchWord, setSearchWord] = useState('');
    const [result, setResult] = useState<Task[] | null>(null);

    const wordSearch = useCallback((word: string) => {
        const searchResult = tasks.filter((task) => {
            return task.title.includes(word) || task.description.includes(word);
        });
        setResult(searchResult);
    }, [tasks]);

    useEffect(() => {
        setResult(tasks);
        if (searchWord === '') return;
        wordSearch(searchWord);
    }, [tasks, searchWord, wordSearch]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const word = e.target.value;
        setSearchWord(word);
        if (word === '') {
            setResult(null);
            return;
        }
        wordSearch(word);
    }

    return { searchResult: result, searchWord, handleSearch };
}
