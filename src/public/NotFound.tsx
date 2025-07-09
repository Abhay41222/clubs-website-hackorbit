import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div>404, Page Not Found!</div>
            <button className="cursor-pointer underline" onClick={() => {navigate("/")}}>Go to Homepage</button>
        </div>
    )
}