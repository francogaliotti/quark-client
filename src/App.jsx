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
        const username = cookies.get("username");
        const res = await getPublic(`/user/getMoodleData/${username}`);
        const profInfo = await getPublic(
          `/user/${res?.data.moodleUserData.id}`
        );
        dispatch(
          login({
            ...res.data,
            ...profInfo.data,
          })
        );
        setLoading(false);
      } else {
        navigate("/login");
        setLoading(false);
      }
    };
    fetchData();
    // const unlogged = cookies.get("unlogged");
    // if (unlogged == "false") {
    //   fetchData();
    // } else {
    //   navigate("/login");
    //     setLoading(false);
    // }
  }, []);

  useEffect(() => {
    if (!colapseDisabled) {
      //Desabilita el colapse cuando está en un curso
      if (colapsed) {
        contentContainer.current.id = "colapsed";
      } else {
        if (contentContainer.current) {
          contentContainer.current.id = "toggled";
        }
      }
    } else {
      contentContainer.current.id = "expanded";
    }
  }, [colapsed, colapseDisabled]);

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
          <VerticalNavbar
            setColapsed={() => setColapsed(!colapsed)}
            colapsed={colapsed}
          />
        </>
      )}
      <div className="content-container" id="toggled" ref={contentContainer}>
        <PublicRoutes setColapseDisabled={setColapseDisabled} />
      </div>
    </div>
  );
}

export default App;
