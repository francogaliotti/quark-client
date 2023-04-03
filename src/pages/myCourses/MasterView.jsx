import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import MasterViewCard from "./MasterViewCard";
import env from "react-dotenv";

const MasterView = () => {
  const refUnity = useRef(null);
  const refUnreal = useRef(null);
  const user = useSelector(selectUser);
  var tieneInicialUnity
  var tieneIntermedioUnity
  var tieneAvanzadoUnity
  var tieneInicialUnreal
  var tieneIntermedioUnreal
  var tieneAvanzadoUnreal
  


  const [carrer, setCarrer] = useState(true);
  const [purchased, setPurchase] = useState(false)


  const [inicialUnity, setInicialUnity] = useState(null);
  const [intermedioUnity, setIntermedioUnity] = useState(null);
  const [avanzadoUnity, setAvanzadoUnity] = useState(null)

  const [inicialUnreal, setInicialUnreal] = useState(null);
  const [intermedioUnreal, setIntermedioUnreal] = useState(null);
  const [avanzadoUnreal, setAvanzadoUnreal] = useState(null)

  const [inicialUnityAlumnol, setInicialUnityAlumno] = useState([]);
  const [intermedioUnityAlumnol, setIntermedioUnityAlumno] = useState([]);
  const [inicialUnrealAlumnol, setInicialUnrealAlumno] = useState([]);
  const [intermedioUnrealAlumnol, setIntermedioUnrealAlumno] = useState([]);

  let tieneInicial;

  async function fetchCourses() {
   
    const url = `http://${env.SERVER_URL}/courses/getCoursesLists`;
    
    try {
      var data = await axios.post(url,{
        listaCursos: user.moodleUserData.listaCurso
      });
      console.log(data.data)
      setInicialUnity(data.data.rta.unityInicial);
      setIntermedioUnity(data.data.rta.unityIntermedio);
      setAvanzadoUnity(data.data.rta.unityAvanzado)

      setInicialUnreal(data.data.rta.unrealInicial);
      setIntermedioUnreal(data.data.rta.unrealIntermedio);
      setAvanzadoUnreal(data.data.rta.unrealAvanzado)

        


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
        Este es un ejemplo de titulo general{" "}
        <a className="link-titular-quark" href="#">
          @ejemplo
        </a>
      </h1>
      <h4 className="subtitular-quark">
        Este es un ejemplo de subtitulo descriptivo para las secciones
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
            Unreal Engine
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
            Unity Engine
          </Button>
        </ButtonGroup>
      </div>

      {carrer && (
        <>
          <div className="row level-initial">
            <h3>Unreal Engine</h3>
          </div>
          <div className="row  level-initial">
            
            {inicialUnreal != null ? (()=>{
              console.log(inicialUnreal.some(course => course.purchased == true))
              return <MasterViewCard
                purchased={purchased}
                courseData={inicialUnreal}
                level={"Nivel Inicial"}
              ></MasterViewCard>
            }
            ) : (
              ""
            )}
          </div>

          <div className="row level-initial">
            {intermedioUnreal != null ? (
              <MasterViewCard
                purchased={purchased}
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
                purchased={purchased}
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
          <h3>Unity Engine</h3>
        </div>  
          <div className="row level-initial">
            {inicialUnity != null ? (
              <MasterViewCard
              purchased={purchased}
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
              purchased={purchased}
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
              purchased={purchased}
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
