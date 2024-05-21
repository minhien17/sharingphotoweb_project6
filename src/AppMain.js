import './App.css';
import './components/style.css';
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TopBar from './components/TopBar'
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import UserPhoto from './components/UserPhoto';
import { useState } from 'react';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import Logout from './components/Logout';
import Signup from './components/Signup';
import NewPost from './components/NewPost';
export default function AppMain(){
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState('');
  const handleLogin = () =>{
    setLogin(true);
  }
  const handleLogout = () =>{
    setLogin(false);
  }
    return(
        <Router>
        <Grid container spacing={2}> 
        {/* khoang cách giữa các grid */}
          <Grid item xs = {12}>
            {/* chi dinh la chiem full do rong trang web */}
      
            {login && <TopBar onLogin={true}  username={username} />}
            {!login && <TopBar/>}
          </Grid>

          <div className="main-topbar-buffer" />
          {/* tạo khoảng cách để tránh chồng lên nhau */}
          {/* cac thanh phan ben duoi chia nhau 12 */}
          <Grid item sm = {3} >
            <Paper className="main-grid-item">
              {/* {login && 
                  <Link to={'/newpost'}><button className='custom-button' style={{ marginBottom:'10px',width:'120px'}}>Add Photo</button></Link>} */}

              {!login ? 
                <h3>Please login to use this app</h3>
                :
                <UserList />}
              
            </Paper>
          </Grid>
          <Grid item sm = {9}>
            <Paper className="main-grid-item">
            
            
            <Routes>
              <Route path='/' element= {<ProtectedRoute login={login} ><Home /></ProtectedRoute>} />
              <Route path='/login' element= {<Login onLogin={handleLogin} usernamecha={(e) => setUsername(e)} />}/>
              <Route path='/logout' element= {<Logout onLogin={handleLogout} />} />
              <Route path='/signup' element= {<Signup />} />

              <Route path='/newpost' element = {<ProtectedRoute login={login} ><NewPost /></ProtectedRoute>}/>
              <Route path='/users' element= {<ProtectedRoute login={login} ><UserList /></ProtectedRoute>} />
              <Route path='/users/:userid' element= {<ProtectedRoute login={login} ><UserDetail /></ProtectedRoute>} ></Route>
              <Route path='/photos/:userid' element = {<ProtectedRoute login={login} ><UserPhoto /></ProtectedRoute>} />
            </Routes>
            </Paper> 
            
          </Grid>
        </Grid>
      </Router>
    )
}