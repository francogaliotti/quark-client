import React, { useRef, useState } from "react";
import ProfesionalProfile from "./profesionalProfile";
import ProfilePage from "./profilePage";
import "../../styles/ProfilePage.css";

export const MyProfile = () => {
  const [profileOpen, isProfileOpen] = useState(true);
  const [profesionalProfileOpen, isProfesionalProfileOpen] = useState(false);
  const refProfile = useRef(null);
  const refProfesional = useRef(null);

  return (
    <div className="myProfileContainer">
      <div className="myProfileButtons">
        <button
            ref={refProfile}
          onClick={() => {
            isProfileOpen(true);
            isProfesionalProfileOpen(false);
            refProfesional.current.id = ""
            refProfile.current.id = "presed"
          }}
          id="presed"
          className="profileButton"
        >
          Mi Perfil
        </button>
        <button
        ref={refProfesional}
          onClick={() => {
            isProfileOpen(false);
            isProfesionalProfileOpen(true);
            refProfesional.current.id = "presed"
            refProfile.current.id = ""
          }}
          className="profileButton"
        >
          Perfil Profesional
        </button>
      </div>
      {profileOpen && <ProfilePage/>}
      {profesionalProfileOpen && <ProfesionalProfile/>}
    </div>
  );
};
