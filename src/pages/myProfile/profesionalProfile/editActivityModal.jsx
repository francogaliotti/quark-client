import React, { useEffect, useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";
import Alert from "../../../services/alertService";
import {
  getPublic,
  postPrivate,
  putPrivate,
} from "../../../services/apiService";
import { DatePickerCustom } from "../../../components/datePickerCustom";

export const EditActivityModal = ({
  show,
  onClose,
  type,
  isNew,
  current,
  updateState,
}) => {
  const [currentActivity, setCurrentActivity] = useState();
  const [lanList, setLanList] = useState([]);

  const user = useSelector(selectUser);

  const fetchLanguages = async () => {
    //idiomas parametrizados
    const languageList = await getPublic(`/parameters/languages`);
    //setLanList(languageList.data);
    let array1 = languageList.data;
    let array2 = [];
    user.languages.map((l) => {
      array2.push(l.language);
    });
    const array3 = array1.filter(element => !array2.some(item => item.id === element.id));
    if (!isNew) {
      let array4 = [current.language, ...array3]
      setLanList(array4)
    } else {
      setLanList(array3);
    }
  };

  useEffect(() => {
    if (show) {
      setCurrentActivity(current);
      if (current.beginDate) {
        setCurrentActivity({
          ...current,
          beginDate: new Date(current.beginDate),
        });
        if (current.endDate) {
          setCurrentActivity({
            ...current,
            beginDate: new Date(current.beginDate),
            endDate: new Date(current.endDate),
          });
        }
      }
      if (type == 3) {
        fetchLanguages();
      }
    } else {
      setCurrentActivity({});
    }
  }, [show]);

  const onSubmit = () => {
    switch (type) {
      case 0:
        if (isNew) {
          Alert.confirm({ title: "Añadir actividad académica?" }, async () => {
            try {
              const res = await postPrivate(`/academics/create`, {
                userid: user.id,
                academics: {
                  institution: currentActivity.institution,
                  title: currentActivity.title,
                  state: currentActivity.state,
                  beginDate: currentActivity.beginDate,
                  endDate: currentActivity.endDate,
                },
              });
              Alert.success({
                title: "Añadido!",
                message: "Actividad académica añadida",
              });
              await updateState("academic");
              onClose();
            } catch (e) {
              Alert.error({ message: e.response?.data.msg });
            }
          });
        } else {
          Alert.confirm(
            { title: "Actualizar actividad académica?" },
            async () => {
              try {
                const res = await putPrivate(`/academics/update`, {
                  id: currentActivity.id,
                  academics: {
                    institution: currentActivity.institution,
                    title: currentActivity.title,
                    state: currentActivity.state,
                    beginDate: currentActivity.beginDate,
                    endDate: currentActivity.endDate,
                  },
                });
                Alert.success({
                  title: "Actualizada!",
                  message: "Actividad académica actualizada",
                });
                await updateState("academic");
                onClose();
              } catch (e) {
                Alert.error({ message: e.response?.data.msg });
              }
            }
          );
        }
        break;
      case 1:
        if (isNew) {
          Alert.confirm({ title: "Añadir actividad laboral?" }, async () => {
            try {
              const res = await postPrivate(`/labors/create`, {
                userid: user.id,
                labors: {
                  company: currentActivity.company,
                  title: currentActivity.title,
                  state: currentActivity.state,
                  beginDate: currentActivity.beginDate,
                  endDate: currentActivity.endDate,
                },
              });
              Alert.success({
                title: "Añadido!",
                message: "Actividad laboral añadida",
              });
              await updateState("labor");
              onClose();
            } catch (e) {
              Alert.error({ message: e.response?.data.msg });
            }
          });
        } else {
          Alert.confirm(
            { title: "Actualizar actividad laboral?" },
            async () => {
              try {
                const res = await putPrivate(`/labors/update`, {
                  id: currentActivity.id,
                  labors: {
                    company: currentActivity.company,
                    title: currentActivity.title,
                    state: currentActivity.state,
                    beginDate: currentActivity.beginDate,
                    endDate: currentActivity.endDate,
                  },
                });
                Alert.success({
                  title: "Actualizada!",
                  message: "Actividad laboral actualizada",
                });
                await updateState("labor");
                onClose();
              } catch (e) {
                Alert.error({ message: e.response?.data.msg });
              }
            }
          );
        }
        break;
      case 2:
        if (isNew) {
          Alert.confirm(
            { title: "Añadir proyecto independiente?" },
            async () => {
              try {
                const res = await postPrivate(`/independents/create`, {
                  userid: user.id,
                  independents: {
                    description: currentActivity.description,
                    title: currentActivity.title,
                    url: currentActivity.projectUrl,
                  },
                });
                Alert.success({
                  title: "Añadido!",
                  message: "Proyecto independiente añadido",
                });
                await updateState("independent");
                onClose();
              } catch (e) {
                Alert.error({ message: e.response?.data.msg });
              }
            }
          );
        } else {
          Alert.confirm(
            { title: "Actualizar Proyecto independiente?" },
            async () => {
              try {
                const res = await putPrivate(`/independents/update`, {
                  id: currentActivity.id,
                  independents: {
                    description: currentActivity.description,
                    title: currentActivity.title,
                    url: currentActivity.projectUrl,
                  },
                });
                Alert.success({
                  title: "Actualizado!",
                  message: "Proyecto independiente actualizado",
                });
                await updateState("independent");
                onClose();
              } catch (e) {
                Alert.error({ message: e.response?.data.msg });
              }
            }
          );
        }
        break;
      case 3:
        if (isNew) {
          Alert.confirm({ title: "Añadir idioma?" }, async () => {
            try {
              const res = await postPrivate(`/languages/create`, {
                userid: user.id,
                languages: {
                  id: currentActivity.languageId,
                  level: currentActivity.level,
                },
              });
              console.log(res);
              Alert.success({ title: "Añadido!", message: "Idioma añadido" });
              await updateState("language");
              onClose();
            } catch (e) {
              Alert.error({ message: e.response?.data.msg });
            }
          });
        } else {
          Alert.confirm({ title: "Actualizar idioma?" }, async () => {
            try {
              const res = await putPrivate(`/languages/update`, {
                id: currentActivity.id,
                languages: {
                  id: currentActivity.languageId,
                  level: currentActivity.level,
                },
              });
              console.log(res);
              Alert.success({
                title: "Actualizado!",
                message: "Idioma actualizado",
              });
              await updateState("language");
              onClose();
            } catch (e) {
              Alert.error({ message: e.response?.data.msg });
            }
          });
        }
        break;
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <h5>Añadir Actividad</h5>
      </Modal.Header>
      <Modal.Body>
        {type === 0 && (
          <Form className="academicForm">
            <InputGroup>
              <span className="input-group-text" id="basic-addon3">
                Título
              </span>
              <input
                type="text"
                className="form-control"
                value={currentActivity?.title}
                onChange={(e) =>
                  setCurrentActivity({
                    ...currentActivity,
                    title: e.target.value,
                  })
                }
              />
            </InputGroup>
            <InputGroup>
              <span className="input-group-text" id="basic-addon3">
                Institución
              </span>
              <input
                type="text"
                className="form-control"
                value={currentActivity?.institution}
                onChange={(e) =>
                  setCurrentActivity({
                    ...currentActivity,
                    institution: e.target.value,
                  })
                }
              />
            </InputGroup>
            <InputGroup>
              <span className="input-group-text" id="basic-addon3">
                Estado
              </span>
              <select
                name=""
                className="form-control"
                value={currentActivity?.state}
                onChange={(e) =>
                  setCurrentActivity({
                    ...currentActivity,
                    state: e.target.value,
                  })
                }
              >
                <option value=""></option>
                <option value="En curso">En curso</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </InputGroup>
            <InputGroup>
              <span className="input-group-text" id="basic-addon3">
                Inicio
              </span>
              <DatePickerCustom
                selected={currentActivity?.beginDate}
                onChange={(date) =>
                  setCurrentActivity({
                    ...currentActivity,
                    beginDate: date,
                  })
                }
              />
            </InputGroup>
            <InputGroup>
              <span className="input-group-text" id="basic-addon3">
                Finalización
              </span>
              <DatePickerCustom
                selected={currentActivity?.endDate}
                onChange={(date) =>
                  setCurrentActivity({
                    ...currentActivity,
                    endDate: date,
                  })
                }
              />
            </InputGroup>
          </Form>
        )}
        {type === 1 && (
          <Form className="laborForm">
            <InputGroup>
              <span className="input-group-text" id="basic-addon3">
                Título
              </span>
              <input
                type="text"
                className="form-control"
                value={currentActivity?.title}
                onChange={(e) =>
                  setCurrentActivity({
                    ...currentActivity,
                    title: e.target.value,
                  })
                }
              />
            </InputGroup>
            <InputGroup>
              <span className="input-group-text" id="basic-addon3">
                Empresa
              </span>
              <input
                type="text"
                className="form-control"
                value={currentActivity?.company}
                onChange={(e) =>
                  setCurrentActivity({
                    ...currentActivity,
                    company: e.target.value,
                  })
                }
              />
            </InputGroup>
            <InputGroup>
              <span className="input-group-text" id="basic-addon3">
                Estado
              </span>
              <select
                name=""
                className="form-control"
                value={currentActivity?.state}
                onChange={(e) =>
                  setCurrentActivity({
                    ...currentActivity,
                    state: e.target.value,
                  })
                }
              >
                <option value=""></option>
                <option value="En curso">En curso</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </InputGroup>
            <InputGroup>
              <span className="input-group-text" id="basic-addon3">
                Inicio
              </span>
              <DatePickerCustom
                selected={currentActivity?.beginDate}
                onChange={(date) =>
                  setCurrentActivity({
                    ...currentActivity,
                    beginDate: date,
                  })
                }
              />
            </InputGroup>
            <InputGroup>
              <span className="input-group-text" id="basic-addon3">
                Finalización
              </span>
              <DatePickerCustom
                selected={currentActivity?.endDate}
                onChange={(date) =>
                  setCurrentActivity({
                    ...currentActivity,
                    endDate: date,
                  })
                }
              />
            </InputGroup>
          </Form>
        )}
        {type === 2 && (
          <Form className="independentForm">
            <InputGroup>
              <span className="input-group-text" id="basic-addon3">
                Nombre
              </span>
              <input
                type="text"
                className="form-control"
                value={currentActivity?.title}
                onChange={(e) =>
                  setCurrentActivity({
                    ...currentActivity,
                    title: e.target.value,
                  })
                }
              />
            </InputGroup>
            <InputGroup>
              <span className="input-group-text" id="basic-addon3">
                URL
              </span>
              <input
                type="text"
                className="form-control"
                value={currentActivity?.projectUrl}
                onChange={(e) =>
                  setCurrentActivity({
                    ...currentActivity,
                    projectUrl: e.target.value,
                  })
                }
              />
            </InputGroup>
            <InputGroup>
              <span className="input-group-text" id="basic-addon3">
                Descripción
              </span>
              <textarea
                className="form-control"
                value={currentActivity?.description}
                onChange={(e) =>
                  setCurrentActivity({
                    ...currentActivity,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </InputGroup>
          </Form>
        )}
        {type === 3 && (
          <Form className="languageForm">
            <InputGroup>
              <span className="input-group-text" id="basic-addon3">
                Idioma
              </span>
              <select
                className="form-control"
                value={currentActivity?.language?.id}
                onChange={(v) => {
                  const languagesSelected = lanList.filter(
                    (l) => l.id == v.target.value
                  );
                  const languageSelected = languagesSelected[0];
                  setCurrentActivity({
                    ...currentActivity,
                    language: languageSelected?.name,
                    languageId: languageSelected?.id,
                  });
                }}
                id=""
              >
                <option value=""></option>
                {lanList.map((l) => {
                  return <option value={l.id}>{l.name}</option>;
                })}
              </select>
            </InputGroup>
            <InputGroup>
              <span className="input-group-text" id="basic-addon3">
                Nivel
              </span>
              <div className="inputRadios">
                <input
                  type="radio"
                  value="A1"
                  id="A1"
                  className="btn-check"
                  name="score"
                  onChange={(e) =>
                    setCurrentActivity({
                      ...currentActivity,
                      level: e.target.value,
                    })
                  }
                  checked={currentActivity.level === "A1"}
                />
                <label for="A1" className={`form-check-label btn btn-secondary btn-quark-radio ${currentActivity.level === "A1" ? "checked" : ""}`}>
                  A1
                </label>
                <input
                  type="radio"
                  value="A2"
                  id="A2"
                  className="btn-check"
                  name="score"
                  onChange={(e) =>
                    setCurrentActivity({
                      ...currentActivity,
                      level: e.target.value,
                    })
                  }
                  checked={currentActivity.level === "A2"}
                />
                <label for="A2" className={`form-check-label btn btn-secondary btn-quark-radio ${currentActivity.level === "A2" ? "checked" : ""}`}>
                  A2
                </label>
                <input
                  type="radio"
                  value="B1"
                  id="B1"
                  className="btn-check"
                  name="score"
                  onChange={(e) =>
                    setCurrentActivity({
                      ...currentActivity,
                      level: e.target.value,
                    })
                  }
                  checked={currentActivity.level === "B1"}
                />
                <label for="B1" className={`form-check-label btn btn-secondary btn-quark-radio ${currentActivity.level === "B1" ? "checked" : ""}`}>
                  B1
                </label>
                <input
                  type="radio"
                  value="B2"
                  id="B2"
                  className="btn-check"
                  name="score"
                  onChange={(e) =>
                    setCurrentActivity({
                      ...currentActivity,
                      level: e.target.value,
                    })
                  }
                  checked={currentActivity.level === "B2"}
                />
                <label for="B2" className={`form-check-label btn btn-secondary btn-quark-radio ${currentActivity.level === "B2" ? "checked" : ""}`}>
                  B2
                </label>
                <input
                  type="radio"
                  value="C1"
                  id="C1"
                  className="btn-check"
                  name="score"
                  onChange={(e) =>
                    setCurrentActivity({
                      ...currentActivity,
                      level: e.target.value,
                    })
                  }
                  checked={currentActivity.level === "C1"}
                />
                <label for="C1" className={`form-check-label btn btn-secondary btn-quark-radio ${currentActivity.level === "C1" ? "checked" : ""}`}>
                  C1
                </label>
                <input
                  type="radio"
                  value="C2"
                  id="C2"
                  className="btn-check"
                  name="score"
                  onChange={(e) =>
                    setCurrentActivity({
                      ...currentActivity,
                      level: e.target.value,
                    })
                  }
                  checked={currentActivity.level === "C2"}
                />
                <label for="C2" className={`form-check-label btn btn-secondary btn-quark-radio ${currentActivity.level === "C2" ? "checked" : ""}`}>
                  C2
                </label>
              </div>
            </InputGroup>
          </Form>
        )}
        <Button type="submit" className="btn-quark" onClick={onSubmit}>
          Guardar
        </Button>
      </Modal.Body>
    </Modal>
  );
};
