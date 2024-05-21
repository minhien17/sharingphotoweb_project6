import { Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function UserList(){
    
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const handleClick = (userid) =>{
        navigate(`/users/${userid}`);
    }

    useEffect(() =>{
        const fetchData = async() =>{
            try{
                const res = await axios.get('http://localhost:3030/users');
                const data = res.data;
                setUsers(data);
                // console.log(res);
            }catch(error){
                console.error(error);
            }
        }
        fetchData();
    },[])

    return(
        <div>
            <Typography variant="body1">List of users</Typography>
            <List component="nav">
                {users.map((user) => (
                    <div key={user._id} style={{backgroundColor: 'ButtonHighlight'}}>
                        <ListItem button onClick={() => handleClick(user._id)}>
                            <ListItemText primary = {user.last_name} />
                        </ListItem>
                        <Divider />
                    </div>
                ))}
            </List>
        </div>
    )
}