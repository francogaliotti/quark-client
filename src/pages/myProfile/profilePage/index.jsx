import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../../styles/styledComponents/Buttons";
import { login, selectUser } from "../../../features/userSlice";
import "../../../styles/ProfilePage.css";
import { Countries } from "../../../jsons/countries";
import Cookies from "universal-cookie";
import {
  getPublic,
  postPublic,
  putPrivate,
  putPublic,
} from "../../../services/apiService";
import Alert from "../../../services/alertService";

function ProfilePage() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const refCV = useRef(null);
  const refImg = useRef(null);
  const dispatch = useDispatch();
  const cookies = new Cookies();

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
      //email: user?.moodleUserData.email,
      city: user?.moodleUserData.city,
      phone: user?.moodleUserData.phone,
      country: user?.moodleUserData.country,
      discord: user?.userBasicDatum.discord,
      linkedIn: user?.userBasicDatum.linkedIn,
      idnumber: user?.moodleUserData.idnumber,
    });
  }, [user]);

  const handleProfileImg = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userid", user.id);
      const res = await postPublic(`/userImg/upload`, formData);
      console.log(res);
      Alert.success({ title: "Actualizado!", message: "Imagen actualizada" });
      await updateData();
    } catch (e) {
      console.log(e);
      Alert.error({ title: "Error!", message: e.response.data.msg });
    }
  };

  const updateData = async () => {
    const moodleData = await getPublic(
      `/user/getMoodleData/${user.moodleUserData.username}`
    );
    const profInfo = await getPublic(`/user/${user.moodleUserData.id}`);
    dispatch(
      login({
        ...moodleData.data,
        ...profInfo.data,
      })
    );
  };

  return (
    <div className="profilePageContainer">
      <div className="leftContainer">
        <div className="basicInfo">
          <img src={user?.userBasicDatum.imgUrl} />
          <div className="names">
            <h2>{user?.moodleUserData.username}</h2>
            <h2>{user?.moodleUserData.email}</h2>
          </div>
          <PrimaryButton onClick={() => refImg.current.click()}>
            Cambiar Imagen
          </PrimaryButton>
          <h2 className="name">{user?.username}</h2>
          <input
            ref={refImg}
            type="file"
            id="getFile"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => handleProfileImg(e.target.files[0])}
          />
        </div>
        {/*<div className="descriptionContainer">
                    <h3>Añade tu CV</h3>
                    <PrimaryButton onClick={() => refCV.current.click()}>Añadir CV</PrimaryButton>
                    <input ref={refCV} type='file' accept='.pdf' id="getFile" />
    </div>*/}
      </div>
      <div className="rightContainer">
        <div className="aboutContainer">
          <h3>Sobre mí</h3>
          <div className="fillForms">
            <div className="fillForm">
              <label>Nick Name</label>
              <input
                type="text"
                value={userGeneralData?.nickname}
                onChange={(e) =>
                  setUserGeneralData({
                    ...userGeneralData,
                    nickname: e.target.value,
                  })
                }
              />
            </div>
            <div className="fillForm">
              <label>Nombre</label>
              <input
                type="text"
                value={userGeneralData?.firstname}
                onChange={(event) =>
                  setUserGeneralData({
                    ...userGeneralData,
                    firstname: event.target.value,
                  })
                }
              />
            </div>
            <div className="fillForm">
              <label>Apellido</label>
              <input
                type="text"
                value={userGeneralData?.lastname}
                onChange={(event) =>
                  setUserGeneralData({
                    ...userGeneralData,
                    lastname: event.target.value,
                  })
                }
              />
            </div>
            {/*<div className="fillForm">
                            <label>Email</label>
                            <input type="text" value={userGeneralData?.email} onChange={(event) => setUserGeneralData({ ...userGeneralData, email: event.target.value })} />
</div>*/}
            <div className="fillForm">
              <label>Fecha de Nacimiento</label>
              <input
                type="date"
                value={userGeneralData?.birthdate}
                onChange={(e) =>
                  setUserGeneralData({
                    ...userGeneralData,
                    birthdate: e.target.value,
                  })
                }
              />
            </div>
            <div className="fillForm">
              <label>DNI/Pasaporte</label>
              <input
                type="text"
                value={userGeneralData?.idnumber}
                onChange={(event) =>
                  setUserGeneralData({
                    ...userGeneralData,
                    idnumber: event.target.value,
                  })
                }
              />
            </div>
            <div className="fillForm">
              <label>Telefono</label>
              <input
                type="text"
                value={userGeneralData?.phone}
                onChange={(event) =>
                  setUserGeneralData({
                    ...userGeneralData,
                    phone: event.target.value,
                  })
                }
              />
            </div>
            <div className="fillForm">
              <label>Pais</label>
              <select
                name=""
                id=""
                value={userGeneralData?.country}
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
            <div className="fillForm">
              <label>Ciudad</label>
              <input
                type="text"
                value={userGeneralData?.city}
                onChange={(event) =>
                  setUserGeneralData({
                    ...userGeneralData,
                    city: event.target.value,
                  })
                }
              />
            </div>
            <div className="fillForm">
              <label>Perfil de LinkedIn</label>
              <input
                type="text"
                value={userGeneralData?.linkedIn}
                onChange={(e) =>
                  setUserGeneralData({
                    ...userGeneralData,
                    linkedIn: e.target.value,
                  })
                }
              />
            </div>
            <div className="fillForm">
              <label>Usuario de Discord</label>
              <input
                type="text"
                value={userGeneralData?.discord}
                onChange={(e) =>
                  setUserGeneralData({
                    ...userGeneralData,
                    discord: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
{       /* <div className="aboutContainer">
          <h3>Informacion adicional</h3>
          <div className="moreInfoContainer">
            <div className="infoQuestion">
              <label>¿Sabes programar?</label>
              <select name="" id="">
                <option value="0">No</option>
                <option value="1">Si</option>
              </select>
            </div>
            <div className="infoQuestion">
              <label>
                ¿Estás de acuerdo con compartir tu información para que te
                contactemos con ofertas de inglés para programadores?
              </label>
              <select name="" id="">
                <option value="0">No</option>
                <option value="1">Si</option>
              </select>
            </div>
            <div className="infoQuestion">
              <label>
                ¿Cuántas horas semanales podrías dedicarle al cursado?
              </label>
              <select name="" id="">
                <option value="5">5 hs</option>
                <option value="10">10 hs</option>
                <option value="15">15 hs</option>
                <option value="20">20 hs</option>
                <option value="25">25 hs</option>
              </select>
            </div>
            <div className="infoQuestion">
              <label>¿Tienes interés en recibir ofertas laborales?</label>
              <select name="" id="">
                <option value="0">No</option>
                <option value="1">Si</option>
              </select>
            </div>
            <div className="infoQuestion">
              <label>¿Tienes interés en recibir ofertas laborales?</label>
              <select name="" id="">
                <option value="0">No</option>
                <option value="1">Si</option>
              </select>
            </div>
          </div>
        </div>*/}
        <div className="descriptionContainer">
          <h3>Mi Biografía</h3>
          <textarea
            value={userGeneralData?.biography}
            onChange={(e) =>
              setUserGeneralData({
                ...userGeneralData,
                biography: e.target.value,
              })
            }
          ></textarea>
        </div>

        <PrimaryButton onClick={() => handleProfileChange()}>
          Guardar
        </PrimaryButton>
      </div>
    </div>
  );
}

export default ProfilePage;
