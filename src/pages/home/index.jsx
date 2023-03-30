import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import { login, selectUser } from "../../features/userSlice";
//import "../../styles/Home.css";
import axios from "axios";
import ProfProgressBar from "../../components/profProgressBar";
import Cookies from "universal-cookie";
import { useState } from "react";
import { getPublic, postPublic } from "../../services/apiService";
import { SingleCourse } from "../../components/singleCourse";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";
import { ProfileCard } from "../../components/profileCard";
import { PersonalInfoModal } from "../../components/onBoardingModals/personalInfoModal";
import { ExperienceModal } from "../../components/onBoardingModals/experienceModal";
import { NewsAccordion } from "../../components/newsAccordion";

function Home() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  let cursosOrdenados = [];
  if (user) {
    const arrayForSort = [...user.moodleUserData.listaCurso];
    cursosOrdenados = arrayForSort
      .sort((x, y) => x.lastaccess - y.lastaccess)
      .reverse()
      .splice(0, 2);
  }

  const [newsList, setNewsList] = useState([]);
  const [closestEvent, setClosestEvent] = useState();
  //const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
  //const [showExperienceModal, setShowExperienceModal] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await postPublic(`/news/platformNews`, { listaCurso });
      setNewsList(res.data);
    };
    const fetchEvent = async () => {
      const res = await getPublic(`/events/closestEvent`);
      setClosestEvent(res.data);
    };
    const listaCurso = user?.moodleUserData.listaCurso.map((c) => {
      return c.idCurso;
    });
    fetchNews();
    fetchEvent();
  }, []);

  return (
    <div className="homePageContainer">
      <Container fluid>
        <h1 className="titular-quark">Bienvenido(a/e)<a class="link-titular-quark">@{user?.moodleUserData.firstname}</a></h1>
        <h4 className="subtitular-quark">
          Estos son los cursos en los que estas inscripto(a/e), continua tu
          entrenamiento!
        </h4>
        <hr className="hr-quark"/>
        <Row>
          <Col md={6}>
            {cursosOrdenados.length !== 0 && (
              <div className="homeCourses">
                {cursosOrdenados?.map((c) => {
                  return <SingleCourse course={c} />;
                })}
              </div>
            )}
          </Col>
          <Col md={6}>
            <NewsAccordion/>
            <ProfileCard />
            {/*Estos botones no van*/}
            {/* <Button
              variant="primary"
              onClick={() => setShowPersonalInfoModal(true)}
            >
              PersonalInFoModal
            </Button>
            <Button
              variant="primary"
              onClick={() => setShowExperienceModal(true)}
            >
              ExperienceModal
              </Button>*/}
          </Col>
        </Row>
      </Container>

      {/*<PersonalInfoModal
        show={showPersonalInfoModal}
        setShow={setShowPersonalInfoModal}
      />
      <ExperienceModal
        show={showExperienceModal}
        setShow={setShowExperienceModal}
      />*/}

      {/*<h1>Bienvenido/a {user?.moodleUserData.firstname}!</h1>
      <div className="homeProgBars">
        <ProfProgressBar type="normal" />
        <ProfProgressBar type="profesional" />
      </div>
      {newsList.length !== 0 && (
        <div className="homeEvent">
          <h2>Novedades</h2>
          <div className="homeNewsContainer">
            {newsList?.map((n) => {
              return (
                <div className="singleNews">
                  <h3>{n.title}</h3>
                  <p>{n.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {cursosOrdenados.length !== 0 && (
        <div className="homeCourses">
          <h2>Tus últimos cursos</h2>
          <div className="wrapContainer">
            {cursosOrdenados?.map((c) => {
              return <SingleCourse course={c} />;
            })}
          </div>
        </div>
      )}
      {closestEvent && (
        <div className="homeEvent">
          <h2>Siguiente evento</h2>
          <div className="liveEventsList" id="homeEvents">
            <div
              className="singleEvent"
              onClick={() =>
                window.open(
                  "http://" + closestEvent?.link,
                  "_blank",
                  "noopener noreferrer"
                )
              }
            >
              <div className="seLeftContainer">
                <img id="eventImg" src={closestEvent?.img} alt="" />
              </div>
              <div className="seRightContainer">
                <h3>{closestEvent?.title}</h3>
                <p id="eventDescription">{closestEvent?.description}</p>
                <p>
                  {new Date(closestEvent?.eventDate).toLocaleDateString(
                    "en-AU"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
                  )}*/}
    </div>
  );
}

export default Home;
