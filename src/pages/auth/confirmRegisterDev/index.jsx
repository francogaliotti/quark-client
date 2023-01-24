import React from 'react'
import { Link, useParams } from 'react-router-dom'

export const ConfirmRegisterDev = () => {
    let { id } = useParams()
    return (
        <div className='confirmRegisterContainer'>
            <h1>Tu usuario ya ha sido registrado!</h1>
            <Link to='/login'>Ir a Login</Link>
        </div>
    )
}
