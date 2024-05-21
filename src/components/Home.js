import axios from "axios";
import { useEffect, useState } from "react";
import {Link , useParams } from "react-router-dom";
export default function Home(){
    const username = Object.keys(localStorage)[0];// co mot user nen dung cach nay
    const token = localStorage.getItem(username);
    const headers = {'Authorization':`Bearer ${token}`};
    const [user,setUser] = useState('');

    useEffect(() => {
        const fetchData = async() =>{
            try{
                const res = await axios.get('http://localhost:3030/home',{headers});
                const data = res.data;
                setUser(data);
                
            }catch(error){
                
                console.error(error);
            }
        }
        fetchData();
        
    },[])


    return(
        <div>
            <h2>Welcome to Photo Sharing website, check some photos now</h2>
            <h2 style={{ color: 'green', fontFamily: 'Arial', fontSize: '24px' }}>Hello {user.first_name} {user.last_name} </h2>
            
            <h3 style={{ color: 'rgb(153, 0, 77)', fontFamily: 'Arial', fontSize: '18px' }}>Location: {user.location}</h3>
            <h3 style={{ color: 'rgb(153, 0, 77)', fontFamily: 'Arial', fontSize: '18px' }}>Description: {user.description}</h3>
            <h3 style={{ color: 'rgb(153, 0, 77)', fontFamily: 'Arial', fontSize: '18px' }}>Occupation: {user.occupation}</h3>
            <Link to={`/photos/${user._id}`} variant = 'body1'>View Photo of me</Link>
        </div>
    )
}