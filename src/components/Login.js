import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Login({onLogin, usernamecha }){
    const [user,setUser] = useState({});
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async() =>{
        // const headers = {'Authorization': `Bearer ${user}`}
        try{
            const res = await axios.post('http://localhost:3030/login',user);
            const data = res.data;

            localStorage.setItem(user.username, data.token);

            if(data.message){// khoong can kiem tra?
                {onLogin && onLogin({username: user.username})
                usernamecha(user.username)
                navigate(`/`);}
            }
        }catch(error){
            if(typeof error.response.data.message ==='string')
                setError(error.response.data.message);
            else{
                setError('Server is not response!')
            }
            console.log(error);
        }
    }
    
        

    return(
        <div style={{margin:'20px'}}>
            <label >Username:</label> <br/>
            <input type="text" onChange={(e) => setUser({ ...user, username: e.target.value})}/>   
            <br/>
            <label >Password:</label> <br/>
            <input type="password" onChange={(e) => setUser({ ...user, password: e.target.value})}/><br/>
            <p style={{ color: 'red', fontFamily: 'Arial'}}>{error}</p><br/>
            <button className='custom-button' onClick={handleSubmit}>Login</button>

            <div>
                <p>Do not have an accout?</p>
                <Link to = '/signup'><button className='custom-button'>Register now</button></Link>
            </div>
        </div>
    )
}