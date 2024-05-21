import axios from "axios";
import { useEffect, useState } from "react";

export default function NewPost(){
    const key = Object.keys(localStorage)[0];
    const token = localStorage.getItem(key);
    const headers = {'Authorization':`Bearer ${token}`};
    //console.log(token)

    const [user, setUser] = useState({});
    const [image,setImage] = useState(null);
    const [error, setError] = useState('');
    const [ok,setOk] = useState('');

    // lấy file ảnh - dịch ảnh sang dạng nhìn được (frontend)
    const inputImage = (e) =>{
        const file = e.target.files[0];
        console.log(file);
        setImage(file);

    }

    // lấy dữ liệu userown
    useEffect(() => {
        const fetchData = async() =>{
            try{
                const res = await axios.get('http://localhost:3030/photos/newpost',{headers});
                const data = res.data;
                //console.log(data);
                setUser(data);
                
            }catch(error){
                setError(error.response.data)
                console.error(error);
            }
        }
        fetchData();
        
    },[])

    // gửi ảnh lên server
    const handlePost = async (e) =>{
        e.preventDefault();

        const formData = new FormData();
        formData.append("image",image);
        formData.append('user_id',user._id);
        try {
            const res = await axios.post('http://localhost:3030/photos/newpost',
                formData,
                {headers: {'Content-Type': 'multipart/form-data'}},
            );
            //navigate()
            setOk('Upload success!')
        } catch (error) {
            setError(error.response.data);
            console.log(error)
        }
        
    }

    return(
        <div>
            <h2>Hello {user.first_name} {user.last_name}, Let share some of your photos now!</h2>
            <h3>New post:</h3>
            <input 
                accept="img/*"
                type="file"
                onChange = {inputImage}
            />
            <br />
            {/* {image =='' || image==null ?'':<img width={300} height={300} src={image} />} */}
            <p style={{ color: 'red', fontFamily: 'Arial'}}>{error}</p>
            <button onClick={handlePost} className="custom-button" >Post</button>
            <p>{ok}</p>
        </div>
    )
}