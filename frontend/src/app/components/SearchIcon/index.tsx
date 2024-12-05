
type SearchIconProps = {
    className?: string;
    width?: number;
    height?: number;
};

export const SearchIcon = ({ className, width, height }: SearchIconProps) => {
    return (
        <div className={className}>
            <svg
                version="1.1"
                id="レイヤー_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width={width}
                height={height}
                viewBox="0 0 300 300"
                xmlSpace="preserve"
            >
                <g>
                    <circle
                        cx="136"
                        cy="125.5"
                        r="71"
                        style={{
                            fill: "none",
                            stroke: "#333333",
                            strokeWidth: 20,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 10,
                        }}
                    />
                    <line
                        x1="179"
                        y1="186.5"
                        x2="235"
                        y2="245.5"
                        style={{
                            fill: "none",
                            stroke: "#333333",
                            strokeWidth: 20,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 10,
                        }}
                    />
                </g>
            </svg>
        </div>
    );
}
