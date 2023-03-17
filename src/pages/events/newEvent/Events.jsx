import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
import {
  getPrivate,
  postPrivate,
  postPublic,
} from "../../../services/apiService";
import EventCard from "./EventCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../../features/userSlice";
import Cookies from "universal-cookie";
import Alert from "../../../services/alertService";
import UserEventCard from "./UserEventCard";
import RecordedEventCard from "./RecordedEventCard";

const Events = () => {
  const user = useSelector(selectUser);
  // const navigate = useNavigate();
  const cookies = new Cookies();

  const [events, setEvents] = useState(null);
  const [recorded, setRecorded] = useState(null);
  const [next, setNext] = useState(0);
  const [userBool, setUserBool] = useState(true)

  const [userEvents, setUserEvents] = useState(null);

  const [futurePage, setFuturePage] = useState(0);
  const [elementCountFuture, setElementCountFuture] = useState(0);
  const pageCountFuture = Math.ceil(elementCountFuture / 2);

  const [pastPage, setPastPage] = useState(0);
  const [elementCountPast, setElementCountPast] = useState(0);
  const pageCountPast = Math.ceil(elementCountPast / 4);

  async function fetchFutureEvents(status, next) {
    const resF = await postPublic(`/events/futureEvents`, {
      page: futurePage,
      userId: user.id,
    });
    setEvents(resF.data.row);
    next(1);
    
  }

  async function fetchUserEvents() {
    setNext(0)
    var userDb = await getPrivate(`/studentEvents/${user.id}`);
    setUserEvents(userDb.data);
    console.log(userEvents.length)
    console.log(next)
    
    
    
    
    
  }

  async function fetchPastEvents(status, next) {
    const resP = await postPublic(`/events/pastEvents`, { page: pastPage });
    setRecorded(resP.data.rows);
    next(2);
   
    
  }

  async function enrollUser(eventId) {
    try {
      await postPrivate("/studentEvents/enroll", {
        userId: user.id,
        eventId,
      });

      setEvents(events.filter((e) => e.id !== eventId));
      Alert.success({ title: "Exito", message: "Se te inscribio al evento" });
    } catch (err) {
      Alert.error({ title: "Error", message: err.message });
    }
  }

  async function handleButton(eventId){
    console.log(eventId)
    try{
      Alert.confirm({ title: "¿Eliminar esta inscripcion?" }, async () => {
        await postPrivate("/studentEvents/droll", {
          userId: user.id,
          eventId 
        })
          
        console.log("Antes de eliminar")
        
        setUserEvents(userEvents.filter((e) => e.id !== eventId ))
        console.log("Despues de eliminar")
        Alert.success({ title: "Exito", message: "Se te inscribio al evento" });
      })
        
      
    
    }catch(err){
      console.log(err.message)
    }
    
  }


  useEffect(() => {
    fetchUserEvents();
  }, []);

  useEffect(() => {
    setEvents(null);
  }, [recorded]);

  return (
    <Container fluid>
      <div className="titleContainer">
        <h1 className="title">Eventos Quark</h1>
        <h5 className="subtitle">Subtitulo</h5>
        <hr className="line" />

        <button
          onClick={() => {
            fetchUserEvents(setEvents, setNext);
          }}
          className="futureEvents"
          id="future"
        >
          Mis Eventos
        </button>

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
          {userEvents != null && next == 0
            ? userEvents.length == 0 && next == 0 ? <div>No hay eventos</div> : userEvents.map((news) => {
            
              if(userEvents.length != 0){
                return <UserEventCard event={news} handleDelete={handleButton}/>
              }
              
            }) : "" }
        </Row>
        <Row>
          {events != null && next == 1
            ? events.length == 0 && next == 1 ? <div>No hay eventos</div> : events.map((news) => {
           
              return <EventCard news={news} enrollUser={enrollUser}/>
              
              
            }) : "" }
        </Row>
        <Row>
          {recorded != null && next == 2
            ? recorded.length == 0 && next == 2 ? <div>No hay eventos</div> : recorded.map((news) => {
           
              return <RecordedEventCard event={news}  />
              
              
            }) : "" }
        </Row>
      </div>
    </Container>
  );
};

export default Events;
