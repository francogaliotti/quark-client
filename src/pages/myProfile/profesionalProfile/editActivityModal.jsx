import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";

export const EditActivityModal = ({ show, onClose, type, isNew, current }) => {

    const [currentActivity, setCurrentActivity] = useState(current)

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <h4>Añadir Actividad</h4>
      </Modal.Header>
      <Modal.Body>
        {type === 0 && <Form className="academicForm">
          <InputGroup>
            <span className="input-group-text" id="basic-addon3">
              Título
            </span>
            <input type="text" className="form-control" />
          </InputGroup>
          <InputGroup>
            <span className="input-group-text" id="basic-addon3">
              Institución
            </span>
            <input type="text" className="form-control" />
          </InputGroup>
          <InputGroup>
            <span className="input-group-text" id="basic-addon3">
              Estado
            </span>
            <select name="" className="form-control">
              <option value=""></option>
              <option value="En curso">En curso</option>
              <option value="Finalizado">Finalizado</option>
            </select>
          </InputGroup>
          <InputGroup>
            <span className="input-group-text" id="basic-addon3">
              Inicio
            </span>
            <input type="date" className="form-control" />
          </InputGroup>
          <InputGroup>
            <span className="input-group-text" id="basic-addon3">
              Finalización
            </span>
            <input type="date" className="form-control" />
          </InputGroup>
        </Form>}
        {type === 1 && <Form className="laborForm">
          <InputGroup>
            <span className="input-group-text" id="basic-addon3">
              Título
            </span>
            <input type="text" className="form-control" />
          </InputGroup>
          <InputGroup>
            <span className="input-group-text" id="basic-addon3">
              Empresa
            </span>
            <input type="text" className="form-control" />
          </InputGroup>
          <InputGroup>
            <span className="input-group-text" id="basic-addon3">
              Estado
            </span>
            <select name="" className="form-control">
              <option value=""></option>
              <option value="En curso">En curso</option>
              <option value="Finalizado">Finalizado</option>
            </select>
          </InputGroup>
          <InputGroup>
            <span className="input-group-text" id="basic-addon3">
              Inicio
            </span>
            <input type="date" className="form-control" />
          </InputGroup>
          <InputGroup>
            <span className="input-group-text" id="basic-addon3">
              Finalización
            </span>
            <input type="date" className="form-control" />
          </InputGroup>
        </Form>}
        {type ===2 && <Form className="independentForm">
          <InputGroup>
            <span className="input-group-text" id="basic-addon3">
              Nombre
            </span>
            <input type="text" className="form-control" />
          </InputGroup>
          <InputGroup>
            <span className="input-group-text" id="basic-addon3">
              URL
            </span>
            <input type="text" className="form-control" />
          </InputGroup>
          <InputGroup>
            <span className="input-group-text" id="basic-addon3">
                Descripción
              </span>
              <textarea
                className="form-control"
              ></textarea>
          </InputGroup>
        </Form>}
        <Button type="submit" variant="primary">
            Guardar
          </Button>
      </Modal.Body>
    </Modal>
  );
};
