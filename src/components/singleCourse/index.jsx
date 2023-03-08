import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import '../../styles/MyCourses.css'
import {
  Container,
  Row,
  Col,
  Card,
  ButtonGroup,
  Button,
  ProgressBar,
} from "react-bootstrap";

export const SingleCourse = ({ course }) => {
  const navigate = useNavigate();

  const [stats, showStats] = useState(false);

  const handleMoodleCourse = (id) => {
    navigate(`/course/${id}`);
    //window.open(env.MOODLE_URL + `course/view.php?id=${id}`, "_blank", "noopener noreferrer")
  };
  return (
    <div className="courseContainer">
      <Card>
        <Card.Img variant="top" src={course.url} alt="Imagen de la tarjeta" />
        {!stats ? (
          <>
            <Card.Title>{course.fullName}</Card.Title>

            <Card.Body>
              <Card.Footer>
                <label>@Ultima Unidad Cursada</label>
                <ButtonGroup>
                  <Button
                    variant="primary"
                    onClick={() => handleMoodleCourse(course.idCurso)}
                  >
                    Continuar cursado
                  </Button>
                  <Button variant="success" onClick={() => showStats(!stats)}>
                    stats
                  </Button>
                </ButtonGroup>
              </Card.Footer>
            </Card.Body>
          </>
        ) : (
          <Card.Body>
            <ProgressBar
              now={Math.round(course.progress)}
              label={`Avance Cursado ${course.fullName}: ${Math.round(
                course.progress
              )}%`}
            />
            <Card.Footer>
              <label>@Ultima Unidad Cursada</label>
              <ButtonGroup>
                <Button
                  variant="primary"
                  onClick={() => handleMoodleCourse(course.idCurso)}
                >
                  Continuar cursado
                </Button>
                <Button variant="outline-success" onClick={() => showStats(!stats)}>
                  stats
                </Button>
              </ButtonGroup>
            </Card.Footer>
          </Card.Body>
        )}
      </Card>
      {/*<h3 id="courseTitle">{course.fullName}</h3>
      <img src={course.url} id="courseImg" />
      <h4 id="courseDate">
        Fecha de inicio:{" "}
        <p>{new Date(course.timestarted).toLocaleDateString("en-AU")}</p>
      </h4>
      <ProgressBar
        completed={Math.round(course.progress)}
        className="wrapper"
        barContainerClassName="container"
        bgColor="rgb(24, 27, 32)"
        labelClassName="label"
        labelAlignment="center"
      />*/}
    </div>
  );
};
