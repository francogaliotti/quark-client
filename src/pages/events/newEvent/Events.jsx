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

const Events = () => {
  const user = useSelector(selectUser);
  // const navigate = useNavigate();
  const cookies = new Cookies();

  const [events, setEvents] = useState(null);
  const [recorded, setRecorded] = useState(null);
  const [next, setNext] = useState(true);

  const [userEvents, setUserEvents] = useState(null);

  const [futurePage, setFuturePage] = useState(0);
  const [elementCountFuture, setElementCountFuture] = useState(0);
  const pageCountFuture = Math.ceil(elementCountFuture / 2);

  const [pastPage, setPastPage] = useState(0);
  const [elementCountPast, setElementCountPast] = useState(0);
  const pageCountPast = Math.ceil(elementCountPast / 4);

  async function fetchFutureEvents(status, next) {
    const resF = await postPublic(`/events/futureEvents`, { page: futurePage, userId: user.id });
    status(resF.data.row);
    next(true);

    setUserEvents(null)

   
  }

  async function fetchUserEvents(){
    var userDb = await getPrivate(`/studentEvents/${user.id}`)
    setUserEvents(userDb.data)

    setRecorded(null)
    setEvents(null)
  }
    

  
  async function fetchPastEvents(status, next) {
    const resP = await postPublic(`/events/pastEvents`, { page: pastPage });
    status(resP.data.rows);
    next(false);
    setUserEvents(null)
  }

  async function enrollUser(eventId) {
    try {
      await postPrivate("/studentEvents/enroll", {
        userId: user.id,
        eventId,
      });
      
      setEvents(events.filter(e => e.id !== eventId))
      Alert.success({ title: "Exito", message: "Se te inscribio al evento" });
    } catch (err) {
      Alert.error({ title: "Error", message: err.message });
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
        {userEvents != null 
            ? userEvents.map((news) => (
                <EventCard news={news} enrollUser={enrollUser} />
              ))
            : ""}
        </Row>
        <Row>
          {events != null && next == true
            ? events.map((news) => (
                <EventCard news={news} enrollUser={enrollUser} />
              ))
            : ""}
        </Row>
        <Row>
          {recorded != null && next == false
            ? recorded.map((news) => (
                <EventCard news={news} enrollUser={enrollUser} />
              ))
            : ""}
        </Row>
      </div>
    </Container>
  );
};

export default Events;
