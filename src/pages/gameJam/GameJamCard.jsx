import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "../../services/alertService";

const GameJamCard = (gameJam) => {
  console.log(gameJam);
  async function handleClick() {
    // console.log("Hoola");
    axios.post("http://localhost:3030/enrollGameJam", {
      'userId': "1",
      "gameJamId": "1"
    }).then(()=>{console.log("Despues de la peticion")});
    
    Alert.success({ title: "Exito!", message: "Ya estas Inscripto!" })
  }

  return (
    <div key={gameJam.gameJam.id}>
      <Row md={2} className="justify-content-center g-4">
        <Col sm={7}>
          <Card className="col-12" border="info" bg="dark">
            <Card.Img variant="top" src={gameJam.gameJam.url} />
            <Card.Body
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <h5 style={{color:"#91D3FF"}}>{gameJam.gameJam.fullName}</h5>
              <h6 style={{color:"#588CAF"}}>{gameJam.gameJam.timestarted}</h6>
              <div className="buttonContainer col-12">
                <Button
                  className="col-4"
                  style={{ marginRight: "10px" ,backgroundColor:"#0B2A3F",border:"1px solid #2390B6"}}
                  onClick={handleClick}
                >
                  Inscribirme
                </Button>
                <Button className="col-3" style={{ marginRight: "10px" ,backgroundColor:"#0B2A3F",border:"1px solid #2390B6"}}>Adicional</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={5}>
          <Card className="col-12" border="info" bg="dark">
            <Card.Header as="h5" style={{color:"#91D3FF"}}>
              Datos Importantes Sobre la GameJam
            </Card.Header>
            <Card.Body>
              <Card.Title style={{color:"#91D3FF"}}>Special title treatment</Card.Title>
              <Card.Text style={{color:"#588CAF"}}>{gameJam.gameJam.description}</Card.Text>
              <Button style={{ marginRight: "10px" ,backgroundColor:"#0B2A3F",border:"1px solid #2390B6"}}>Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default GameJamCard;
