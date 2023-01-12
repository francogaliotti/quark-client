import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { selectUser } from '../../features/userSlice';
import '../../styles/Events.css'

function Events() {

  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const cookies = new Cookies()

  const [futureEventsList, setFutureEventsList] = useState([])
  const [pastEventsList, setPastEventsList] = useState([])

  const [futurePage, setFuturePage] = useState(0)
  const [elementCountFuture, setElementCountFuture] = useState(0)
  const pageCountFuture = Math.ceil(elementCountFuture / 2)

  const [pastPage, setPastPage] = useState(0)
  const [elementCountPast, setElementCountPast] = useState(0)
  const pageCountPast = Math.ceil(elementCountPast / 4)

  useEffect(() => {
    if (!cookies.get("myCookieName")) {
      navigate('/login')
    }
    const fetchEvents = async () => {
      const resF = await axios.post(`https://api-perfil.uc.r.appspot.com/events/futureEvents`, { page: futurePage })
      setFutureEventsList(resF.data.rows)
      setElementCountFuture(resF.data.count)
      const resP = await axios.post(`https://api-perfil.uc.r.appspot.com/events/pastEvents`, { page: pastPage })
      setPastEventsList(resP.data.rows)
      setElementCountPast(resP.data.count)
    }

    fetchEvents()
  }, [futurePage, pastPage]);

  const changePageFuture = ({ selected }) => {
    setFuturePage(selected);
  };

  const changePagePast = ({ selected }) => {
    setPastPage(selected);
  };

  return (
    <div className="eventPageContainer">
      <h1 id='evH1'>Próximos Eventos</h1>
      <div className="liveEventsContainer">
        <h2>Webinars en vivo</h2>
        <div className="liveEventsList">
          {futureEventsList.map(e => {
            return <div className="singleEvent" onClick={() => window.location.href = e.link}>
              <div className="seLeftContainer">
                <img id='eventImg' src="https://img.freepik.com/free-vector/joystick-game-sport-technology_138676-2045.jpg?w=2000" alt="" />
              </div>
              <div className="seRightContainer">
                <h3>{e.title}</h3>
                <p>{e.description}</p>
                <p>{new Date(e.eventDate).toLocaleDateString("en-AU")}</p>
              </div>
            </div>
          })}
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCountFuture}
            onPageChange={changePageFuture}
            containerClassName={"eventPaginationBttns"}
            previousLinkClassName={"eventPreviousBttn"}
            pageClassName={"pageBttn"}
            nextLinkClassName={"eventNextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>

      </div>

      <div className="liveEventsContainer">
        <h2>Game Jams (Próximamente)</h2>
        <div className="liveEventsList">

          {/*Información hardcodeada*/}
          <div className="singleEvent">
            <div className="seLeftContainer">
              <img id='eventImg' src="https://img.freepik.com/free-vector/joystick-game-sport-technology_138676-2045.jpg?w=2000" alt="" />
            </div>
            <div className="seRightContainer">
              <h3>Game Jam 1</h3>
              <p>descripción</p>
              <p>fecha</p>
              <a href="#">Link</a>
            </div>
          </div>

        </div>

      </div>

      <h1 id='evH1'>Eventos pasados</h1>

      <div className="liveEventsContainer">
        <div className="pastEventsList">

          {/*Información hardcodeada*/}
          {pastEventsList.map(e => {
            return <div className="singleEvent" id='pastSingleEvent'>
              <div className="pastEvContainer">
                <img id='eventImg' src="https://img.freepik.com/free-vector/joystick-game-sport-technology_138676-2045.jpg?w=2000" alt="" />
                <h3>{e.title}</h3>
                <p>{e.description}</p>
              </div>
            </div>
          })}
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCountFuture}
            onPageChange={changePageFuture}
            containerClassName={"pastEventPaginationBttns"}
            previousLinkClassName={"eventPreviousBttn"}
            pageClassName={"pageBttn"}
            nextLinkClassName={"eventNextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>


      </div>

    </div>
  )
}

export default Events