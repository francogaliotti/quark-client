import ProgressBar from '@ramonak/react-progress-bar'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/MyCourses.css'

export const SingleCourse = ({ course }) => {

  const navigate = useNavigate()

  const handleMoodleCourse = (id) => {
    navigate(`/course/${id}`)
    //window.open(env.MOODLE_URL + `course/view.php?id=${id}`, "_blank", "noopener noreferrer")
  }
  return (
    <div className="basicInfo" id='courseContainer' onClick={() => handleMoodleCourse(course.idCurso)}>
      <h3 id='courseTitle'>{course.fullName}</h3>
      <img src={course.url} id='courseImg' />
      <h4 id='courseDate'>Fecha de inicio: <p>{new Date(course.timestarted).toLocaleDateString("en-AU")}</p></h4>
      <ProgressBar completed={Math.round(course.progress)} className="wrapper"
        barContainerClassName="container"
        bgColor='rgb(24, 27, 32)'
        labelClassName="label"
        labelAlignment='center' />
    </div>
  )
}
