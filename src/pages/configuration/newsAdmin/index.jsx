import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { PrimaryButton } from '../../../styles/styledComponents/Buttons';
import { EditNewsModal } from './editNewsModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCircleInfo, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate'
import '../../../styles/Configuration.css'

export const NewsAdmin = () => {

    const [openModal, setOpenModal] = useState(false);
    const [newsList, setNewsList] = useState([])
    const [update, setUpdate] = useState(false);
    const [current, setCurrent] = useState({})

    const [elementCount, setElementCount] = useState(0)
    const [pageNumber, setPageNumber] = useState(0)
    const itemsPerPage = 10

    const pageCount = Math.ceil(elementCount / itemsPerPage)

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const fetchData = async () => {
        const res = await axios.post(`https://api-perfil.uc.r.appspot.com/news/getAllNews/`, {page: pageNumber, size: itemsPerPage})
        setNewsList(res.data.data)
        setElementCount(res.data.amount)
    }

    const openForUpdate = (n) => {
        setCurrent(n)
        setOpenModal(true)
        setUpdate(true)
    }

    const handleDelete = async (n) => {
        Swal.fire({
            title: 'Deseas eliminar esta novedad?',
            text: "Esta acción es irreversible",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axios.delete(`https://api-perfil.uc.r.appspot.com/news/delete/${n.id}`)
                Swal.fire(
                    'Eliminado!',
                    'Novedad eliminada.',
                    'success'
                )
                fetchData()
            }
        })
    }

    useEffect(() => {
        if (!openModal) {
            setCurrent({})
            setUpdate(false)
        }
    }, [openModal]);

    useEffect(() => {
        fetchData()
    }, [pageNumber]);

    return (
        <div className='crudAdminContainer'>
            <EditNewsModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                fetch={fetchData}
                update={update}
                setUpdate={setUpdate}
                current={current}
                setCurrent={setCurrent} />
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
                        {newsList?.map(n => (
                            <tr key={n.id}>
                                <td>{n.title}</td>
                                <td>{new Date(n.createdAt).toLocaleDateString("en-AU")}</td>
                                <td>{new Date(n.endDate).toLocaleDateString("en-AU")}</td>
                                <td id='crudButtons'>
                                    <button className='plus' onClick={() => openForUpdate(n)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                    <button className='plus' onClick={() => handleDelete(n)}><FontAwesomeIcon icon={faTrashCan} /></button>
                                    <button className='plus'><FontAwesomeIcon icon={faCircleInfo} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ReactPaginate
                previousLabel={"anterior"}
                nextLabel={"siguiente"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />

        </div>
    )
}
