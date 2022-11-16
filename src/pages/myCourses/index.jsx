import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from '../../styles/styledComponents/Buttons';
import { selectUser } from '../../features/userSlice';
import '../../styles/MyCourses.css'
import ProgressBar from "@ramonak/react-progress-bar";
import axios from 'axios';


function MyCourses() {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (!user) navigate('/login')
        
    }, [user]);


    return (
        <div className="myCoursesContainer">
            <div className="wrapContainer">

                {user.coursesList.map((c)=> {
                    console.log(c)
                    return (<div className="basicInfo" id='courseContainer'>
                    <img src="https://cdn.cdnlogo.com/logos/c/27/c.svg" id='courseImg' />
                    <h3 id='courseTitle'>{c.fullName}</h3>
                    <h4 id='courseDate'>Inicio: {new Date(c.timestarted).toLocaleDateString("en-AU")}</h4>
                    <ProgressBar completed={Math.round(c.progress)}/>
                </div>)
                })}

            </div>
        </div>
    )
}

export default MyCourses