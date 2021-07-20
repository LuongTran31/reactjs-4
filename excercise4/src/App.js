import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./components/home";
import Post from "./components/post";
import Login from "./components/login";
import Profile from "./components/profile";
import PostDetail from "./components/postdetail";
import ProfilePage from "./components/ProfilePage";
const mystyle = {
  paddingLeft: "30px",
  textdecoration: "none",
  display: "inline",
};

const mystyle1 = {
  width: "100px",
  height: "100px",
  position: "absolute",
  left: "50%",
  marginLeft: "-50px",
};
const App=()=> {
  const [currentUser,setCurrentUser] =useState({
    token: null,
    userID:null
  })
  return (
    <Router>
      <div  >
        
        <nav >

          <ul  >
            <li  style={mystyle} >
              <Link to="/home">Home</Link>
            </li>
            <li style={mystyle} >
              <Link to="/posts">Post</Link>
            </li>

            <li style={mystyle} >
              <Link to="/profile">Profile</Link>
            </li>

            <li style={mystyle} >
              <Link to="/login">Login</Link>
            </li>
            <li style={mystyle} >
              <Link to="/profilepage">profilepage</Link>
            </li>
          </ul>
        </nav>
        <Switch>

          <Route path="/home">
            <Home />
          </Route>
          <Route path="/posts">
            <Post />
          </Route>
          <Route path="/post/:id">
              <PostDetail />
              </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/login">
            <Login currentUser = {currentUser}
            setCurrentUser = {setCurrentUser}
            />
          </Route>
          <Route 
          path="/profilepage" exact
          render={() => {
          if (currentUser.userId === null) return (
            <Login
              setCurrentUser={setCurrentUser}
              title="You need to login first"
            />)
          else return <ProfilePage
            currentUser={currentUser}
          />
        }}
        >
             
          </Route>
          
        </Switch>
        
      </div>
    </Router>
  );
}


export default App;