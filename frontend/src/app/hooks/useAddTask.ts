
type AddTaskProps = {
    title: string;
    description: string;
}

export const useAddTask = ({ title, description }: AddTaskProps) => {

    const addTask = () => {
        console.log('title:', title);
        console.log('description:', description);
    }

    return {
        addTask
    };
}
