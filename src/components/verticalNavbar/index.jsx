import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { logout, selectUser } from "../../features/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCog,
  faSignOut,
  faUser,
  faCode,
  faCalendar,
  faTag,
  faGraduationCap,
  faVirus,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import quarkLogo from "../../images/Vector.png";
import quarkLogoExtendido from "../../images/Vector-extendido.png";

function VerticalNavbar({ setColapsed, colapsed }) {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [logoutItemId, setLogoutItemId] = useState("");

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (colapsed) {
      setLogoutItemId("nav-toggled");
    } else {
      setLogoutItemId("nav-colapsed");
    }
  }, [colapsed]);

  return (
    <SideNav
      onSelect={(selected) => {
        if (selected !== "logout") {
          navigate("/" + selected);
        } else {
          handleLogout();
        }
      }}
      style={{ position: "fixed" }}
      id="quark-side-nav"
      onToggle={() => setColapsed()}
    >
      {colapsed ? (
        <img src={quarkLogoExtendido} className="quark-side-logo" />
      ) : (
        <img src={quarkLogo} className="quark-side-logo" />
      )}

      <SideNav.Toggle className="nav-toggle" />
      <SideNav.Nav defaultSelected="home" className="nav-items">
        <NavItem eventKey="home">
          <NavIcon>
            <FontAwesomeIcon icon={faHome} className="d-inline" />
          </NavIcon>
          <NavText>Inicio</NavText>
        </NavItem>
        <NavItem eventKey="profile">
          <NavIcon>
            <FontAwesomeIcon icon={faUser} className="d-inline" />
          </NavIcon>
          <NavText>Perfil</NavText>
        </NavItem>
        <NavItem eventKey="myCourses">
          <NavIcon>
            <FontAwesomeIcon icon={faCode} className="d-inline" />
          </NavIcon>
          <NavText>Mis cursos</NavText>
        </NavItem>
        <NavItem eventKey="events">
          <NavIcon>
            <FontAwesomeIcon icon={faCalendar} className="d-inline" />
          </NavIcon>
          <NavText>Eventos</NavText>
        </NavItem>
        <NavItem eventKey="gameJam">
          <NavIcon>
            <FontAwesomeIcon icon={faGamepad} className="d-inline" />
          </NavIcon>
          <NavText>Game Jams</NavText>
        </NavItem>
        {user?.professionalprofile.role == 1 && (
          <NavItem eventKey="config">
            <NavIcon>
              <FontAwesomeIcon icon={faCog} className="d-inline" />
            </NavIcon>
            <NavText>Configuración</NavText>
            <NavItem eventKey="config/events">
              <NavText>Eventos</NavText>
            </NavItem>
            <NavItem eventKey="config/news">
              <NavText>Novedades</NavText>
            </NavItem>
            {/*<NavItem eventKey="config/scholarships">
              <NavText>Becas</NavText>
        </NavItem>*/}
            <NavItem eventKey="config/adminMoodle">
              <NavText>Moodle</NavText>
            </NavItem>
          </NavItem>
        )}
        <NavItem eventKey="logout" className="nav-logout" id={logoutItemId}>
          <NavIcon>
            <FontAwesomeIcon icon={faSignOut} className="d-inline" />
          </NavIcon>
          <NavText>LogOut</NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
}

export default VerticalNavbar;
