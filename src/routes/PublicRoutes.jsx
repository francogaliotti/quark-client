import React from 'react'
import { Route, Routes } from 'react-router-dom';
import ComRegisterForm from '../components/comRegisterForm';
import DevRegisterForm from '../components/devRegisterForm';
import { IFrameComponent } from '../components/iFrameComponent';
import LoginForm from '../components/loginForm';
import ProfesionalProfile from '../components/profesionalProfile';
import EditProfesionalProfile from '../components/profesionalProfile/editProfProfile';
import { ConfirmRegisterDev } from '../pages/auth/confirmRegisterDev';
import Configuration from '../pages/configuration';
import { EventsAdmin } from '../pages/configuration/eventsAdmin';
import { NewsAdmin } from '../pages/configuration/newsAdmin';
import { ScholarshipsAdmin } from '../pages/configuration/scholarshipsAdmin';
import { Course } from '../pages/course';
import Events from '../pages/events';
import Home from '../pages/home';
import MyCourses from '../pages/myCourses';
import { Offer } from '../pages/offer';
import ProfilePage from '../pages/profilePage';
import { Scholarships } from '../pages/scholarships';

function PublicRoutes() {
  return (
    <>
    <Routes>

        {/*Public routes */}
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/registerDev' element={<DevRegisterForm/>}/>
        <Route path='/registerCom' element={<ComRegisterForm/>}/>
        <Route path='/confirmRegisterDev/:id' element={<ConfirmRegisterDev/>}/>

        {/*User routes */}
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/profesionalProfile' element={<ProfesionalProfile/>}/>
        <Route path='/editProfile' element={<EditProfesionalProfile/>}/>
        <Route path='/myCourses' element={<MyCourses/>}/>
        <Route exact path='/course/:id' element={<Course/>}/>
        <Route path='/events' element={<Events/>}/>
        <Route path='/offer' element={<Offer/>}/>
        <Route path='/scholarships' element={<Scholarships/>}/>
        <Route path='/' element={<Home/>}/>

        {/*Admin routes*/}
        <Route path='/config' element={<Configuration/>}/>
        <Route path='/config/events' element={<EventsAdmin/>}/>
        <Route path='/config/news' element={<NewsAdmin/>}/>
        <Route path='/config/scholarships' element={<ScholarshipsAdmin/>}/>
        <Route path='/config/adminMoodle' element={<IFrameComponent url='/admin/search.php'/>}/>
    </Routes>
    </>
  )
}

export default PublicRoutes