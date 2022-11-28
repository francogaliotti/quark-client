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
                width="1100"
                height="600"
                src="http://localhost/moodle/my/"
                name='moodleframe'>
            </iframe>
            <ProgressBar completed={Math.round(8*100/12)}/>
        </div>
    )
}

export default Home