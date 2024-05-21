import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup(){
    const [user,setUser] = useState({});
    const [checkPassword, setCheckPassword] = useState('')
    const [error,setError] = useState('')

    const navigate = useNavigate();   

    const handleSubmit = async() =>{
        if(user.password !== checkPassword){
            setError('Password not match');
        }else if(!user.username){
            setError('Username cannot be empty!')
        }else if(!user.password){
            setError('Password cannot be empty!')
        }else if(!user.first_name){
            setError('First name cannot be empty!')
        }
        else if(!user.last_name){
            setError('Last_name cannot be empty!')
        }
        else{
            // const sendData = async() =>{
                try{
                    const res = await axios.post('http://localhost:3030/signup', user);
                    navigate('/login');
                }catch(error){
                    if(typeof error.response.data === 'string' ) setError(error.response.data)
                    console.error(error);
                }
            // }
            // sendData();
        }
    }
    return(
        <div style={{marginLeft:'20px'}}>
            <h3>Please fill out this form</h3>
            <h4>Account</h4>
            <label >Username:</label> <br/>
            <input type="text" onChange={(e) => setUser({ ...user, username: e.target.value})}/>   
            <br/>
            <label >Password:</label> <br/>
            <input type="password" onChange={(e) => setUser({ ...user, password: e.target.value})}/><br/>
            <label >Confirm password:</label> <br/>
            <input type="password" onChange={(e) => setCheckPassword( e.target.value) }/><br/>
            <p style={{ color: 'red', fontFamily: 'Arial'}}>{error}</p>


            <h4>Information</h4>
            <label >First name:</label> <input type="text" onChange={(e) => setUser({ ...user, first_name: e.target.value})} /> <br/>
            <label >Last name:</label> <input type="text" onChange={(e) => setUser({ ...user, last_name: e.target.value})} />  <br/>
            <label >Location:</label> <input type="text" onChange={(e) => setUser({ ...user, location: e.target.value})} />  <br/>
            <label >Description:</label> <input type="text" onChange={(e) => setUser({ ...user, description: e.target.value})} />  <br/>
            <label >Occupation:</label> <input type="text" onChange={(e) => setUser({ ...user, occupation: e.target.value})} />  <br/>
            <button  className='custom-button' onClick={handleSubmit} style={{margin:'20px',width:'100px', marginLeft:'100px'}}>Register</button>
            <p>{}</p>
        </div>
    )
}