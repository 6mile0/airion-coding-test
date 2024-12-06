type AddButtonProps = {
  onClick: () => void;
  title: string;
}

export const AddButton = ({ onClick, title }: AddButtonProps) => {
  return (
    <button
      type="button"
      onClick={() => onClick()}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
    >
      {title}
    </button>
  )
}
