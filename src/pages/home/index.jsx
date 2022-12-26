import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProgressBar from "@ramonak/react-progress-bar";
import { login, selectUser } from '../../features/userSlice';
import '../../styles/Home.css'
import axios from 'axios';
import ProfProgressBar from '../../components/profProgressBar';

function Home() {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let cursosOrdenados = []
    if (user) {
        const arrayForSort = [...user.listaCurso]
        cursosOrdenados = arrayForSort.sort((x, y) => x.lastaccess - y.lastaccess).reverse().splice(0, 3)
    }


    useEffect(() => {
        if (!sessionStorage.getItem("sesskey")) navigate('/login')
    }, []);

    return (
        <div className='homePageContainer'>
            <h1>Bienvenido/a {user?.firstname}!</h1>
            <div className="homeProgBars">
                <ProfProgressBar type='normal' />
                <ProfProgressBar type='profesional' />
            </div>
            <div className="homeEvent">
                <h2>Tus últimos cursos</h2>
                <div className="wrapContainer" id='homeEvents'>
                    {cursosOrdenados && cursosOrdenados?.map((c) => {

                        return (<div className="basicInfo" id='courseContainer'>
                            <h3 id='courseTitle'>{c.fullName}</h3>
                            <img src={c.url} id='courseImg' />
                            <h4 id='courseDate'>Fecha de inicio: <p>{new Date(c.timestarted).toLocaleDateString("en-AU")}</p></h4>
                            <ProgressBar completed={Math.round(c.progress)} className="bar" />
                        </div>)
                    })}
                </div>
            </div>
            <div className="homeEvent">
                <h2>Siguiente evento</h2>
                <div className="liveEventsList" id='homeEvents'>
                    <div className="singleEvent">
                        <div className="seLeftContainer">
                            <img id='eventImg' src="https://img.freepik.com/free-vector/joystick-game-sport-technology_138676-2045.jpg?w=2000" alt="" />
                        </div>
                        <div className="seRightContainer">
                            <h3>Título Evento 1</h3>
                            <p>descripción</p>
                            <p>fecha</p>
                            <a href="#">Link</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home