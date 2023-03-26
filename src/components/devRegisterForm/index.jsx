import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
//import "../../styles/DevRegisterForm.css";
import { PrimaryButton } from "../../styles/styledComponents/Buttons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postPublic } from "../../services/apiService";
import Alert from "../../services/alertService";
import { Button, Col, Container, Row } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function DevRegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    password: "",
    password2: "",
    email: "",
    idnumber: "",
    idnumber2: "",
  };

  const validationSchema = Yup.object().shape({
    /*username: Yup.string()
      .min(3, "El minimo de caracteres es 3")
      .max(20, "El máximo de caracteres es 20")
      .lowercase("Solo puede llevar minúsculas")
      .strict()
      .required("Campo requerido"),*/
    firstName: Yup.string()
      .min(3, "El minimo de caracteres es 3")
      .max(20, "El máximo de caracteres es 20")
      .required("Campo requerido"),
    lastName: Yup.string()
      .min(3, "El minimo de caracteres es 3")
      .max(20, "El máximo de caracteres es 20")
      .required("Campo requerido"),
    password: Yup.string()
      .min(8, "El minimo de caracteres es 8")
      .max(20, "El máximo de caracteres es 20")
      .matches(/[A-Z]/, "Debe tener al menos una letra en mayúscula")
      .matches(/\d/, "Debe tener al menos un número")
      .matches(/[a-z]/, "Debe tener al menos una letra en minúscula")
      .matches(/\W/, "Debe tener al menos un caracter alfanumérico")
      .required("Campo requerido"),
    password2: Yup.string()
      .required("Debes confirmar la contraseña")
      .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden"),
    idnumber: Yup.string()
      .min(6, "El minimo de caracteres es 6")
      .max(20, "El máximo de caracteres es 20")
      .required("Campo requerido"),
    idnumber2: Yup.string()
      .required("Debes confirmar el numero de identificacion personal")
      .oneOf([Yup.ref("idnumber"), null], "Los numeros no coinciden"),
    email: Yup.string().email("Email invalido").required("Campo requerido"),
    confirmAge: Yup.boolean().test(
      "confirm-age",
      "Debes tener al menos 18 años para continuar",
      (value) => value === true
    ),
  });

  const onSubmit = async (data) => {
    const user = {
      //username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      email: data.email,
      idnumber: data.idnumber,
    };
    Alert.confirmWithCancel({ title: "Sabes programar?", confirmmsg: "Si", cancelmsg: "No" }, async () => {
      try {
        const res = await postPublic(`/register/1`, { user });
        console.log(res);
        Alert.success({ title: "Email enviado", message: res.data.message });
      } catch (e) {
        Alert.error({ title: "Error!", message: e.response.data.message });
        console.log(e);
      }
    }, async ()=>{
      try {
        const res = await postPublic(`/register/2`, { user });
        console.log(res);
        Alert.error({ title: "Error!", message: "No sabes programar" });
      } catch (e) {
        Alert.error({ title: "Error!", message: e.response.data.message });
        console.log(e);
      }
    });
  };

  return (
    <div className="devRegisterForm">
      <Container fluid>
        <Row className="justify-content-center">
          <Col md={4}>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form className="formContainer" id="devFormId">
                <Row>
                  <Col md={6}>
                    <div className="singleField">
                      <div className="inputContainer">
                        <Field
                          autoComplete="off"
                          name="firstName"
                          placeholder="Nombre/s"
                          className="form-control"
                        />
                        <ErrorMessage name="firstName" component="span" />
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="singleField">
                      <div className="inputContainer">
                        <Field
                          autoComplete="off"
                          name="lastName"
                          placeholder="Apellido/s"
                          className="form-control"
                        />
                        <ErrorMessage name="lastName" component="span" />
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="singleField">
                  <div className="inputContainer">
                    <Field
                      autoComplete="off"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                    />
                    <ErrorMessage name="email" component="span" />
                  </div>
                </div>
                <div className="singleField">
                  <div className="inputContainer">
                    <Field
                      autoComplete="off"
                      name="password"
                      placeholder="Contraseña"
                      className="form-control"
                      type="password"
                    />
                    <ErrorMessage name="password" component="span" />
                  </div>
                </div>
                <div className="singleField">
                  <div className="inputContainer">
                    <Field
                      autoComplete="off"
                      name="password2"
                      placeholder="Confirmar contraseña"
                      className="form-control"
                      type="password"
                    />
                    <ErrorMessage name="password2" component="span" />
                  </div>
                </div>
                <div className="singleField">
                  <div className="inputContainer">
                    <Field
                      autoComplete="off"
                      name="idnumber"
                      placeholder="Número de identificación personal"
                      className="form-control"
                      type="number"
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      data-bs-title="Tooltip on rkii"
                    />
                    <ErrorMessage name="idnumber" component="span" />
                  </div>
                </div>
                <div className="singleField">
                  <div className="inputContainer">
                    <Field
                      autoComplete="off"
                      name="idnumber2"
                      placeholder="Confirmar numero de identificación personal"
                      className="form-control"
                      type="number"
                    />

                    <ErrorMessage name="idnumber2" component="span" />
                  </div>
                </div>
                <div className="singleField">
                  <div className="inputContainer">
                    <Row>
                      <Col sm={2}>
                        <Field
                          type="checkbox"
                          id="confirmAge"
                          name="confirmAge"
                        />
                      </Col>
                      <Col sm={10}>
                        <label className="h6" htmlFor="confirmAge">
                          Soy mayor de 18 años
                        </label>
                      </Col>
                    </Row>
                  </div>
                </div>
                <Button variant="primary" type="submit">
                  Registrarme
                </Button>
              </Form>
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DevRegisterForm;
