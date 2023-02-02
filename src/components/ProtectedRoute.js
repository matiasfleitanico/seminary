import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom"


export default function ProtectedRoute({children}) {

    const {user, loading } = useAuth();
    if(loading) return <h1>Loading...</h1>
    if(!user) return <Navigate to="/login" />
    return <>{children}</>
}