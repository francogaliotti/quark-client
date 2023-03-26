import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";
import { Countries } from "../../../jsons/countries";
import {
  putPrivate,
} from "../../../services/apiService";
import Alert from "../../../services/alertService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";

function ProfilePage({ updateData }) {
  const user = useSelector(selectUser);

  const [userGeneralData, setUserGeneralData] = useState({});

  const handleProfileChange = async () => {
    try {
      const res = await putPrivate(`/user/update`, {
        userid: user.id,
        userGeneralData,
      });
      Alert.success({ title: "Actualizado!", message: "Perfil actualizado" });
      await updateData();
    } catch (e) {
      console.log(e);
      Alert.error({ title: "Error!", message: e.response.data.msg });
    }
  };

  useEffect(() => {
    setUserGeneralData({
      biography: user?.userBasicDatum.biography,
      nickname: user?.userBasicDatum.nickname,
      birthdate: new Date(user?.userBasicDatum.birthdate)
        .toISOString()
        .substring(0, 10),
      firstname: user?.moodleUserData.firstname,
      lastname: user?.moodleUserData.lastname,
      gender: user?.userBasicDatum.gender,
      //email: user?.moodleUserData.email,
      city: user?.moodleUserData.city,
      phone: user?.moodleUserData.phone,
      country: user?.moodleUserData.country,
      discord: user?.userBasicDatum.discord,
      linkedIn: user?.userBasicDatum.linkedIn,
      idnumber: user?.moodleUserData.idnumber,
      github: user?.userBasicDatum.github,
    });
  }, [user]);

  return (
    <div className="profilePageContainer">
      <Card className="personalProfileContainer card-quark">
        <Card.Header className="pHeader">
          <h5>Sobre mí</h5>
          <p
            clasName="saveBtn"
            onClick={() => handleProfileChange()}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faFloppyDisk} className="fa-solid" /> Guardar
            Cambios
          </p>
        </Card.Header>
        <Card.Body className="userAndMail">
          <span>Nombre de Usuario: {user?.moodleUserData.username}</span>
          <span>Email: {user?.moodleUserData.email}</span>
        </Card.Body>
        <Card.Body className="generalData">
          <h3>Datos generales</h3>
          <div className="fillForms">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                Nickname
              </span>
              <input
                type="text"
                className="form-control"
                value={userGeneralData?.nickname}
                onChange={(e) =>
                  setUserGeneralData({
                    ...userGeneralData,
                    nickname: e.target.value,
                  })
                }
              />
            </div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                Nombre
              </span>
              <input
                type="text"
                value={userGeneralData?.firstname}
                className="form-control"
                onChange={(event) =>
                  setUserGeneralData({
                    ...userGeneralData,
                    firstname: event.target.value,
                  })
                }
              />
            </div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                Apellido
              </span>
              <input
                type="text"
                value={userGeneralData?.lastname}
                className="form-control"
                onChange={(event) =>
                  setUserGeneralData({
                    ...userGeneralData,
                    lastname: event.target.value,
                  })
                }
              />
            </div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                Género
              </span>
              <select
                name=""
                id=""
                value={userGeneralData?.gender}
                className="form-control"
                onChange={(event) =>
                  setUserGeneralData({
                    ...userGeneralData,
                    gender: event.target.value,
                  })
                }
              >
                <option value=""></option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="O">Otro</option>
              </select>
            </div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                Número de identificación personal
              </span>
              <input
                type="text"
                value={userGeneralData?.idnumber}
                className="form-control"
                onChange={(event) =>
                  setUserGeneralData({
                    ...userGeneralData,
                    idnumber: event.target.value,
                  })
                }
              />
            </div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                Fecha de Nacimiento
              </span>
              <input
                type="date"
                value={userGeneralData?.birthdate}
                className="form-control"
                onChange={(e) =>
                  setUserGeneralData({
                    ...userGeneralData,
                    birthdate: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </Card.Body>

        <Card.Body className="contact">
          <h3>Contacto y ubicación</h3>
          <div className="fillForms">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                Pais
              </span>
              <select
                name=""
                id=""
                value={userGeneralData?.country}
                className="form-control"
                onChange={(event) =>
                  setUserGeneralData({
                    ...userGeneralData,
                    country: event.target.value,
                  })
                }
              >
                <option value=""></option>
                {Countries.map((c) => {
                  return <option value={c?.iso2}>{c?.nombre}</option>;
                })}
              </select>
            </div>

            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                Ciudad
              </span>
              <input
                type="text"
                value={userGeneralData?.city}
                className="form-control"
                onChange={(event) =>
                  setUserGeneralData({
                    ...userGeneralData,
                    city: event.target.value,
                  })
                }
              />
            </div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                Teléfono
              </span>
              <input
                type="text"
                value={userGeneralData?.phone}
                className="form-control"
                onChange={(event) =>
                  setUserGeneralData({
                    ...userGeneralData,
                    phone: event.target.value,
                  })
                }
              />
            </div>

            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                Discord
              </span>
              <input
                type="text"
                value={userGeneralData?.discord}
                className="form-control"
                onChange={(e) =>
                  setUserGeneralData({
                    ...userGeneralData,
                    discord: e.target.value,
                  })
                }
              />
            </div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                LinkedIn
              </span>
              <input
                type="text"
                value={userGeneralData?.linkedIn}
                className="form-control"
                onChange={(e) =>
                  setUserGeneralData({
                    ...userGeneralData,
                    linkedIn: e.target.value,
                  })
                }
              />
            </div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                GitHub
              </span>
              <input
                type="text"
                value={userGeneralData?.github}
                className="form-control"
                onChange={(e) =>
                  setUserGeneralData({
                    ...userGeneralData,
                    github: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </Card.Body>
        <Card.Body className="biography">
          <div className="fillForms">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                Mi Biografía
              </span>
              <textarea
                value={userGeneralData?.biography}
                className="form-control"
                onChange={(e) =>
                  setUserGeneralData({
                    ...userGeneralData,
                    biography: e.target.value,
                  })
                }
              ></textarea>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProfilePage;
