
type LoadingProps = {
    size?: number;
    thickness?: number;
}

export const Loading = ({ size = 8, thickness = 2 }: LoadingProps) => {
    const spinnerSize = size * 4; // ピクセルサイズ
    const borderWidth = thickness;
  
    return (
      <div
        className={`inline-block rounded-full border-${borderWidth} border-t-transparent border-solid animate-spin`}
        style={{
          width: `${spinnerSize}px`,
          height: `${spinnerSize}px`,
          borderWidth: `${borderWidth}px`,
          borderColor: `rgba(59, 130, 246, 0.3)`,
          borderTopColor: `rgba(37, 99, 235, 1)`,
        }}
      ></div>
    );
  };
