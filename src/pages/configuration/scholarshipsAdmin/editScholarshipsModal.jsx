import React, { useState, useEffect } from "react";
import { PrimaryButton } from "../../../styles/styledComponents/Buttons";
import "../../../styles/Modal.css";
import { getPublic, postPrivate,  putPrivate } from "../../../services/apiService";
import Alert from "../../../services/alertService";

export const EditScholarshipsModal = ({
  open,
  onClose,
  fetch,
  update,
  setUpdate,
  current,
  setCurrent,
}) => {
  const [moodleCourses, setMoodleCourses] = useState([]);
  const [currentScholarship, setCurrentScholarship] = useState(current);
  let file;

  useEffect(() => {
    setCurrentScholarship(current);
  }, [current]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPublic(`/news`);
      setMoodleCourses(res.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", currentScholarship.name)
      formData.append("duration", currentScholarship.duration);
      formData.append("amount", currentScholarship.amount);
      formData.append("endDate", currentScholarship.endDate);
      formData.append("courseList", currentScholarship.courseList);
      formData.append("file", file, file.name);
      if (!update) {
        const res = await postPrivate(`/scholarship/create`, formData);
        Alert.success({ title: "Añadida!", message: "Beca añadida" });
      } else {
        formData.append("scholarshipId", current.id)
        const res = await putPrivate(`/scholarship/update`, formData);
        Alert.success({ title: "Actualizada!", message: "Beca actualizada" });
        setUpdate(false);
        setCurrent({});
      }
      onClose();
      fetch();
    } catch (e) {
      console.log(e);
      Alert.error({ title: "Error!", message: e.response.data.msg });
    }
  };

  if (!open) return null;
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
        <p className="closeBtn" onClick={onClose}>
          X
        </p>
        <div className="modalCamp">
          <label for="title">Título</label>
          <input
            id="title"
            className="modalInput"
            value={currentScholarship?.name}
            onChange={(e) =>
              setCurrentScholarship({
                ...currentScholarship,
                name: e.target.value,
              })
            }
          />
        </div>
        <div className="modalCamp">
          <label for="content">Duración</label>
          <input
            type="number"
            id="validity"
            className="modalInput"
            value={currentScholarship?.duration}
            onChange={(e) =>
              setCurrentScholarship({
                ...currentScholarship,
                duration: e.target.value,
              })
            }
          />
        </div>
        <div className="modalCamp">
          <label for="validity">Cantidad</label>
          <input
            type="number"
            id="validity"
            className="modalInput"
            value={currentScholarship?.amount}
            onChange={(e) =>
              setCurrentScholarship({
                ...currentScholarship,
                amount: e.target.value,
              })
            }
          />
        </div>
        <div className="modalCamp">
          <label for="validity">Vencimiento</label>
          <input
            type="date"
            id="validity"
            className="modalInput"
            value={currentScholarship?.endDate}
            onChange={(e) =>
              setCurrentScholarship({
                ...currentScholarship,
                endDate: e.target.value,
              })
            }
          />
        </div>
        <div className="modalCamp">
          <label for="filter">
            Cursos <p>(Mantener Ctrl.)</p>
          </label>
          <select
            multiple
            id="filter"
            className="modalInput selectMultiple"
            onChange={(e) => {
              const selectedOptions = Array.from(e.target.selectedOptions).map(
                (option) => option.value
              );
              setCurrentScholarship({
                ...currentScholarship,
                courseList: selectedOptions,
              });
            }}
          >
            {moodleCourses.map((course) => {
              return <option value={course.id}>{course.name}</option>;
            })}
          </select>
        </div>
        <div className="modalCamp">
          <label for="validity">Imagen</label>
          <input
            type="file"
            id="validity"
            className="modalInput"
            onChange={(e) => (file = e.target.files[0])}
          />
        </div>
        <PrimaryButton id="createButton" onClick={() => handleSubmit()}>
          {update ? <>Actualizar</> : <>Crear</>}
        </PrimaryButton>
      </div>
    </div>
  );
};
