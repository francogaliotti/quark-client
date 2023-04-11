import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { login, selectUser } from "../../features/userSlice";
import { PrimaryButton } from "../../styles/styledComponents/Buttons";
import { PrimaryInput } from "../../styles/styledComponents/Inputs";
//import '../../styles/Login.css'
import Cookies from "universal-cookie";
import { getPublic, postPublic } from "../../services/apiService";
import Alert from "../../services/alertService";
import env from "react-dotenv";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import QuarkLogo from "../../images/Group 6.png";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ref = useRef(null);
  const cookieRef = useRef(null);
  const params = useParams();
  const user = useSelector(selectUser);
  const cookies = new Cookies();
  let moodleData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        cookieRef.current.src = `http://${env.SERVER_URL}/login/`;
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
          <Col md={4} >
            <Form
              ref={ref}
              action={`http://${env.MOODLE_URL}/login/index.php`}
              onSubmit={(e) => handleSubmit(e)}
              method="post"
              id="login"
              className="d-flex justify-content-center flex-column"
            >
              <img src={QuarkLogo} className="w-70 mx-auto mb-5" />
              <input
                type="hidden"
                name="logintoken"
                value="UfICO3IsgLmxSY7yVaN1lo4pa8O3irlV"
              />
              <Form.Group
                controlId="formBasicEmail"
                id="yui_3_17_2_1_1669123034452_20"
              >
                <Form.Control
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
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Contraseña"
                  autoComplete="current-password"
                  className="mt-1"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </Form.Group>
              <div className="mt-1 loginBtns mx-auto">
                <Button
                  className="btn btn-outline-primary btn-quark"
                  id="loginbtn"
                  onClick="this.form.target='moodleframe'"
                  type="submit"
                >
                  Acceder
                </Button>
                <Button
                  variant="secondary"
                  id="lostPassBtn"
                  className="mx-1 btn btn-outline-primary btn-quark"
                  href={`http://${env.MOODLE_URL}/login/forgot_password.php`}
                >
                  Recuperar Contraseña
                </Button>
              </div>

              <div style={{display: "none"}} className="mt-5 notRegister mx-auto">
                <h6 className="subtitular-quark">
                  ¿Todavía no tienes cuenta en Quark?
                </h6>

                <Button
                  className="btn btn-outline-primary btn-quark"
                  onClick={() => navigate("/registerDev")}
                >
                  Registrarme ahora
                </Button>
              </div>
              <iframe
                id="inlineFrameExample"
                style={{ display: "none" }}
                title="Inline Frame Example"
                width="600"
                height="400"
                src={`http://${env.MOODLE_URL}/my/`}
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
