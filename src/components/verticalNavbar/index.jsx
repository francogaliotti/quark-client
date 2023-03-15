import React, { useState } from "react";
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
  faVirus
} from "@fortawesome/free-solid-svg-icons";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

function VerticalNavbar() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

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
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
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
            <FontAwesomeIcon icon={faVirus} className="d-inline" />
          </NavIcon>
          <NavText>Game Jams</NavText>
        </NavItem>
        <NavItem eventKey="offer">
          <NavIcon>
            <FontAwesomeIcon icon={faTag} className="d-inline" />
          </NavIcon>
          <NavText>Oferta</NavText>
        </NavItem>
        <NavItem eventKey="scholarships">
          <NavIcon>
            <FontAwesomeIcon icon={faGraduationCap} className="d-inline" />
          </NavIcon>
          <NavText>Becas</NavText>
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
            <NavItem eventKey="config/scholarships">
              <NavText>Becas</NavText>
            </NavItem>
            <NavItem eventKey="config/adminMoodle">
              <NavText>Moodle</NavText>
            </NavItem>
          </NavItem>
        )}
        <NavItem eventKey="logout">
          <NavIcon>
            <FontAwesomeIcon
              icon={faSignOut}
              className="d-inline"
            />
          </NavIcon>
          <NavText>LogOut</NavText>
        </NavItem>
      </SideNav.Nav>

      {/*<Navbar bg="light" variant="light" className={`flex-column sidebar ${expanded ? "expanded" : ""}`} onMouseEnter={toggleExpand} onMouseLeave={toggleExpand}>
  <Nav className="flex-column">
    <Nav.Item>
      <Nav.Link href="/" className="d-flex justify-content-start align-items-center">
        <FontAwesomeIcon icon={faHome} className="d-inline" />
        <span className={`pl-2 ${expanded ? "" : "d-none"}`}>Home</span>
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/profile" className="d-flex justify-content-start align-items-center">
        <FontAwesomeIcon icon={faUser} className="d-inline" />
        <span className={`pl-2 ${expanded ? "" : "d-none"}`}>Profile</span>
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/settings" className="d-flex justify-content-start align-items-center">
        <FontAwesomeIcon icon={faCog} className="d-inline" />
        <span className={`pl-2 ${expanded ? "" : "d-none"}`}>Settings</span>
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/logout" className="d-flex justify-content-start align-items-center">
        <FontAwesomeIcon icon={faSignOut} className="d-inline" />
        <span className={`pl-2 ${expanded ? "" : "d-none"}`}>Logout</span>
      </Nav.Link>
    </Nav.Item>
  </Nav>

      <div className="verticalNavbarContainer">
            <ul className='verticalList'>
                <li><a onClick={() => navigate('/')}>Inicio</a></li>
                <li><a onClick={() => navigate('/profile')}>Mi Perfil</a></li>
                <li><a onClick={() => navigate('/myCourses')}>Mi Aprendizaje</a></li>
                <li><a onClick={() => navigate('/events')}>Eventos</a></li>
                <li><a onClick={() => navigate('/offer')}>Oferta</a></li>
                <li><a onClick={() => navigate('/scholarships')}>Becas</a></li>
                user?.professionalprofile.role == 1 &&
                    <li><a onClick={() => navigate('/config')}>Administración del Sitio</a></li>
                
            </ul>
            </div>
    </Navbar>*/}
    </SideNav>
  );
}

export default VerticalNavbar;
