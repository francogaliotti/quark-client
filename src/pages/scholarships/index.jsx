import React, { useEffect, useState } from "react";
import "../../styles/Offer.css";
import { getPublic, postPublic } from "../../services/apiService";
import { login, selectUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../services/alertService";

export const Scholarships = () => {
  const [scholarshipDropdown, setScholarshipDropDown] = useState(false);
  const [containsScholarship, setContainsScholarship] = useState(false);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    user.moodleUserData.listaCurso.map((c) => {
      if (c.idCurso == 7 || 3) setContainsScholarship(true);
    });
  }, [user]);

  const applyForScholarship = async () => {
    const res = await postPublic(`/scholarship`, {
      userid: user.id,
      courseid: 7,
    });
    console.log(res);
    Alert.success({
      title: "Se te dio de alta el desafio!",
      message: 'Ve a la sección "Mi aprendizaje"',
    });
    await fetchData();
  };

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
      <div className="offersContainer">
        <div className="singleOffer">
          <div
            className="front"
            onClick={() => setScholarshipDropDown(!scholarshipDropdown)}
          >
            <img
              className="offerImg"
              src="https://quarkacademy.com.ar/wp-content/uploads/2023/01/Vector-9.png"
              alt=""
            />
          </div>
          {scholarshipDropdown && (
            <div className="dropdown">
              <div className="level" onClick={applyForScholarship}>
                Aplicar a la beca
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
