
import axios from "axios";
import React, { useRef, useState } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import {useSelector}  from "react-redux";
import { selectUser } from "../../features/userSlice";
import MasterViewCard from "./MasterViewCard";


const MasterView = () => {
  const refUnity = useRef(null);
  const refUnreal = useRef(null);
  const user = useSelector(selectUser);
  

  const [carrer, setCarrer] = useState(true)

  const [inicialUnity, setInicialUnity] = useState(null);
  const [intermedioUnity, setIntermedioUnity] = useState(null);

  const [inicialUnreal, setInicialUnreal] = useState(null);
  const [intermedioUnreal, setIntermedioUnreal] = useState(null);

  const [inicialUnityAlumnol, setInicialUnityAlumno ] = useState([])
  const [intermedioUnityAlumnol, setIntermedioUnityAlumno ] = useState([])
  const [inicialUnrealAlumnol, setInicialUnrealAlumno ] = useState([])
  const [intermedioUnrealAlumnol, setIntermedioUnrealAlumno ] = useState([])
  
  let tieneInicial

  async function fetchCourses() {
    const url = "http://34.66.2.129:3030/courses/getCoursesLists";

    try {
      var data = await axios.get(url);

      setInicialUnity(data.data.rta.unityInicial);
      setIntermedioUnity(data.data.rta.unityIntermedio);

      setInicialUnreal(data.data.rta.unrealInicial);
      setIntermedioUnreal(data.data.rta.unrealIntermedio);
      
    } catch (err) {
      console.log(err.message);
    }
  }

  async function Includes(){
    user.moodleUserData.listaCurso.forEach(course => {
      tieneInicial = inicialUnity.includes(c => c.idCurso == course.idCurso)
  })
  console.log(tieneInicial)
  }

  useState(() => {
    fetchCourses();
    Includes()
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
            setCarrer(true)

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
            setCarrer(false)
            refUnity.current.id = "";
            refUnreal.current.id = "presed";
            
          }}
          // className="profileButton"
          >
          Unity Engine
          </Button>
          
        </ButtonGroup>
      </div>
      
      {carrer && <div className="row level-initial">
        
        <h3>Unreal Engine</h3>
        <div className="col-6">
          {inicialUnreal != null ? (
            <MasterViewCard
              courseData={inicialUnreal}
              level={"Nivel Inicial"}
            ></MasterViewCard>
          ) : (
            ""
          )}
        </div>

        <div className="col-6">
          {intermedioUnreal != null ? (
            <MasterViewCard
              courseData={intermedioUnreal}
              level={"Nivel Intermedio"}
            ></MasterViewCard>
          ) : (
            ""
          )}
        </div>
      </div>  }

      {!carrer && <div className="row level-initial">
        
        <h3>Unity Engine</h3>
        <div className="col-6">  
          {inicialUnity != null ? (<MasterViewCard courseData={inicialUnity} level={"Nivel Inicial"}></MasterViewCard>):("")}
        </div>
        
        <div className="col-6">  
          {intermedioUnity != null ? (<MasterViewCard courseData={intermedioUnity} level={"Nivel Intermedio"}></MasterViewCard>):("")}
        </div>
      </div> }
      
    </div>
  );
};

export default MasterView;
