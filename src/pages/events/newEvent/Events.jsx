import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap';
import axios from "axios"
import { postPublic } from '../../../services/apiService';
import EventCard from './EventCard';

const Events = () => {
    const [events, setEvents] = useState(null);
    const [recorded, setRecorded] = useState(null);
    const [next, setNext] = useState(true);

    const [futurePage, setFuturePage] = useState(0)
    const [elementCountFuture, setElementCountFuture] = useState(0)
    const pageCountFuture = Math.ceil(elementCountFuture / 2)

    const [pastPage, setPastPage] = useState(0)
    const [elementCountPast, setElementCountPast] = useState(0)
    const pageCountPast = Math.ceil(elementCountPast / 4)

    async function fetchFutureEvents(status,next){
        const resF = await postPublic(`/events/futureEvents`, { page: futurePage })
        console.log(resF.data.rows)
        status(resF.data.rows)
        next(true)
    }

    async function fetchPastEvents(status,next){
        const resP = await postPublic(`/events/pastEvents`, { page: pastPage })
        status(resP.data.rows)
        next(false)
        
    }
    useEffect(()=>{
        fetchFutureEvents(setEvents,setNext)
    },[])
    
    useEffect(()=>{
      setEvents(null);
    },[recorded])

  return (
    <Container fluid>
      <div className="titleContainer"> 
        <h1 className="title">Eventos Quark</h1>
        <h5 className="subtitle">Subtitulo</h5>
        <hr className="line"/>

        <button
          onClick={() => {
            fetchFutureEvents(setEvents, setNext);
          }}
          className="futureEvents"
          id="future"
        >
          Proximos Eventos
        </button>

        <button
          onClick={() => {
            fetchPastEvents(setRecorded, setNext);
          }}
          className="recordedEvents clicked"
          id="recorded"
        >
          Eventos Grabados
        </button>
      </div>

      <div className="cardContainer">
       <Row>
       {events != null && next == true
          ? events.map((news) => <EventCard news={news} />)
          : ""}

        {recorded != null && next == false
          ? recorded.map((news) => <EventCard news={news} />)
          : ""}
       </Row>
      </div>
    </Container>

  )
}

export default Events
