import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/loginForm";
import { login, selectUser } from "./features/userSlice";
import "./App.css";
import Navbar from "./components/navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PublicRoutes from "./routes/PublicRoutes";
import VerticalNavbar from "./components/verticalNavbar";
import axios from "axios";
import Cookies from "universal-cookie";
import env from "react-dotenv";
import { getPublic } from "./services/apiService";
import { LoadingModal } from "./components/loadingModal";

function App() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const contentContainer = useRef(null);

  const [loading, setLoading] = useState(true);
  const [colapsed, setColapsed] = useState(false);
  const [colapseDisabled, setColapseDisabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (cookies.get("QuarkSession")) {
        console.log("asd");
        const username = cookies.get("username");
        const res = await getPublic(`/user/getMoodleData/${username}`);
        const user = res.data;
        const profInfo = await getPublic(`/user/${user.moodleUserData.id}`);
        dispatch(
          login({
            ...user,
            ...profInfo.data,
            token: sessionStorage.getItem("token"),
            sesskey: sessionStorage.getItem("sesskey"),
            LoggedIn: true,
          })
        );
        setLoading(false);
      } else {
        navigate("/login");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!colapseDisabled) { //Desabilita el colapse cuando está en un curso
      if (colapsed) {
        contentContainer.current.id = "colapsed";
      } else {
        if (contentContainer.current) {
          contentContainer.current.id = "toggled";
        }
      }
    }
  }, [colapsed]);

  if (loading) {
    return (
      <div className="app-container">
        <div className="content-container">
          <LoadingModal />
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {cookies.get("QuarkSession") && (
        <>
          <VerticalNavbar setColapsed={() => setColapsed(!colapsed)} colapsed={colapsed} />
        </>
      )}
      <div className="content-container" id="toggled" ref={contentContainer}>
        <PublicRoutes setColapseDisabled={setColapseDisabled} />
      </div>
    </div>
  );
}

export default App;
