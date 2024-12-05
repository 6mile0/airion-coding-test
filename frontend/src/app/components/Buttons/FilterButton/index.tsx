
type FilterIconProps = {
    itemName: string;
    className?: string;
    width?: number;
    height?: number;
    onClick?: () => void;
}

export const FilterButton = ({ itemName, className = '', width = 18, height = 18, onClick }: FilterIconProps) => {
    return (
        <button className={`flex items-center hover:opacity-75 ${className}`} onClick={onClick}>
            {itemName}
            <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
                <polygon points="12,4 16,10 8,10" fill="black" />
                <polygon points="12,20 8,14 16,14" fill="black" />
            </svg>
        </button>   
    );
}
