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
import { SingleCourse } from '../../components/singleCourse';

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
            {cursosOrdenados.length !== 0 && <div className="homeCourses">
                <h2>Tus últimos cursos</h2>
                <div className="wrapContainer">
                    {cursosOrdenados?.map((c) => {
                        return (<SingleCourse course={c}/>)
                    })}
                </div>
            </div>}
            {closestEvent &&
                <div className="homeEvent">
                    <h2>Siguiente evento</h2>
                    <div className="liveEventsList" id='homeEvents'>

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
            }
        </div>
    )
}

export default Home