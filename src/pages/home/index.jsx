import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../components/progressBar';
import { selectUser } from '../../features/userSlice';
import '../../styles/Home.css'

function Home() {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) navigate('/login')
    }, [user]);


    return (
        <div className='homePageContainer'>
            <ProgressBar/>
        </div>
    )
}

export default Home