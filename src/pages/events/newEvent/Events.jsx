import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Container, Row } from "react-bootstrap";
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
  const refUserEvents = useRef(null);
  const refFutureEvents = useRef(null);
  const refPastEvents = useRef(null);

  const [events, setEvents] = useState(null);
  const [recorded, setRecorded] = useState(null);
  const [next, setNext] = useState(0);
  const [userBool, setUserBool] = useState(true);

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
    setNext(0);
    var userDb = await getPrivate(`/studentEvents/${user.id}`);
    setUserEvents(userDb.data);
    console.log(userEvents.length);
    console.log(next);
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
      Alert.success({ title: "Exito", message:"Se te inscribio en el evento" });
    } catch (err) {
      Alert.error({ title: "Error", message: err.message });
    }
  }

  async function handleButton(eventId) {
    console.log(eventId);
    try {
      Alert.confirm({ title: "¿Eliminar esta inscripcion?" }, async () => {
        await postPrivate("/studentEvents/droll", {
          userId: user.id,
          eventId,
        });

        console.log("Antes de eliminar");

        setUserEvents(userEvents.filter((e) => e.id !== eventId));
        console.log("Despues de eliminar");
        Alert.success({ title: "Exito", message: "Se te dio de baja en el evento" });
      });
    } catch (err) {
      console.log(err.message);
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
      
        <h1 className="titular-quark">Eventos Quark</h1>
        <h5 className="subtitular-quark">Subtitulo</h5>
        <hr className="hr-quark" />

        <div className="myProfileButtons">
          <ButtonGroup>
            <Button
              ref={refUserEvents}
              onClick={() => {
                fetchUserEvents(setEvents, setNext);
                
                refUserEvents.current.id = "presed";
                refFutureEvents.current.id = "";
                refPastEvents.current.id = "";
              }}
              id="presed"
              className="profileButton"
            >
              Mis Eventos
            </Button>
            <Button
              ref={refFutureEvents}
              onClick={() => {
                fetchFutureEvents(setEvents, setNext);
                
                refUserEvents.current.id = "";
                refFutureEvents.current.id = "presed";
                refPastEvents.current.id = "";
              }}
              className="profileButton"
            >
              Eventos Futuros
            </Button>
            <Button
              ref={refPastEvents}
              onClick={() => {
                fetchPastEvents(setRecorded, setNext);
                
                refUserEvents.current.id = "";
                refFutureEvents.current.id = "";
                refPastEvents.current.id = "presed";
              }}
              className="profileButton"
            >
              Eventos Grabados
            </Button>
          </ButtonGroup>
        </div>

      <div className="cardContainer " style={{
          width : "100%",
          height: "100%"
        }}>
        <Row className="mt-4" style={{
          width : "100%",
          
          
        }}>
          {userEvents != null && next == 0 ? (
            userEvents.length == 0 && next == 0 ? (
              <h2 className="my-auto" style={{color:"#2390B6"}}>Ups... Parece que no tienes eventos</h2>
            ) : (
              userEvents.map((news) => {
                if (userEvents.length != 0) {
                  return (
                    <UserEventCard event={news} handleDelete={handleButton} />
                  );
                }
              })
            )
          ) : (
            ""
          )}
        
          {events != null && next == 1 ? (
            events.length == 0 && next == 1 ? (
              <h2 className="my-auto" style={{color:"#2390B6"}}>No hay eventos</h2>
            ) : (
              events.map((news) => {
                return <EventCard news={news} enrollUser={enrollUser} />;
              })
            )
          ) : (
            ""
          )}
      
          {recorded != null && next == 2 ? (
            recorded.length == 0 && next == 2 ? (
              <h2 className="my-auto" style={{color:"#2390B6"}}>No hay eventos</h2>
            ) : (
              recorded.map((news) => {
                return <RecordedEventCard event={news} />;
              })
            )
          ) : (
            ""
          )}
        </Row>
      </div>
    </Container>
  );
};

export default Events;
