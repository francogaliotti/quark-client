import React, { useEffect, useState } from "react";
import "../../styles/Offer.css";
import { getPublic, postPublic } from "../../services/apiService";
import { login, selectUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../services/alertService";
import { Scholarship } from "./scholarship";
import { ChallengeModal } from "../../components/challengeModal";

export const Scholarships = () => {
  const [containsScholarship, setContainsScholarship] = useState(false);
  const [scholarships, setScholarships] = useState([])

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    getScholarships()
  }, [user]);

  const getScholarships = async () => {
    const res = await postPublic(`/scholarship/getUserScholarships`, {courseList: user.moodleUserData.listaCurso})
    setScholarships(res.data)
  }

  const fetchData = async () => {
    const moodleData = await getPublic(
      `/user/getMoodleData/${user.moodleUserData.username}`
    );
    const profInfo = await getPublic(`/user/${user.moodleUserData.id}`);
    dispatch(
      login({
        ...moodleData.data,
        ...profInfo.data,
      })
    );
  };

  return (
    <div className="offerPageContainer">
      <ChallengeModal/>
      <div className="offersContainer">
        {scholarships.map(s=> {
          return(<Scholarship item={s} fetch={fetchData}/>)
        })}
      </div>
    </div>
  );
};
