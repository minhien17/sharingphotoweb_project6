import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import './style.css';

export default function UserPhoto(){
    const {userid} = useParams();
    const [photos, setPhotos] = useState([]);
    const [users, setUsers] = useState([]);
    const [userown, setUserown] = useState([]);
    const [newcmt, setNewcmt] = useState('');
    const [add, setAdd] = useState(false);
    
    // lấy token trong localStorage để định danh người dùng
    const username = Object.keys(localStorage)[0];// co mot user nen dung cach nay
    const token = localStorage.getItem(username);
    const headers = {'Authorization':`Bearer ${token}`};

    useEffect(()=>{
        const fetchData = async() => {
            try{
                
                const dataOwn = await axios.get('http://localhost:3030/home',{headers})
                // console.log(dataOwn.data)
                setUserown(dataOwn.data)// lay thong tin dinh danh nguoi dung

                const res = await axios.get(`http://localhost:3030/photos/${userid}`);
                const data = res.data;
                setPhotos(data);

                const resUser = await axios.get(`http://localhost:3030/users`);
                const dataUser = resUser.data;
                setUsers(dataUser);
                // console.log(dataUser);
            }catch(error){
                console.error(error);
            }
        }
        fetchData();
    },[userid,add])
    const handleNewcomment = async(photo_id) =>{
        const date_time = new Date();
        const commentInfor = {date_time: date_time.toISOString(), comment: newcmt};
        console.log(newcmt)
        try{
            const datacmt = await axios.post(`http://localhost:3030/photos/comment/${photo_id}`,commentInfor,{headers});
            setAdd(true);// load lại bằng effect
            
        }catch(error){
            if(typeof error.response.data === 'string') alert(error.response.data)
            console.log(error);
        }
        
    }
    const findUserNameById = (users, userid) => {
        const userOwn = users.find(user => user._id === userid);
        return userOwn ? userOwn.last_name : 'not found'; // Trả về tên của người dùng hoặc "Unknown" nếu không tìm thấy
    };
    return(
        <div>
            {userown._id === userid && <Link to='/newpost' ><button >New Post</button></Link>}
            <h2 style={{ color: 'green', fontFamily: 'Arial', fontSize: '24px' }}>User Photos of {findUserNameById(users,userid)}</h2>
            {photos.map((photo) => (
                <div key={photo._id}> 
                {/* nếu không có key thì không hiển thị nội dung ? */}
                    <img 
                        src={require(`./images/${photo.file_name}`)}
                        alt={`Photo ${photo.id}`}
                        style={{maxWidth: '300px'}}
                    />

                    <p className="time-infor">
                        Created At: {new Date(photo.date_time).toLocaleString()}
                    </p>

                    <h4 className="comment">Comments:</h4>
                    {photo.comments && photo.comments.length > 0 ? (
                        photo.comments.map( (comment) =>{
                        
                        return(
                            <div key= {comment._id}>
                                <h5 className="comment-name">
                                    {findUserNameById(users,comment.user_id)}:
                                </h5>
                                <p className="time-infor">- {new Date(comment.date_time).toLocaleString()}</p>
                                <p className="comment-body">{comment.comment}</p>
                                <div className="divider-cmt"></div>
                            </div>
                            )
                        }
                        )
                    ):(
                        <Typography variant="body2" style={{color:'rgb(91, 91, 85)'}} > - no comment</Typography>
                        ) 
                    }
                    <label style={{fontWeight:'bold'}} className="comment-name">{userown.first_name} {userown.last_name} </label> 
                    <input type="text" 
                        onChange={(e) => setNewcmt(e.target.value )}
                    />
                    <button className="custom-button" style={{margin: '10px'}} onClick={() => handleNewcomment(photo._id)} >Send</button>
                    
                    <div className="divider"></div>
                </div>
                
            ))}
        </div>
    )
}