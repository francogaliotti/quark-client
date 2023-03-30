// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { PrimaryButton, SecondaryButton } from '../../styles/styledComponents/Buttons';
// import { selectUser } from '../../features/userSlice';
// //import '../../styles/MyCourses.css'
// import ProgressBar from "@ramonak/react-progress-bar";
// import axios from 'axios';
// import { SingleCourse } from '../../components/singleCourse';
// //DEPRECATED

// function MyCourses() {
//     const user = useSelector(selectUser);
//     const navigate = useNavigate();

    
//     return (
        
//         <div className="myCoursesContainer">
//             {/* deprecated*/}
//             <h1>Mis cursos</h1>
//             <div className="wrapContainer">

//                 {user?.moodleUserData.listaCurso.map((c) => {
//                     return (<SingleCourse course={c}/>)
//                 })}



//             </div>
//         </div>
//     )
// }

// export default MyCourses