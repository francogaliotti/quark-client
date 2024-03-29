import React, { useRef, useState } from "react";
import { Col, Row, Button, Card, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ProfProgressBar from "../../components/profProgressBar";
import { login, selectUser } from "../../features/userSlice";
import Alert from "../../services/alertService";
import { getPublic } from "../../services/apiService";
import ProfesionalProfile from "./profesionalProfile";
import ProfilePage from "./profilePage";
import { ImgModal } from "./imgModal";
//import "../../styles/ProfilePage.css";

export const MyProfile = () => {
  const user = useSelector(selectUser);
  const refImg = useRef(null);
  const dispatch = useDispatch();

  const [profileOpen, isProfileOpen] = useState(true);
  const [profesionalProfileOpen, isProfesionalProfileOpen] = useState(false);
  const [openImgModal, setOpenImgModal] = useState(false);
  const [currentImg, setCurrentImg] = useState("");
  const refProfile = useRef(null);
  const refProfesional = useRef(null);

  const handleProfileImg = async (file) => {
    console.log(file);
      setOpenImgModal(true)
      setCurrentImg(file)
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
    <Row className="my-profile-container">
      <Col md={3} className="left-container">
        <Card className="card card-quark" id="cardPerfil">
          <Card.Body>
            <Card.Img
              src={user?.userBasicDatum.imgUrl}
              onClick={() => refImg.current.click()}
              style={{ cursor: "pointer", borderRadius:"50%" }}
  />
            <input
              ref={refImg}
              type="file"
              id="getFile"
              style={{ display: "none" }}
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => handleProfileImg(e.target.files[0])}
            />
            {openImgModal && 
            <ImgModal show={openImgModal} onClose={()=>setOpenImgModal(false)} img={currentImg} updateData={updateData} user={user}/>
            }
            <ProfProgressBar type="normal" />
            <ProfProgressBar type="profesional" />
          </Card.Body>
        </Card>
      </Col>
      <Col md={9} className="rightContainer">
        <div className="myProfileButtons">
          <ButtonGroup>
            <Button
              ref={refProfile}
              onClick={() => {
                isProfileOpen(true);
                isProfesionalProfileOpen(false);
                refProfesional.current.id = "";
                refProfile.current.id = "presed";
              }}
              id="presed"
              className="profileButton"
            >
              Mi Perfil
            </Button>
            <Button
              ref={refProfesional}
              onClick={() => {
                isProfileOpen(false);
                isProfesionalProfileOpen(true);
                refProfesional.current.id = "presed";
                refProfile.current.id = "";
              }}
              className="profileButton"
            >
              Perfil Profesional
            </Button>
          </ButtonGroup>
        </div>
        {profileOpen && <ProfilePage updateData={updateData} />}
        {profesionalProfileOpen && <ProfesionalProfile />}
      </Col>
    </Row>
  );
};
