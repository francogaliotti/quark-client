import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { IFrameComponent } from '../../components/iFrameComponent'

export const Course = () => {
    
    const {id} = useParams()

    return (
        <>
            <IFrameComponent url={`course/view.php?id=${id}`} />
        </>
    )
}
