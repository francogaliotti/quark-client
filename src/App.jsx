import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/loginForm';
import { login, selectUser } from './features/userSlice'
import './App.css'
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import PublicRoutes from './routes/PublicRoutes';
import VerticalNavbar from './components/verticalNavbar';
import axios from 'axios';


function App() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("sesskey")) {
        const username = localStorage.getItem("username")
        const res = await axios.get(`https://api-perfil.uc.r.appspot.com/user/${username}`)
        const user = res.data
        dispatch(login({
          ...user,
          sesskey: localStorage.getItem("sesskey"),
          LoggedIn: true
        }))
      }
    }
    fetchData()
  }, []);

  return (
    <div className="app-container">
      {user && <>
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
