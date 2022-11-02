import React from 'react'
import { Route, Routes } from 'react-router-dom';
import LoginForm from '../components/loginForm';
import Home from '../pages/home';

function PublicRoutes() {
  return (
    <>
    <Routes>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/' element={<Home/>}/>
    </Routes>
    </>
  )
}

export default PublicRoutes