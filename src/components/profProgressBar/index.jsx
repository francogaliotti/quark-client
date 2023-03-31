import { Card, ProgressBar } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
//import '../../styles/ProgressBar.css'

function ProfProgressBar(props) {
  const user = useSelector(selectUser);
  const [porcentaje, setPorcentaje] = useState(0);

  const handlePorcentajeProfile = (type) => {
    let counter = 0;
    if (type) {
      if (user?.academicActivities.length != 0) {
        counter += 25;
      }
      if (user?.laborActivities.length != 0) {
        counter += 25;
      }
      if (user?.independentActivities.length != 0) {
        counter += 25;
      }
      if (user?.languages?.length != 0) {
        counter += 25;
      }
    } else {
      if (user?.userBasicDatum.biography?.length != 0) {
        counter += 10;
      }
      if (user?.userBasicDatum.birthdate?.length != (0 || undefined)) {
        counter += 10;
      }
      if (user?.moodleUserData.country?.length != 0) {
        counter += 10;
      }
      if (user?.moodleUserData.city?.length != 0) {
        counter += 10;
      }
      if (user?.moodleUserData.phone?.length != 0) {
        counter += 10;
      }
      if (user?.userBasicDatum.imgUrl?.length != 0) {
        counter += 10;
      }
      if (user?.userBasicDatum.linkedIn?.length != 0) {
        counter += 10;
      }
      if (user?.userBasicDatum.github?.length != 0) {
        counter += 10;
      }
      if (user?.userBasicDatum.discord?.length != 0) {
        counter += 10;
      }
      if (user?.userBasicDatum.gender?.length != 0) {
        counter += 10;
      }
    }
    setPorcentaje(counter);
  };

  useEffect(() => {
    if (props.type == "profesional") {
      handlePorcentajeProfile(1);
    } else {
      handlePorcentajeProfile(0);
    }
  }, [user]);

  return (
    <div className="progress-bar-container">
      <Card className="card-quark">
        <Card.Header>
          <p className="card-text quark-code-text">
            Perfil
            {props.type == "profesional" ? <>Profesional</> : <>General</>} //{" "}
            {Math.round(porcentaje)}%
          </p>
        </Card.Header>
        <Card.Body>
          <ProgressBar className="progress-bar-quark" now={porcentaje} />
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProfProgressBar;
