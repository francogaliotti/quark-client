import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProgressBar from "@ramonak/react-progress-bar";
import { login, selectUser } from '../../features/userSlice';
import '../../styles/Home.css'
import axios from 'axios';

function Home() {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    /*useEffect(() => {
        axios.get("https://api-perfil.uc.r.appspot.com/sesskey/4").then((res)=> {
            console.log(res.data)
            dispatch(login({
                ...user,
                sesskey : res.data[0].sesskey
            }))
            console.log(user)
        })
    }, []);*/

    useEffect(() => {
        if (!localStorage.getItem("sesskey")) navigate('/login')
    }, []);

    const handleProfileProgress = () => {
        
    }

    return (
        <div className='homePageContainer'>
            <ProgressBar completed={Math.round(8*100/12)}/>
            {/*<iframe id="inlineFrameExample"
                title="Inline Frame Example"
                width="1100"
                height="600"
                src="http://localhost/moodle/my/"
                name='moodleframe'>
    </iframe>*/}
            
        </div>
    )
}

export default Home