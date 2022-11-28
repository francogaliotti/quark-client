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
    //const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (!user) navigate('/login')
        
    }, [user]);


    return (
        <div className="myCoursesContainer">
            <div className="wrapContainer">

                {user?.listaCurso.map((c)=> {
                    return (<div className="basicInfo" id='courseContainer'>
                    <h3 id='courseTitle'>{c.fullName}</h3>
                    <img src={c.url} id='courseImg' />
                    <h4 id='courseDate'>Fecha de inicio: <p>{new Date(c.timestarted).toLocaleDateString("en-AU")}</p></h4>
                    <ProgressBar completed={Math.round(c.progress)} className="bar"/>
                </div>)
                })}

                {/* Información hardcodeada, borrar después */}

                <div className="basicInfo" id='courseContainer' onClick={()=>navigate('/course/2')}>
                    <h3 id='courseTitle'>Curso prueba 1</h3>
                    <img src="https://cdn.cdnlogo.com/logos/c/27/c.svg" id='courseImg' />
                    <h4 id='courseDate'>Fecha de inicio: <p>{new Date().toLocaleDateString("en-AU")}</p></h4>
                    <ProgressBar completed={Math.round(20)} className="bar"/>
                </div>

                <div className="basicInfo" id='courseContainer' onClick={()=>navigate('/course/3')}>
                    <h3 id='courseTitle'>Curso prueba 2</h3>
                    <img src="https://cdn.cdnlogo.com/logos/c/27/c.svg" id='courseImg' />
                    <h4 id='courseDate'>Fecha de inicio: <p>{new Date().toLocaleDateString("en-AU")}</p></h4>
                    <ProgressBar completed={Math.round(30)} className="bar"/>
                </div>

            </div>
        </div>
    )
}

export default MyCourses