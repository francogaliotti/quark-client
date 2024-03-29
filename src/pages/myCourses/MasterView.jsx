import React, { useEffect, useRef, useState } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import MasterViewCard from "./MasterViewCard";
import { postPrivate } from "../../services/apiService";

const MasterView = () => {
  let refUnity = useRef(null);
  let refUnreal = useRef(null);
  const user = useSelector(selectUser);

  const [carrer, setCarrer] = useState(true);
  const [purchased, setPurchase] = useState(false);

  const [inicialUnity, setInicialUnity] = useState(null);
  const [intermedioUnity, setIntermedioUnity] = useState(null);
  const [avanzadoUnity, setAvanzadoUnity] = useState(null);

  const [pinicialUnity, setpInicialUnity] = useState(null);
  const [pintermedioUnity, setpIntermedioUnity] = useState(null);
  const [pavanzadoUnity, setpAvanzadoUnity] = useState(null);

  const [inicialUnreal, setInicialUnreal] = useState(null);
  const [intermedioUnreal, setIntermedioUnreal] = useState(null);
  const [avanzadoUnreal, setAvanzadoUnreal] = useState(null);

  const [pinicialUnreal, setpInicialUnreal] = useState(null);
  const [pintermedioUnreal, setpIntermedioUnreal] = useState(null);
  const [pavanzadoUnreal, setpAvanzadoUnreal] = useState(null);

  async function fetchCourses() {

    try {
      var data = await postPrivate("/courses/getCoursesLists", {
        listaCursos: user.moodleUserData.listaCurso,
      })

      setInicialUnity(data.data.rta.unityInicial);
      setIntermedioUnity(data.data.rta.unityIntermedio);
      setAvanzadoUnity(data.data.rta.unityAvanzado);

      setInicialUnreal(data.data.rta.unrealInicial);
      setIntermedioUnreal(data.data.rta.unrealIntermedio);
      setAvanzadoUnreal(data.data.rta.unrealAvanzado);

      setpInicialUnity(data.data.rta.punityInicial);
      setpIntermedioUnity(data.data.rta.punityIntermedio);
      setpAvanzadoUnity(data.data.rta.punityAvanzado);

      setpInicialUnreal(data.data.rta.punrealInicial);
      setpIntermedioUnreal(data.data.rta.punrealIntermedio);
      setpAvanzadoUnreal(data.data.rta.punrealAvanzado);

      
      if (user.professionalprofile.career == 0) {
        setCarrer(false);
        refUnity.current.id = "";
        refUnreal.current.id = "presed";
      } else {
        setCarrer(true);
        refUnity.current.id = "presed";
        refUnreal.current.id = "";
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="container">
      <h1 className="titular-quark">
        Mi Aprendizaje
        {/* <a className="link-titular-quark" href="#">
          @ejemplo
        </a> */}
      </h1>
      <h4 className="subtitular-quark">
        Estos son los cursos disponibles
      </h4>
      <hr className="hr-quark" />
      <div className="myProfileButtons mb-3">
        <ButtonGroup>
          <Button
            ref={refUnity}
            onClick={() => {
              setCarrer(true);

              refUnity.current.id = "presed";
              refUnreal.current.id = "";
            }}
            id="presed"
            className="profileButton"
          >
            Carrera Unreal
          </Button>
          <Button
            ref={refUnreal}
            onClick={() => {
              setCarrer(false);

              refUnity.current.id = "";
              refUnreal.current.id = "presed";
            }}
            // className="profileButton"
          >
            Carrera Unity
          </Button>
        </ButtonGroup>
      </div>

      {carrer && (
        <>
          <div className="row level-initial">
            <h3>Unreal Engine</h3>
          </div>
          <div className="row level-initial">
            {inicialUnreal != null ? (
              <MasterViewCard
                purchased={pinicialUnreal}
                courseData={inicialUnreal}
                level={"Nivel Inicial"}
              ></MasterViewCard>
            ) : (
              ""
            )}
          </div>

          <div className="row level-initial">
            {intermedioUnreal != null ? (
              <MasterViewCard
                purchased={pintermedioUnreal}
                courseData={intermedioUnreal}
                level={"Nivel Intermedio"}
              ></MasterViewCard>
            ) : (
              ""
            )}
          </div>

          <div className="row level-initial ">
            {intermedioUnreal != null ? (
              <MasterViewCard
                purchased={pavanzadoUnreal}
                courseData={avanzadoUnreal}
                level={"Nivel Avanzado"}
              ></MasterViewCard>
            ) : (
              ""
            )}
          </div>
        </>
      )}

      {!carrer && (
        <>
          <div className="row level-initial">
            <h3>Unity</h3>
          </div>
          <div className="row level-initial">
            {inicialUnity != null ? (
              <MasterViewCard
                purchased={pinicialUnity}
                courseData={inicialUnity}
                level={"Nivel Inicial"}
              ></MasterViewCard>
            ) : (
              ""
            )}
          </div>

          <div className="row level-initial">
            {intermedioUnity != null ? (
              <MasterViewCard
                purchased={pintermedioUnity}
                courseData={intermedioUnity}
                level={"Nivel Intermedio"}
              ></MasterViewCard>
            ) : (
              ""
            )}
          </div>

          <div className="row level-initial">
            {intermedioUnreal != null ? (
              <MasterViewCard
                purchased={pavanzadoUnity}
                courseData={avanzadoUnity}
                level={"Nivel Avanzado"}
              ></MasterViewCard>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MasterView;
