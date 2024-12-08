import { Loading } from "../Loading";

export const LoadingPage = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Loading size={16} thickness={4} />
        </div>
    );
}
