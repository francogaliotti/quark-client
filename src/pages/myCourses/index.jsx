import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from '../../styles/styledComponents/Buttons';
import { selectUser } from '../../features/userSlice';
import '../../styles/MyCourses.css'
import ProgressBar from '../../components/progressBar';
import axios from 'axios';


function MyCourses() {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (!user) navigate('/login')
        axios.get(`https://quark.academy/webservice/rest/server.php?wstoken=11e282e69970c31ed54f38925921b88f&wsfunction=core_enrol_get_users_courses&userid=${user.id}&moodlewsrestformat=json`)
        .then((res) => {
            console.log(res.data)
            setCourses(res.data)
        })
    }, [user]);


    return (
        <div className="myCoursesContainer">
            <h2>Mis Cursos</h2>
            <div className="wrapContainer">

                {courses.map((c)=> {
                    return (<div className="basicInfo" id='courseContainer'>
                    <img src="https://cdn.cdnlogo.com/logos/c/27/c.svg" id='courseImg' />
                    <h3 id='courseTitle'>{c.fullname}</h3>
                    <ProgressBar/>
                </div>)
                })}

            </div>
        </div>
    )
}

export default MyCourses