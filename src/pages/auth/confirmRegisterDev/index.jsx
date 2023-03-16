import React from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { postPublic } from '../../../services/apiService'

export const ConfirmRegisterDev = () => {
    let { id } = useParams()
    useEffect(() => {
        console.log(id)
       /* try {
            const res = postPublic(`/moodleSingUp`, {
                userid: id
            })
            console.log(res)
        } catch (e) {
            console.log(e)
        }*/
    }, [])
    return (
        <div className='confirmRegisterContainer'>
            <h1>Tu usuario ya ha sido registrado!</h1>
            <Link to='/login'>Ir a Login</Link>
        </div>
    )
}
