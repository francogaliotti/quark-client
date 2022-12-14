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


function App() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (sessionStorage.getItem("sesskey")) {
        const username = sessionStorage.getItem("username")
        const res = await axios.get(`https://api-perfil.uc.r.appspot.com/user/${username}`)
        const user = res.data
        dispatch(login({
          ...user,
          sesskey: sessionStorage.getItem("sesskey"),
          LoggedIn: true
        }))
      }
    }
    fetchData()
  }, []);

  return (
    <div className="app-container">
      {sessionStorage.getItem("sesskey") && <>
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
