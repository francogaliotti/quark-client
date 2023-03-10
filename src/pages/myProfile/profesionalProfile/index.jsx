import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../../features/userSlice";
//import "../../../styles/ProfesionalProfile.css";
import { PrimaryButton } from "../../../styles/styledComponents/Buttons";
import ProfProgressBar from "../../../components/profProgressBar";
import Cookies from "universal-cookie";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { EditActivityModal } from "./editActivityModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

function ProfesionalProfile() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const [showModal, setShowModal] = useState(false);
  const [currentActivity, setCurrentActivity] = useState({});
  const [currentType, setCurrentType] = useState(); // 0:Academica, 1:Laboral, 2:Independiente
  const [isNew, setNew] = useState(false);

  const openModal = (type, newAct, current) => {
    setCurrentType(type);
    setNew(newAct);
    setCurrentActivity(current);
    setShowModal(true);
  };

  const closeModal = () => {
    setCurrentType(null);
    setNew(false);
    setCurrentActivity({});
    setShowModal(false);
  };

  return (
    <div className="profesionalProfileContainer">
      <EditActivityModal
        show={showModal}
        onClose={closeModal}
        type={currentType}
        isNew={isNew}
        current={currentActivity}
      />
      <div className="basicInfo" id="profesionalInfo">
        {user.moodleUserData.badgesList?.length !== 0 && (
          <div className="aboutContainer" id="ppAbout">
            <h3>Insignias:</h3>
            <div className="badges">
              {user?.moodleUserData.badgesList.map((b) => {
                return (
                  <div className="badge">
                    <img id="badgeImg" src={b.badgeUrl} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {user.academicActivities?.length !== 0 && (
          <div className="activityContainer">
            <div className="acHeader d-flex justify-content-between">
              <h5>Historial Académico</h5>
              <h5
                style={{ cursor: "pointer" }}
                onClick={() => openModal(0, true, null)}
              >
                Añadir nueva
              </h5>
            </div>
            {user.academicActivities?.map((lan) => {
              return (
                <Card>
                  <Card.Header className="d-flex justify-content-between">
                    <Card.Title>Actividad Académica</Card.Title>
                    <div className="crudBtns">
                      <button className="plus">
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <button className="plus">
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="d-flex justify-content-between">
                      <p>Título</p>
                      <p className="form-control">{lan?.title}</p>
                    </Card.Text>
                    <Card.Text className="d-flex justify-content-between">
                      <p>Institución</p>
                      <p className="form-control">{lan?.institution}</p>
                    </Card.Text>
                    <Card.Text className="d-flex justify-content-between">
                      <p>Estado</p>
                      <p className="form-control">{lan?.state}</p>
                    </Card.Text>
                    <Card.Text className="d-flex justify-content-between">
                      <p>Inicio</p>
                      <p className="form-control">
                        {new Date(lan?.beginDate).toLocaleDateString("en-AU")}
                      </p>
                    </Card.Text>
                    {lan?.endDate && (
                      <Card.Text className="d-flex justify-content-between">
                        <p>Finalización</p>
                        <p className="form-control">
                          {new Date(lan?.endDate).toLocaleDateString("en-AU")}
                        </p>
                      </Card.Text>
                    )}
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        )}
        {user.laborActivities?.length !== 0 && (
          <div className="aboutContainer" id="ppAbout">
            <div className="acHeader d-flex justify-content-between">
              <h5>Historial Laboral</h5>
              <h5
                style={{ cursor: "pointer" }}
                onClick={() => openModal(1, true, null)}
              >
                Añadir nueva
              </h5>
            </div>
            {user.laborActivities?.map((lan) => {
              return (
                <Card>
                  <Card.Header className="d-flex justify-content-between">
                    <Card.Title>Actividad Laboral</Card.Title>
                    <div className="crudBtns">
                      <button className="plus">
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <button className="plus">
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="d-flex justify-content-between">
                      <p>Título</p>
                      <p className="form-control">{lan?.title}</p>
                    </Card.Text>
                    <Card.Text className="d-flex justify-content-between">
                      <p>Empresa</p>
                      <p className="form-control">{lan?.company}</p>
                    </Card.Text>
                    <Card.Text className="d-flex justify-content-between">
                      <p>Estado</p>
                      <p className="form-control">{lan?.state}</p>
                    </Card.Text>
                    <Card.Text className="d-flex justify-content-between">
                      <p>Inicio</p>
                      <p className="form-control">
                        {new Date(lan?.beginDate).toLocaleDateString("en-AU")}
                      </p>
                    </Card.Text>
                    {lan?.endDate && (
                      <Card.Text className="d-flex justify-content-between">
                        <p>Finalización</p>
                        <p className="form-control">
                          {new Date(lan?.endDate).toLocaleDateString("en-AU")}
                        </p>
                      </Card.Text>
                    )}
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        )}
        {user.independentActivities?.length !== 0 && (
          <div className="aboutContainer" id="ppAbout">
            <div className="acHeader d-flex justify-content-between">
              <h5>Historial de proyectos independientes</h5>
              <h5
                style={{ cursor: "pointer" }}
                onClick={() => openModal(2, true, null)}
              >
                Añadir nueva
              </h5>
            </div>
            {user.independentActivities?.map((lan) => {
              return (
                <Card>
                  <Card.Header className="d-flex justify-content-between">
                    <Card.Title>Proyecto</Card.Title>
                    <div className="crudBtns">
                      <button className="plus">
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <button className="plus">
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="d-flex justify-content-between">
                      <p>Nombre</p>
                      <p className="form-control">{lan?.title}</p>
                    </Card.Text>
                    <Card.Text className="d-flex justify-content-between">
                      <p>URL</p>
                      <p className="form-control">{lan?.projectUrl}</p>
                    </Card.Text>
                    <Card.Text className="d-flex justify-content-between">
                      <p>Descripción</p>
                      <p className="form-control">{lan?.description}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        )}
        {user.languages?.length !== 0 && (
          <div className="aboutContainer" id="ppAbout">
            <h3>Idiomas:</h3>
            {user.languages?.map((lan) => {
              return (
                <div className="fillForms">
                  <div className="fillForm">
                    <label>Idioma</label>
                    <label>{lan?.language.name}</label>
                  </div>
                  <div className="fillForm">
                    <label>Nivel</label>
                    <label>{lan?.level}</label>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {user.skills?.length !== 0 && (
          <div className="aboutContainer" id="ppAbout">
            <h3>Habilidades:</h3>
            {user.skills?.map((sk) => {
              return (
                <div className="fillForms">
                  <div className="fillForm">
                    <label>Habilidad</label>
                    <label>{sk?.skill.name}</label>
                  </div>
                  <div className="fillForm">
                    <label>Puntaje</label>
                    <label>{sk?.score}</label>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <PrimaryButton onClick={() => navigate("/editProfile")}>
          Editar
        </PrimaryButton>
      </div>
    </div>
  );
}

export default ProfesionalProfile;
