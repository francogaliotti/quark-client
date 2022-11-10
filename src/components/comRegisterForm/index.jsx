import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import '../../styles/ComRegisterForm.css'
import { PrimaryButton } from '../../styles/styledComponents/Buttons'

function ComRegisterForm() {

    const initialValues = {
        username: "",
        companyName: "",
        nEmployees: "",
        country: "",
        password: "",
        password2: "",
        email: ""
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3, "El minimo de caracteres es 3").max(20, "El máximo de caracteres es 20").required(),
        companyName: Yup.string().min(3, "El minimo de caracteres es 3").max(20, "El máximo de caracteres es 20").required("Campo requerido"),
        nEmployees: Yup.string().required("Campo requerido"),
        country: Yup.string().required("Campo requerido"),
        password: Yup.string().min(4, "El minimo de caracteres es 4").max(20, "El máximo de caracteres es 20").required("Campo requerido"),
        password2: Yup.string().required('Debes confirmar la contraseña').oneOf([Yup.ref('password'), null], "Las contraseñas no coinciden"),
        email: Yup.string().email("Email invalido").required("Campo requerido")
    })


    return (
        <div className="devRegisterForm">
            <Formik initialValues={initialValues} onSubmit={() => console.log("Funciona")} validationSchema={validationSchema}>
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
                        <label>Nombre de la Empresa: </label>
                        <div className="inputContainer">

                            <Field
                                autoComplete="off"
                                id="fieldAddRecord"
                                name="companyName"
                                placeholder="Nombre de la Empresa" />
                            <ErrorMessage name='companyName' component='span' />
                        </div>
                    </div>
                    <div className="singleField">
                        <label>Pais: </label>
                        <div className="inputContainer">

                            <Field
                                autoComplete="off"
                                id="selectField"
                                name="country"
                                as="select" />
                            <ErrorMessage name='country' component='span' />
                        </div>
                    </div>
                    <div className="singleField">
                        <label>Cantidad de empleados en tecnología: </label>
                        <div className="inputContainer">

                            <Field
                                autoComplete="off"
                                id="selectField"
                                name="nEmployees"
                                as="select">
                                <option value=""></option>
                                <option value="Menos de 20">Menos de 20</option>
                                <option value="Entre 50 y 100">Entre 20 y 50</option>
                                <option value="Entre 50 y 100">Entre 50 y 100</option>
                                <option value="Entre 100 y 200">Entre 100 y 200</option>
                                <option value="Más de 200">Más de 200</option>
                            </Field>

                            <ErrorMessage name='nEmployees' component='span' />
                        </div>
                    </div>
                    <div className="singleField">
                        <label>Email: </label>
                        <div className="inputContainer">

                            <Field
                                autoComplete="off"
                                id="fieldAddRecord"
                                name="email"
                                placeholder="Email de la empresa" />
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

export default ComRegisterForm