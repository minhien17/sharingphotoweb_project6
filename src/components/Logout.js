import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Logout({onLogin}){
    const navigate = useNavigate();
    useEffect(()=>{
        try{
            localStorage.clear();
            {onLogin && onLogin(true)
                navigate('/login');
            }
        }catch(error){
            console.log(error)
        }
    },[])
    
}