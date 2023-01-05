import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { PrimaryButton } from '../../../styles/styledComponents/Buttons';
import { EditNewsModal } from './editNewsModal'

export const NewsAdmin = () => {

    const [openModal, setOpenModal] = useState(false);
    const [newsList, setNewsList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`https://api-perfil.uc.r.appspot.com/news/getAllNews/`)
            setNewsList(res.data)
        }
        fetchData()
    }, []);

    return (
        <div className='newsAdminContainer'>
            <EditNewsModal open={openModal} onClose={() => setOpenModal(false)} />
            <PrimaryButton onClick={() => setOpenModal(true)}>
                Nueva Novedad
            </PrimaryButton>

            <div className="tableContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Fecha de Alta</th>
                            <th>Fecha de Baja</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newsList.map(n => (
                            <tr key={n.id}>
                                <td>{n.title}</td>
                                <td>{new Date(n.createdAt).toLocaleDateString("en-AU")}</td>
                                <td>{new Date(n.endDate).toLocaleDateString("en-AU")}</td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
