type EditTaskProps = {
    title: string;
    description: string;
}

const useEditTask = ({ title, description }: EditTaskProps) => {
    
    const editTask = () => {
        console.log('title:', title);
        console.log('description:', description);
    }
    
    return {
        editTask
    };
}

export default useEditTask;
