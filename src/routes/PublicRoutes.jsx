import React from 'react'
import { Route, Routes } from 'react-router-dom';
import ComRegisterForm from '../components/comRegisterForm';
import DevRegisterForm from '../components/devRegisterForm';
import LoginForm from '../components/loginForm';
import ProfesionalProfile from '../components/profesionalProfile';
import EditProfesionalProfile from '../components/profesionalProfile/editProfProfile';
import CourseIFrame from '../pages/courseIframe';
import Home from '../pages/home';
import MyCourses from '../pages/myCourses';
import ProfilePage from '../pages/profilePage';

function PublicRoutes() {
  return (
    <>
    <Routes>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/profesionalProfile' element={<ProfesionalProfile/>}/>
        <Route path='/profesionalProfile/edit' element={<EditProfesionalProfile/>}/>
        <Route path='/registerDev' element={<DevRegisterForm/>}/>
        <Route path='/registerCom' element={<ComRegisterForm/>}/>
        <Route path='/myCourses' element={<MyCourses/>}/>
        <Route path='/course/:id' element={<CourseIFrame/>}/>
        <Route path='/' element={<Home/>}/>
    </Routes>
    </>
  )
}

export default PublicRoutes