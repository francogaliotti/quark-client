import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { login, selectUser } from "../../features/userSlice";
import { PrimaryButton } from "../../styles/styledComponents/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrimaryInput } from "../../styles/styledComponents/Inputs";
//import '../../styles/Login.css'
import Cookies from "universal-cookie";
import { getPublic, postPublic } from "../../services/apiService";
import Alert from "../../services/alertService";
import env from "react-dotenv";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import QuarkLogo from "../../images/Group 6.png";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const ref = useRef(null);
  const cookieRef = useRef(null);
  const params = useParams();
  const user = useSelector(selectUser);
  const cookies = new Cookies();
  let moodleData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (user) navigate("/home");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getMoodleData();
    await setSesskeyNull();
    await handleMoodleIFrame();
    await goHome();
  };

  const setSesskeyNull = async () => {
    const res = await postPublic(`/sesskey/`, {
      id: moodleData.moodleUserData.id,
      sesskey: null,
    });
  };

  const handleMoodleIFrame = async () => {
    var form = document.getElementById("login");
    form.target = "moodleframe";
    const res = await form.submit();
  };

  const getMoodleData = async () => {
    try {
      console.log(env.SERVER_URL);
      const res = await getPublic(`user/getMoodleData/${email}`);
      moodleData = res.data;
    } catch (e) {
      console.log(e);
      Alert.error({
        title: "Usuario no encontrado",
        message: "Intenta de nuevo",
      });
    }
  };

  const goHome = async () => {
    setTimeout(async () => {
      try {
        /*const loginResponse = await axios.get(`http://localhost:3030/login`,
                    //{ withCredentials: "include" }
                    )*/
        console.log(`${env.SERVER_URL}/login`);
        cookieRef.current.src = `${env.SERVER_URL}/login/`;
        const profInfo = await getPublic(
          `/user/${moodleData.moodleUserData.id}`
        );

        try {
          const res = await getPublic(
            `/sesskey/${moodleData.moodleUserData.id}`
          );
          console.log(res);
          if (res.data.sesskey === null) {
            cookies.remove("QuarkSession");
            throw "Contraseña incorrecta";
          }
          //cookieRef.current.src = `http://34.71.113.200:3030/login`
          dispatch(
            login({
              ...moodleData,
              ...profInfo.data,
              sesskey: res.data.sesskey,
              //token: loginResponse.data.token,
              LoggedIn: true,
            })
          );
          navigate("/home");
        } catch (e) {
          console.log(e);
          Alert.error({ title: e, message: "Intenta de nuevo" });
        }
      } catch (e) {
        console.log(e);
        Alert.error({
          title: "Usuario incorrecto",
          message: "Intenta de nuevo",
        });
      }
    }, 2000);
  };

  return (
    <div className="loginPageContainer">
      <Container fluid>
        <Row className="justify-content-center">
          <Col md={4}>
            <Form
              ref={ref}
              action={`${env.MOODLE_URL}/login/index.php`}
              onSubmit={(e) => handleSubmit(e)}
              method="post"
              id="login"
              className="d-flex justify-content-center flex-column"
            >
              <img src={QuarkLogo} className="w-70 mx-auto mb-5" />
              <input
                type="hidden"
                name="logintoken"
                value="hMscoB9Q7dngy9UonXuhIRK8u6iS3bGv"
              />
              <Form.Group
                controlId="formBasicEmail"
                id="yui_3_17_2_1_1669123034452_20"
              >
                <Form.Control
                  className="mb-2"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Email"
                  autoComplete="username"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group
                controlId="formBasicPassword"
                className="row"
              >
                <div className="col-10 mt-1 ">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Contraseña"
                  autoComplete="current-password"
                  className="password-input-field"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                </div>

                <div className="eye d-flex justify-content-center align-items-center col-2">
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="d-inline"
                  style={{cursor: "pointer", color: "#588CAF"}}
                  onClick={(e) => {
                    
                    e.preventDefault();
                    toggleShowPassword();
                  }}
                />
                </div>
                {/* <button
                  className="btn-quark"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleShowPassword();
                  }}
                >
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} className="d-inline" />
                  ) : (
                    <FontAwesomeIcon icon={faEye} className="d-inline" />
                  )}
                  </button> */}
              </Form.Group>
              <div className="mt-3 loginBtns mx-auto d-flex w-100 justify-content-around ">
                <Button
                  className="btn btn-outline-primary btn-quark w-50"
                  id="loginbtn"
                  onClick="this.form.target='moodleframe'"
                  type="submit"
                >
                  Acceder
                </Button>
                <Button
                  variant="secondary"
                  id="lostPassBtn"
                  className="mx-1 btn btn-outline-primary btn-quark w-50"
                  onClick={() =>
                    Alert.info({ title: "No disponible en la beta" })
                  }
                  //href={`http://${env.MOODLE_URL}/login/forgot_password.php`}
                >
                  Recuperar Contraseña
                </Button>
              </div>

              <div className="mt-5 notRegister mx-auto">
                <h6 className="subtitular-quark">
                  ¿Todavía no tienes cuenta en Quark?
                </h6>

                <Button
                  className="btn btn-outline-primary btn-quark"
                  //onClick={() => navigate("/registerDev")}
                  onClick={() =>
                    Alert.info({ title: "No disponible en la beta" })
                  }
                >
                  Registrarme ahora
                </Button>
              </div>
              <iframe
                id="inlineFrameExample"
                // style={{ display: "none" }}
                title="Inline Frame Example"
                width="600"
                height="400"
                src={`${env.MOODLE_URL}/my/`}
                sandbox="allow-forms allow-scripts"
                name="moodleframe"
              ></iframe>
              <iframe
                id="inlineFrameExample"
                style={{ display: "none" }}
                title="cookieFrame"
                width="600"
                height="1000"
                ref={cookieRef}
                src=""
                name="cookieFrame"
              ></iframe>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginForm;
