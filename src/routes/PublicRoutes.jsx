import React from 'react'
import { Route, Routes } from 'react-router-dom';
import ComRegisterForm from '../components/comRegisterForm';
import DevRegisterForm from '../components/devRegisterForm';
import LoginForm from '../components/loginForm';
import ProfesionalProfile from '../components/profesionalProfile';
import Home from '../pages/home';
import ProfilePage from '../pages/profilePage';

function PublicRoutes() {
  return (
    <>
    <Routes>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/profesionalProfile' element={<ProfesionalProfile/>}/>
        <Route path='/registerDev' element={<DevRegisterForm/>}/>
        <Route path='/registerCom' element={<ComRegisterForm/>}/>
        <Route path='/' element={<Home/>}/>
    </Routes>
    </>
  )
}

export default PublicRoutes