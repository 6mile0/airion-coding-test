type AddButtonProps = {
    onClick: () => void;
    title: string;
}

const AddButton = ({onClick, title}: AddButtonProps) => {
    return (
        <button
        onClick={() => onClick()}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
      >
        {title}
      </button>
    )
}

export default AddButton;
