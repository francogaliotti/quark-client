import React, { useEffect, useState } from 'react'
import '../../styles/Offer.css'
import { getPublic, postPublic } from '../../services/apiService';
import { login, selectUser } from '../../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../services/alertService';

export const Offer = () => {

    const [unrealDropdown, setUnrealDropDown] = useState(false)
    const [unityDropdown, setUnityDropDown] = useState(false)
    const [scholarshipDropdown, setScholarshipDropDown] = useState(false)
    const [containsScholarship, setContainsScholarship] = useState(false)

    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const applyForScholarship = async () => {
        const res = await postPublic(`/scholarship`, {
            userid: user.id,
            courseid: 7
        })
        console.log(res)
        Alert.success({title: "Se te dio de alta el desafio!", message: 'Ve a "Mi aprendizaje"'})
        await fetchData()
    }

    const fetchData = async () => {
          const moodleData = await getPublic(`/user/getMoodleData/${user.moodleUserData.username}`)
          const profInfo = await getPublic(`/user/${user.moodleUserData.id}`)
          dispatch(login({
            ...moodleData.data,
            ...profInfo.data,
          }))
      }

    useEffect(() => {
        user.moodleUserData.listaCurso.map((c) => {
            if(c.idCurso == 7 || 3) setContainsScholarship(true)
        })
    }, [user]);

    return (
        <div className="offerPageContainer">
            <div className="offersContainer">
                <div className="singleOffer">
                    <div className="front" onClick={()=>setUnrealDropDown(!unrealDropdown)}>
                        <img className='offerImg' src="https://quark.academy/pluginfile.php/2528/course/overviewfiles/Unreal.png" alt="" />
                    </div>
                    {unrealDropdown && <div className="dropdown">
                        <div className="level">
                            Inicial
                        </div>
                        <div className="level">
                            Intermedio
                        </div>
                        <div className="level">
                            Bootcamp
                        </div>
                    </div>}
                </div>
                <div className="singleOffer">
                    <div className="front" onClick={()=>setUnityDropDown(!unityDropdown)}>
                    <img className='offerImg' src="https://quark.academy/pluginfile.php/1721/course/overviewfiles/Unity.png" alt="" />
                    </div>
                    {unityDropdown && <div className="dropdown">
                        <div className="level">
                            Inicial
                        </div>
                        <div className="level">
                            Intermedio
                        </div>
                        <div className="level">
                            Bootcamp
                        </div>
                    </div>}
                </div>
                {!containsScholarship && <div className="singleOffer">
                    <div className="front" onClick={()=>setScholarshipDropDown(!scholarshipDropdown)}>
                    <img className='offerImg' src="https://quarkacademy.com.ar/wp-content/uploads/2023/01/Vector-9.png" alt="" />
                    </div>
                    {scholarshipDropdown && <div className="dropdown">
                        <div className="level" onClick={applyForScholarship}>
                            Aplicar a la beca
                        </div>
                    </div>}
                </div>}
            </div>
        </div>
    )
}
