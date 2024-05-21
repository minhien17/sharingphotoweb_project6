import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';


export default function TopBar({onLogin, username}){
    const [fullname, setFullname] = useState('');
    
    useEffect(() => {
        const fetchData = async() =>{
            try{
                const token = localStorage.getItem(username)
                const headers = {'Authorization': `Bearer ${token}`}
                const data = await axios.get('http://localhost:3030/home',{headers})

                setFullname(data.data.first_name)
            }catch(error){
                console.error(error);
            }
        }
        if(username) fetchData();
    },[])
    return(
        <AppBar position="absolute">
        {/* phần tiêu đề của app */}
            <Toolbar>
                <Typography variant="h3" color={"inherit"}>
                    Photo sharing website
                </Typography>
                
                {onLogin &&
                    <div style={{marginLeft: 'auto'}}>
                        <p>Hi {fullname}</p>
                        <Link to='/logout' type="button">
                        <button className="custom-button" style={{marginBottom:'10px'}}>Log out</button>
                        </Link>
                    </div>
                } 
                
            </Toolbar>
        </AppBar>
    )
}