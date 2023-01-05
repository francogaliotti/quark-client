import React from 'react'
import { Route, Routes } from 'react-router-dom';
import ComRegisterForm from '../components/comRegisterForm';
import DevRegisterForm from '../components/devRegisterForm';
import LoginForm from '../components/loginForm';
import ProfesionalProfile from '../components/profesionalProfile';
import EditProfesionalProfile from '../components/profesionalProfile/editProfProfile';
import Configuration from '../pages/configuration';
import { EventsAdmin } from '../pages/configuration/eventsAdmin';
import { NewsAdmin } from '../pages/configuration/newsAdmin';
import Events from '../pages/events';
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
        <Route path='/events' element={<Events/>}/>
        <Route path='/' element={<Home/>}/>

        {/*Admin routes*/}
        <Route path='/config' element={<Configuration/>}/>
        <Route path='/config/events' element={<EventsAdmin/>}/>
        <Route path='/config/news' element={<NewsAdmin/>}/>
    </Routes>
    </>
  )
}

export default PublicRoutes