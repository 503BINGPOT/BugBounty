import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireAuth({ children }) {
    const { user, loading} = useAuth();
    const location = useLocation();
    if (loading) return <div className="p-6 text-white">Loading....</div>
    if(!user) return <Navigate to="/signin" replace state={{ from: location }} />
    return children;
}