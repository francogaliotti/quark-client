import { useSelector } from 'react-redux';
import LoginForm from './components/loginForm';
import { selectUser } from './features/userSlice'
import './App.css'
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import PublicRoutes from './routes/PublicRoutes';


function App() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();


  return (
    <div className="app-container">
      {user && <Navbar />}
      <PublicRoutes />
    </div>
  );
}

export default App;
