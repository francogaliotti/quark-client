import React, { useState, useEffect } from 'react'
import { PrimaryButton } from '../../../styles/styledComponents/Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCircleInfo, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import ReactPaginate from 'react-paginate'
import '../../../styles/Configuration.css'
import { deletePrivate, postPublic } from '../../../services/apiService';
import Alert from '../../../services/alertService';
import { EditFormModal } from './editFormModal';

export const FormAdmin = () => {
    const [openModal, setOpenModal] = useState(false);
    const [questionnairesList, setQuestionnairesList] = useState([])
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
        const res = await postPublic(`/challenge/getAllQuestionnaires/`, { page: pageNumber, size: itemsPerPage })
        setQuestionnairesList(res.data.rows)
        setElementCount(res.data.count)
    }

    const openForUpdate = (n) => {
        setCurrent(n)
        setOpenModal(true)
        setUpdate(true)
    }

    const handleDelete = async (n) => {
        Alert.confirm({ title: 'Deseas eliminar esta novedad?', message: "Esta acción es irreversible" }, async () => {
            const res = await deletePrivate(`/news/delete/${n.id}`)
            Alert.success({ title: "Eliminada!", message: "Novedad eliminada" })
            fetchData()
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
            <EditFormModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                fetch={fetchData}
                update={update}
                setUpdate={setUpdate}
                current={current}
                setCurrent={setCurrent} />
            <PrimaryButton onClick={() => setOpenModal(true)}>
                Nuevo Formulario
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
                        {questionnairesList?.map(n => (
                            <tr key={n.id}>
                                <td>{n.name}</td>
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
