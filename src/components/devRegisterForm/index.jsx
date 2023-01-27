import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import '../../styles/DevRegisterForm.css'
import { PrimaryButton } from '../../styles/styledComponents/Buttons'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { postPublic } from '../../services/apiService'

function DevRegisterForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        password2: "",
        email: ""
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, "El minimo de caracteres es 3")
            .max(20, "El máximo de caracteres es 20")
            .lowercase("Solo puede llevar minúsculas")
            .required("Campo requerido"),
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
            .matches(/[A-Z]/, 'Debe tener al menos una letra en mayúscula')
            .matches(/\d/, 'Debe tener al menos un número')
            .matches(/[a-z]/, 'Debe tener al menos una letra en minúscula')
            .matches(/\W/, 'Debe tener al menos un caracter alfanumérico')
            .required("Campo requerido"),
        password2: Yup.string()
            .required('Debes confirmar la contraseña')
            .oneOf([Yup.ref('password'), null], "Las contraseñas no coinciden"),
        email: Yup.string()
            .email("Email invalido")
            .required("Campo requerido")
    })


    const onSubmit = async (data) => {
        const user = {
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
            email: data.email
        }
        const res = await postPublic(`/register`, { user })
        console.log(res)
    }

    return (
        <div className="devRegisterForm">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer" id='devFormId'>
                    <div className="singleField">
                        <label>Nombre de Usuario: </label>
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
                                name="firstName"
                                placeholder="Tu nombre" />
                            <ErrorMessage name='firstName' component='span' />
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