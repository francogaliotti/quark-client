import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProgressBar from "@ramonak/react-progress-bar";
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
            <iframe id="inlineFrameExample"
                title="Inline Frame Example"
                width="600"
                height="400"
                src="https://quark.academy/login/index.php">
            </iframe>
        </div>
    )
}

export default Home