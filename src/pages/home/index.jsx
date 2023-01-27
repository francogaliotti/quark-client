import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProgressBar from "@ramonak/react-progress-bar";
import { login, selectUser } from '../../features/userSlice';
import '../../styles/Home.css'
import axios from 'axios';
import ProfProgressBar from '../../components/profProgressBar';
import Cookies from 'universal-cookie';
import { useState } from 'react';
import { getPublic, postPublic } from '../../services/apiService';

function Home() {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cookies = new Cookies()
    let cursosOrdenados = []
    if (user) {
        const arrayForSort = [...user.moodleUserData.listaCurso]
        cursosOrdenados = arrayForSort.sort((x, y) => x.lastaccess - y.lastaccess).reverse().splice(0, 3)
    }

    const [newsList, setNewsList] = useState([])
    const [closestEvent, setClosestEvent] = useState()

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
        const fetchNews = async () => {
            const res = await postPublic(`/news/platformNews`,
            { listaCurso })
            setNewsList(res.data)
        }
        const fetchEvent = async () => {
            const res = await getPublic(`/events/closestEvent`)
            setClosestEvent(res.data)
        }
        const listaCurso = user?.moodleUserData.listaCurso.map(c => {
            return (c.idCurso)
        })
        fetchNews()
        fetchEvent()
    }, []);

    useEffect(() => {
        if (!user) navigate('/login')
    }, [user]);

    return (
        <div className='homePageContainer'>
            <h1>Bienvenido/a {user?.moodleUserData.firstname}!</h1>
            <div className="homeProgBars">
                <ProfProgressBar type='normal' />
                <ProfProgressBar type='profesional' />
            </div>
            {newsList.length !== 0 && <div className="homeEvent">
                <h2>Novedades</h2>
                <div className="homeNewsContainer">
                    {newsList?.map(n => {
                        return <div className="singleNews">
                            <h3>{n.title}</h3>
                            <p>{n.content}</p>
                        </div>
                    })}
                </div>
            </div>}
            <div className="homeEvent">
                <h2>Tus últimos cursos</h2>
                <div className="wrapContainer" id='homeEvents'>
                    {cursosOrdenados && cursosOrdenados?.map((c) => {

                        return (<div className="basicInfo" id='courseContainer'>
                            <h3 id='courseTitle'>{c.fullName}</h3>
                            <img src={c.url} id='courseImg' />
                            <h4 id='courseDate'>Fecha de inicio: <p>{new Date(c.timestarted).toLocaleDateString("en-AU")}</p></h4>
                            <ProgressBar completed={Math.round(c.progress)} className="wrapper"
                                barContainerClassName="container"
                                bgColor='rgb(24, 27, 32)'
                                labelClassName="label"
                                labelAlignment='center' />
                        </div>)
                    })}
                </div>
            </div>
            <div className="homeEvent">
                <h2>Siguiente evento</h2>
                <div className="liveEventsList" id='homeEvents'>
                    {/*<div className="singleEvent">
                        <div className="seLeftContainer">
                            <img id='eventImg' src="https://img.freepik.com/free-vector/joystick-game-sport-technology_138676-2045.jpg?w=2000" alt="" />
                        </div>
                        <div className="seRightContainer">
                            <h3>Título Evento 1</h3>
                            <p>descripción</p>
                            <p>fecha</p>
                            <a href="#">Link</a>
                        </div>
                    </div>*/}
                    <div className="singleEvent" onClick={() => window.open("http://" + closestEvent?.link, "_blank", "noopener noreferrer")}>
                        <div className="seLeftContainer">
                            <img id='eventImg' src="https://img.freepik.com/free-vector/joystick-game-sport-technology_138676-2045.jpg?w=2000" alt="" />
                        </div>
                        <div className="seRightContainer">
                            <h3>{closestEvent?.title}</h3>
                            <p id='eventDescription'>{closestEvent?.description}</p>
                            <p>{new Date(closestEvent?.eventDate).toLocaleDateString("en-AU")}</p>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Home