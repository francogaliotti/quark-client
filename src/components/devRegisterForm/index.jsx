import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import './DevRegisterForm.css'
import { PrimaryButton } from '../styledComponents/Buttons'

function DevRegisterForm() {

    const initialValues = {
        username: "",
        name: "",
        lastName: "",
        password: "",
        password2: "",
        email: ""
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3, "El minimo de caracteres es 3").max(20, "El máximo de caracteres es 20").required(),
        name: Yup.string().min(3, "El minimo de caracteres es 3").max(20, "El máximo de caracteres es 20").required("Campo requerido"),
        lastName: Yup.string().min(3, "El minimo de caracteres es 3").max(20, "El máximo de caracteres es 20").required("Campo requerido"),
        password: Yup.string().min(4, "El minimo de caracteres es 4").max(20, "El máximo de caracteres es 20").required("Campo requerido"),
        password2: Yup.string().required('Debes confirmar la contraseña').oneOf([Yup.ref('password'), null], "Las contraseñas no coinciden"),
        email: Yup.string().email("Email invalido").required("Campo requerido")
    })


    return (
        <div className="devRegisterForm">
            <Formik initialValues={initialValues} onSubmit={() => console.log("Funciona")} validationSchema={validationSchema}>
                <Form className="formContainer" id='devFormId'>
                    <div className="singleField">
                        <label>Username: </label>
                        <div className="inputContainer">

                            <Field
                                autoComplete="off"
                                id="fieldAddRecord"
                                name="username"
                                placeholder="Your username" />
                            <ErrorMessage name='username' component='span' />
                        </div>
                    </div>
                    <div className="singleField">
                        <label>Nombre: </label>
                        <div className="inputContainer">

                            <Field
                                autoComplete="off"
                                id="fieldAddRecord"
                                name="name"
                                placeholder="Tu nombre" />
                            <ErrorMessage name='name' component='span' />
                        </div>
                    </div>
                    <div className="singleField">
                        <label>Apellido: </label>
                        <div className="inputContainer">

                            <Field
                                autoComplete="off"
                                id="fieldAddRecord"
                                name="lastName"
                                placeholder="Tu Apellido" />
                            <ErrorMessage name='lastName' component='span' />
                        </div>
                    </div>
                    <div className="singleField">
                        <label>Email: </label>
                        <div className="inputContainer">

                            <Field
                                autoComplete="off"
                                id="fieldAddRecord"
                                name="email"
                                placeholder="Tu Email" />
                            <ErrorMessage name='email' component='span' />
                        </div>
                    </div>
                    <div className="singleField">
                        <label>Contraseña: </label>
                        <div className="inputContainer">

                            <Field
                                autoComplete="off"
                                id="fieldAddRecord"
                                name="password"
                                placeholder="Ingresar contraseña"
                                type='password' />
                            <ErrorMessage name='password' component='span' />
                        </div>
                    </div>
                    <div className="singleField">
                        <label>Confirmar contraseña: </label>
                        <div className="inputContainer">

                            <Field
                                autoComplete="off"
                                id="fieldAddRecord"
                                name="password2"
                                placeholder="Confirmar contraseña"
                                type='password' />
                            <ErrorMessage name='password2' component='span' />
                        </div>
                    </div>
                    <PrimaryButton type='submit'>Registrate</PrimaryButton>
                </Form>
            </Formik>
        </div>
    )
}

export default DevRegisterForm