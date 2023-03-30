import { faCircleInfo, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Alert from '../../../services/alertService';
import { deletePrivate, postPublic } from '../../../services/apiService';
import { PrimaryButton } from '../../../styles/styledComponents/Buttons';
import DetailEventModal from './detailEventModal';
import EditEventModal from './editEventModal';

export const EventsAdmin = () => {

    const [openModal, setOpenModal] = useState(false);
    const [openDetailModal, setOpenDetailModal] = useState(false)
    const [eventList, setEventList] = useState([])
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
        const res = await postPublic(`/events/getAllEvents`, {page: pageNumber, size: itemsPerPage})
        console.log(res)
        setEventList(res.data.rows)
        setElementCount(res.data.count)
    }

    const openForUpdate = (n) => {
        setCurrent(n)
        setOpenModal(true)
        setUpdate(true)
    }

    const openForDetail = (n) => {
        setCurrent(n)
        setOpenDetailModal(true)
    }

    const handleDelete = async (n) => {
        Alert.confirm({title: 'Deseas eliminar este evento?', message: "Esta acción es irreversible"}, async () => {
            const res = await deletePrivate(`/events/delete/${n.id}`)
            Alert.success({title: "Eliminado!", message:"Evento eliminado"})
            fetchData()
        })
    }

    useEffect(() => {
        fetchData()
    }, [pageNumber]);

    useEffect(() => {
        if (!openModal) {
            setCurrent({})
            setUpdate(false)
        }
    }, [openModal]);

    return (
        <div className='crudAdminContainer' style={{backgroundColor: "#ffffff"}}>
            <EditEventModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                fetch={fetchData}
                update={update}
                setUpdate={setUpdate}
                current={current}
                setCurrent={setCurrent} />

            <DetailEventModal
                open={openDetailModal}
                onClose={() => setOpenDetailModal(false)}
                current={current}
                setCurrent={setCurrent} />

            <PrimaryButton onClick={() => setOpenModal(true)}>
                Crear Evento
            </PrimaryButton>

            <div className="tableContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Fecha</th>
                            <th>Enlace</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventList?.map(n => (
                            <tr key={n.id}>
                                <td>{n.title}</td>
                                <td>{new Date(n.eventDate).toLocaleDateString("en-AU")}</td>
                                <td><a href="#" onClick={() => window.open("http://" + n.link, "_blank", "noopener noreferrer")}>{n.link}</a></td>
                                <td id='crudButtons'>
                                    <button className='plus' onClick={() => openForUpdate(n)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                    <button className='plus' onClick={() => handleDelete(n)}><FontAwesomeIcon icon={faTrashCan} /></button>
                                    <button className='plus' onClick={() => openForDetail(n)}><FontAwesomeIcon icon={faCircleInfo} /></button>
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
