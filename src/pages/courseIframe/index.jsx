import React from 'react'
import { useParams } from 'react-router-dom'
import '../../styles/CourseIFrame.css'

function CourseIFrame() {

    let { id } = useParams()

  return (
    <div className='courseFrameContainer'>
        <iframe id="inlineFrameExample"
                title="Inline Frame Example"
                src={`http://localhost/moodle/course/view.php?id=${id}`}
                name='moodleframe'>
            </iframe>
    </div>
  )
}

export default CourseIFrame