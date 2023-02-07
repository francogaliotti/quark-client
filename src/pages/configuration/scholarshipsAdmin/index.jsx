import React, { useState, useEffect } from 'react'
import { PrimaryButton } from '../../../styles/styledComponents/Buttons';
import { EditScholarshipsModal } from './editScholarshipsModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCircleInfo, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import ReactPaginate from 'react-paginate'
import '../../../styles/Configuration.css'
import { deletePublic, postPublic } from '../../../services/apiService';
import Alert from '../../../services/alertService';

export const ScholarshipsAdmin = () => {

    const [openModal, setOpenModal] = useState(false);
    const [scholarshipList, setScholarshipList] = useState([])
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
        const res = await postPublic(`/scholarship/getScholarship`, { page: pageNumber, size: itemsPerPage })
        setScholarshipList(res.data.rows)
        setElementCount(res.data.amount)
    }

    const openForUpdate = (n) => {
        setCurrent(n)
        setOpenModal(true)
        setUpdate(true)
    }

    const handleDelete = async (n) => {
        Alert.confirm({ title: 'Deseas eliminar esta beca?', message: "Esta acción es irreversible" }, async () => {
            const res = await deletePublic(`/news/delete/${n.id}`)
            Alert.success({ title: "Eliminada!", message: "Beca eliminada" })
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
            <EditScholarshipsModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                fetch={fetchData}
                update={update}
                setUpdate={setUpdate}
                current={current}
                setCurrent={setCurrent} />
            <PrimaryButton onClick={() => setOpenModal(true)}>
                Nueva Beca
            </PrimaryButton>

            <div className="tableContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Duración</th>
                            <th>Cantidad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scholarshipList?.map(n => (
                            <tr key={n.id}>
                                <td>{n.name}</td>
                                <td>{n.duration} meses</td>
                                <td>{n.amount} becas</td>
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
