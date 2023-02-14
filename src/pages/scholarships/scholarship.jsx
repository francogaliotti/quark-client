import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChallengeModal } from "../../components/challengeModal";
import { backToZero } from "../../features/formSlice";
import { selectUser } from "../../features/userSlice";
import Alert from "../../services/alertService";
import { postPublic } from "../../services/apiService";

export const Scholarship = ({ item, fetch }) => {
  const [scholarshipDropdown, setScholarshipDropDown] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const applyForScholarship = async () => {
    setOpenModal(true);
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
      {openModal && (
        <ChallengeModal
          idScholarship={item.id}
          onClose={() => {
            dispatch(backToZero());
            setOpenModal(false);
          }}
        />
      )}
    </div>
  );
};
