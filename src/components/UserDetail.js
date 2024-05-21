import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {Link , useParams } from "react-router-dom";

export default function UserDetail(){
    const {userid} = useParams();

    const [user,setUser] = useState([]);
    
    useEffect(()=>{
        const fetchData = async() =>{
            try{
                const res = await axios.get(`http://localhost:3030/users/${userid}`);
                const data = res.data;
                // console.log(data)
                setUser(data);
            }catch(error){
                console.log(error);
            }
        }
        fetchData();
    },[userid]);

    return(
        <div>
            <Typography variant="body1" style={{marginLeft:'15px'}}>
            <h2 style={{ color: 'green', fontFamily: 'Arial', fontSize: '24px' }}>Information of {user.last_name}</h2>
            <h3 style={{ color: 'rgb(153, 0, 77)', fontFamily: 'Arial', fontSize: '18px' }}>
                Full name: {user.first_name} {user.last_name}
            </h3>
            <h3 style={{ color: 'rgb(153, 0, 77)', fontFamily: 'Arial', fontSize: '18px' }}>Location: {user.location}</h3>
            <h3 style={{ color: 'rgb(153, 0, 77)', fontFamily: 'Arial', fontSize: '18px' }}>Description: {user.description}</h3>
            <h3 style={{ color: 'rgb(153, 0, 77)', fontFamily: 'Arial', fontSize: '18px' }}>Occupation: {user.occupation}</h3>
            <Link to={`/photos/${userid}`} variant = 'body1'>View Photo of {user.first_name} {user.last_name}</Link>
            </Typography>
        </div>
    )
} 