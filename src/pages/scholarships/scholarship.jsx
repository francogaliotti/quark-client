import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import Alert from "../../services/alertService";
import { postPublic } from "../../services/apiService";

export const Scholarship = ({ item, fetch }) => {
  const [scholarshipDropdown, setScholarshipDropDown] = useState(false);

  const user = useSelector(selectUser);

  const applyForScholarship = async () => {
    const res = await postPublic(`/scholarship`, {
      userid: user.id,
      courseid: item.id,
    });
    console.log(res);
    Alert.success({
      title: "Se te dio de alta el desafio!",
      message: 'Ve a la sección "Mi aprendizaje"',
    });
    await fetch();
  };

  return (
    <div className="singleOffer">
      <div
        className="front"
        onClick={() => setScholarshipDropDown(!scholarshipDropdown)}
      >
        <img className="offerImg" src={item.img} alt="" />
        <h3 className="offerTitle">{item.name}</h3>
        <h4 className="scholarshipDuration">Duración: {item.duration} meses</h4>
      </div>

      {scholarshipDropdown && (
        <div className="dropdown">
          <div className="level" onClick={applyForScholarship}>
            Aplicar a la beca
          </div>
        </div>
      )}
    </div>
  );
};
