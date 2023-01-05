import React, { useState } from 'react';
import { PrimaryButton } from '../../../styles/styledComponents/Buttons';
import EditEventModal from './editEventModal';

export const EventsAdmin = () => {

    const [openModal, setOpenModal] = useState(false);

    return (
        <div className='eventsAdminContainer'>
            <EditEventModal open={openModal} onClose={() => setOpenModal(false)} />
            <PrimaryButton onClick={() => setOpenModal(true)}>
                Crear Evento
            </PrimaryButton>

        </div>
    )
}
