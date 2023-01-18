import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/loginForm';
import { login, selectUser } from './features/userSlice'
import './App.css'
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import PublicRoutes from './routes/PublicRoutes';
import VerticalNavbar from './components/verticalNavbar';
import axios from 'axios';
import Cookies from 'universal-cookie';



function App() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookies = new Cookies()

  useEffect(() => {
    const fetchData = async () => {
      if (cookies.get("myCookieName")) {
        console.log("asd")
        const username = cookies.get("username")
        const res = await axios.get(`https://api-perfil.uc.r.appspot.com/user/getMoodleData/${username}`)
        const user = res.data
        const profInfo = await axios.get(`https://api-perfil.uc.r.appspot.com/user/${user.moodleUserData.id}`)
        dispatch(login({
          ...user,
          ...profInfo.data,
          token: sessionStorage.getItem('token'),
          sesskey: sessionStorage.getItem("sesskey"),
          LoggedIn: true
        }))
      }
    }
    fetchData()
  }, []);

  return (
    <div className="app-container">
      {cookies.get("myCookieName") && <>
        <VerticalNavbar />
      </>}
      <Navbar />
      <div className="content-container">
        <PublicRoutes />
        
      </div>
    </div>
  );
}

export default App;
