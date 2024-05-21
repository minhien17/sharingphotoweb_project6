import { Navigate } from "react-router-dom";

export default function ProtectedRoute({login,children}){
    if(!login){
        return(
            <Navigate to='/login' replace/>
        )
    }
    return children;
}