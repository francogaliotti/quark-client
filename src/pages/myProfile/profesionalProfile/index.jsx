import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, selectUser } from "../../../features/userSlice";
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
import { deletePrivate, getPrivate } from "../../../services/apiService";
import Alert from "../../../services/alertService";

function ProfesionalProfile() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
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
    setCurrentActivity(null);
    setShowModal(false);
  };

  const updateState = async (act) => {
    switch (act) {
      case "independent":
        const resInd = await getPrivate(`/independents/${user.id}`);
        dispatch(
          login({
            ...user,
            independentActivities: resInd.data,
          })
        );
        break;
      case "academic":
        const resAc = await getPrivate(`/academics/${user.id}`);
        dispatch(
          login({
            ...user,
            academicActivities: resAc.data,
          })
        );
        break;
      case "labor":
        const resLab = await getPrivate(`/labors/${user.id}`);
        dispatch(
          login({
            ...user,
            laborActivities: resLab.data,
          })
        );
        break;
      case "language":
        const resLan = await getPrivate(`/languages/${user.id}`);
        dispatch(
          login({
            ...user,
            languages: resLan.data.language,
          })
        );
        break;
    }
  };

  const handleDelete = (type, id) => {
    Alert.confirm({ title: "¿Eliminar esta actividad?" }, async () => {
      switch (type) {
        case 0:
          await deletePrivate(`/academics/delete/${id}`);
          Alert.success({
            title: "Eliminada!",
            message: "Actividad académica eliminada",
          });
          await updateState("academic");
          break;
        case 1:
          await deletePrivate(`/labors/delete/${id}`);
          Alert.success({
            title: "Eliminada!",
            message: "Actividad laboral eliminada",
          });
          await updateState("labor");
          break;
        case 2:
          await deletePrivate(`/independents/delete/${id}`);
          Alert.success({
            title: "Eliminado!",
            message: "Proyecto independiente eliminado",
          });
          await updateState("independent");
          break;
        case 3:
          await deletePrivate(`/languages/delete/${id}`);
          Alert.success({
            title: "Eliminado!",
            message: "Idioma eliminado",
          });
          await updateState("language");
          break;
      }
    });
  };

  return (
    <div className="profesionalProfileContainer">
      <EditActivityModal
        show={showModal}
        onClose={closeModal}
        type={currentType}
        isNew={isNew}
        current={currentActivity}
        updateState={updateState}
      />
      <div className="activityContainer">
        <div className="aboutContainer" id="ppAbout">
          <div className="acHeader d-flex justify-content-between">
            <h5>Idiomas</h5>
            <h5
              style={{ cursor: "pointer" }}
              onClick={() => openModal(3, true, {})}
            >
              Añadir nuevo
            </h5>
          </div>
          {user.languages?.map((lan) => {
            return (
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <Card.Title>Idioma</Card.Title>
                  <div className="crudBtns">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ cursor: "pointer" }}
                      onClick={() => openModal(3, false, lan)}
                    />
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(3, lan.id)}
                    />
                  </div>
                </Card.Header>
                <Card.Body>
                  <Card.Text className="d-flex justify-content-between">
                    <p>Idioma</p>
                    <p className="form-control">{lan?.language.name}</p>
                  </Card.Text>
                  <Card.Text className="d-flex justify-content-between">
                    <p>Nivel</p>
                    <p className="form-control">{lan?.level}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </div>
        <div className="activityContainer">
          <div className="acHeader d-flex justify-content-between">
            <h5>Historial Académico</h5>
            <h5
              style={{ cursor: "pointer" }}
              onClick={() => openModal(0, true, {})}
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
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ cursor: "pointer" }}
                      onClick={() => openModal(0, false, lan)}
                    />
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(0, lan.id)}
                    />
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
        <div className="aboutContainer" id="ppAbout">
          <div className="acHeader d-flex justify-content-between">
            <h5>Historial Laboral</h5>
            <h5
              style={{ cursor: "pointer" }}
              onClick={() => openModal(1, true, {})}
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
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ cursor: "pointer" }}
                      onClick={() => openModal(1, false, lan)}
                    />
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(1, lan.id)}
                    />
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
        <div className="aboutContainer" id="ppAbout">
          <div className="acHeader d-flex justify-content-between">
            <h5>Historial de proyectos independientes</h5>
            <h5
              style={{ cursor: "pointer" }}
              onClick={() => openModal(2, true, {})}
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
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ cursor: "pointer" }}
                      onClick={() => openModal(2, false, lan)}
                    />
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(2, lan.id)}
                    />
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

        {/*user.skills?.length !== 0 && (
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
          )*/}
        <PrimaryButton onClick={() => navigate("/editProfile")}>
          Editar
        </PrimaryButton>
      </div>
    </div>
  );
}

export default ProfesionalProfile;
