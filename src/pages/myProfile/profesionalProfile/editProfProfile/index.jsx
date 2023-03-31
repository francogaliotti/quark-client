// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { login, selectUser } from '../../../../features/userSlice';
// //import '../../../../styles/ProfilePage.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
// import Alert from '../../../../services/alertService';
// import { deletePrivate, getPrivate, getPublic, postPrivate, putPrivate } from '../../../../services/apiService';

// export function EditProfesionalProfile() {

//     const user = useSelector(selectUser);
//     const dispatch = useDispatch();

//     const [currentLanguage, setCurrentLanguage] = useState()
//     const [currentSkill, setCurrentSkill] = useState()
//     const [currentAcademic, setCurrentAcademic] = useState()
//     const [academics, setAcademics] = useState([])
//     const [currentLabor, setCurrentLabor] = useState()
//     const [labors, setLabors] = useState([])
//     const [currentIndependent, setCurrentIndependent] = useState()
//     const [independents, setIndependents] = useState([])

//     const [lanList, setLanList] = useState([]);
//     const [skillList, setSkillList] = useState([])

//     const addLanguage = async () => {
//         if (currentLanguage && currentLanguage.languageId && currentLanguage.level) {
//             var exist = false
//             user.languages.map((l) => {
//                 if (l.languageId === currentLanguage.languageId) {
//                     exist = true
//                 }
//             })
//             if (!exist) {
//                 Alert.confirm({ title: "Añadir idioma?" }, async () => {
//                     const res = await postPrivate(`/languages/create`, {
//                         userid: user.id,
//                         languages: {
//                             id: currentLanguage.languageId,
//                             level: currentLanguage.level
//                         }
//                     })
//                     console.log(res)
//                     Alert.success({ title: "Añadido!", message: "Idioma añadido" })
//                     await updateState('language')
//                     //setLanguages([...languages, { ...currentLanguage, id: res.data.id }])
//                 })
//             } else {
//                 Alert.error({ title: "Idioma existente" })
//             }
//         } else {
//             Alert.error({ title: "Faltan datos por ingresar" })
//         }
//     }

//     const deleteLanguage = async (lan) => {
//         console.log(lan)
//         Alert.confirm({ title: "Deseas eliminar este idioma?", message: "Esta acción es irreversible" }, async () => {
//             const res = await deletePrivate(`/languages/delete/${lan.id}`)
//             console.log(res)
//             Alert.success({ title: "Eliminado!", message: "Idioma eliminado" })
//             await updateState('language')
//             //setLanguages(languages.filter(l => l !== lan))
//         })
//     }

//     const addSkill = async () => {
//         if (currentSkill && currentSkill.skillId && currentSkill.score) {
//             var exist = false
//             user.skills.map((l) => {
//                 if (l.skillId === currentSkill?.skillId) {
//                     exist = true
//                 }
//             })
//             if (!exist) {
//                 Alert.confirm({ title: "Añadir habilidad?" }, async () => {
//                     const res = await postPrivate(`/skills/create`, {
//                         userid: user.id,
//                         skills: {
//                             id: currentSkill.skillId,
//                             score: currentSkill.score
//                         }
//                     })
//                     console.log(res)
//                     Alert.success({ title: "Añadido!", message: "Habilidad añadida" })
//                     await updateState('skill')
//                     //setSkills([...skills, { ...currentSkill, id: res.data.id }])
//                 })
//             } else {
//                 Alert.error({ title: "Halilidad existente" })
//             }
//         } else {
//             Alert.error({ title: "Faltan datos por ingresar" })
//         }
//     }

//     const deleteSkill = async (sk) => {
//         console.log(sk)
//         Alert.confirm({ title: 'Deseas quitar esta habilidad?', message: "Esta acción es irreversible" }, async () => {
//             const res = await deletePrivate(`/skills/delete/${sk.id}`)
//             Alert.success({ title: "Eliminado!", message: "Habilidad eliminada" })
//             await updateState('skill')
//             //setSkills(skills.filter(l => l !== sk))
//         })
//     }

//     const addActivity = async (type) => {
//         try {
//             switch (type) {
//                 case "academic":
//                     if (currentAcademic && currentAcademic.institution && currentAcademic.title && currentAcademic.state && currentAcademic.beginDate) {
//                         if (currentAcademic.state == "Finalizado") {
//                             if (!currentAcademic.endDate) {
//                                 Alert.error({ title: "Falta fecha de finalización." })
//                             } else {
//                                 await addAcademic()
//                             }
//                         } else {
//                             await addAcademic()
//                         }
//                     } else {
//                         Alert.error({ title: "Faltan datos por ingresar." })
//                     }
//                     break
//                 case "labor":
//                     if (currentLabor && currentLabor.company && currentLabor.title && currentLabor.state && currentLabor.beginDate) {
//                         if (currentLabor.state == "Finalizado") {
//                             if (!currentLabor.endDate) {
//                                 Alert.error({ title: "Falta fecha de finalización." })
//                             } else {
//                                 await addLabor()
//                             }
//                         } else {
//                             await addLabor()
//                         }
//                     } else {
//                         Alert.error({ title: "Faltan datos por ingresar." })
//                     }
//                     break
//                 case "independent":
//                     if (currentIndependent && currentIndependent.title && currentIndependent.state && currentIndependent.beginDate) {
//                         if (currentIndependent.state == "Finalizado") {
//                             if (!currentIndependent.endDate) {
//                                 Alert.error({ title: "Falta fecha de finalización." })
//                             } else {
//                                 await addIndependent()
//                             }
//                         } else {
//                             await addIndependent()
//                         }
//                     } else {
//                         Alert.error({ title: "Faltan datos por ingresar." })
//                     }
//                     break
//             }
//         } catch (e) {
//             console.log(e)
//             Alert.error({ title: "Error!", message: e.response.data.msg })
//         }
//     }

//     //Métodos de actividades académicas
//     const addAcademic = async () => {
//         if (!currentAcademic.edited) {
//             Alert.confirm({ title: 'Añadir actividad académica?' }, async () => {
//                 try {
                    
//                     const res = await postPrivate(`/academics/create`,
//                         {
//                             userid: user.id,
//                             academics: {
//                                 institution: currentAcademic.institution,
//                                 title: currentAcademic.title,
//                                 state: currentAcademic.state,
//                                 beginDate: currentAcademic.beginDate,
//                                 endDate: currentAcademic.endDate,
//                                 description: currentAcademic.description
//                             }
//                         })
//                     Alert.success({ title: 'Añadido!', message: "Actividad académica añadida" })
//                     await updateState('academic')
//                     setAcademics([...academics, { ...currentAcademic, id: res.data.id }])
//                     console.log(res)
//                 } catch (e) {
//                     Alert.error({ message: e.response?.data.msg })
//                 }
//             })
//         } else {
//             const res = await putPrivate(`/academics/update`, {
//                 id: currentAcademic.id,
//                 academics: {
//                     institution: currentAcademic.institution,
//                     title: currentAcademic.title,
//                     state: currentAcademic.state,
//                     beginDate: currentAcademic.beginDate,
//                     endDate: currentAcademic.endDate,
//                     description: currentAcademic.description
//                 }
//             })
//             Alert.success({ title: "Actualizado!", message: "Actividad académica actualizada" })
//             await updateState('academic')
//             setAcademics([...academics, currentAcademic])
//             console.log(res)
//         }
//         setCurrentAcademic({
//             ...currentAcademic,
//             institution: "",
//             title: "",
//             //state:"",
//             beginDate: "",
//             endDate: "",
//             description: "",
//             edited: false
//         })
//     }

//     const editAcademic = (ac) => {
//         Alert.confirm({ title: 'Deseas actualizar esta actividad?' }, () => {
//             let newCurrent = {
//                 ...ac,
//                 beginDate: new Date(ac.beginDate).toISOString().substring(0, 10),
//                 edited: true
//             }
//             if (ac.endDate) {
//                 newCurrent = {
//                     ...newCurrent,
//                     endDate: new Date(ac.endDate).toISOString().substring(0, 10),
//                 }
//             }
//             setCurrentAcademic(newCurrent)
//             setAcademics(academics.filter(l => l !== ac))
//         })
//     }

//     const deleteAcademic = async (ac) => {
        
//         Alert.confirm({ title: 'Deseas eliminar esta actividad?', message: 'Esta acción es ireeversible' }, async () => {
//             console.log(ac)
//             const res = await deletePrivate(`/academics/delete/${ac.id}`)
            
//             Alert.success({ title: "Eliminada!", message: 'Actividad eliminada' })
//             await updateState('academic')
            
//             setAcademics(academics.filter(l => l !== ac))
//         })
//     }

//     //Métodos de actividades laborales
//     const addLabor = async () => {
//         try {
//             if (!currentLabor.edited) {
//                 Alert.confirm({ title: 'Añadir actividad laboral?' }, async () => {
//                     try {
//                         const res = await postPrivate(`/labors/create`, {
//                             userid: user.id,
//                             labors: {
//                                 company: currentLabor.company,
//                                 title: currentLabor.title,
//                                 state: currentLabor.state,
//                                 beginDate: currentLabor.beginDate,
//                                 endDate: currentLabor.endDate,
//                                 description: currentLabor.description
//                             }
//                         })
//                         Alert.success({ title: "Añadida!", message: "Actividad laboral añadida" })
//                         await updateState('labor')
//                         setLabors([...labors, { ...currentLabor, id: res.data.labors.id }])
//                     } catch (e) {
//                         Alert.error({ message: e.response?.data.msg })
//                     }
//                 })
//             } else {
//                 console.log(currentLabor)
//                 Alert.success({ title: "Actualizada!", message: 'Actividad laboral actualizada' })
//                 await updateState('labor')
//                 setLabors([...labors, currentLabor])
//             }
//             setCurrentLabor({
//                 ...currentLabor,
//                 company: "",
//                 title: "",
//                 //state:"",
//                 beginDate: "",
//                 endDate: "",
//                 description: "",
//                 edited: false
//             })
//         } catch (e) {
//             Alert.error({ title: "Error!", message: e.response.data.msg })
//         }
//     }

//     const editLabor = (lab) => {
//         Alert.confirm({ title: "Deseas actualizar esta actividad?" }, () => {
//             let newCurrent = {
//                 ...lab,
//                 beginDate: new Date(lab.beginDate).toISOString().substring(0, 10),
//                 edited: true
//             }
//             if (lab.endDate) {
//                 newCurrent = {
//                     ...newCurrent,
//                     endDate: new Date(lab.endDate).toISOString().substring(0, 10),
//                 }
//             }
//             setCurrentLabor(newCurrent)
//             setLabors(labors.filter(l => l !== lab))
//         })
//     }

//     const deleteLabor = async (lab) => {
//         Alert.confirm({ title: 'Deseas eliminar esta actividad?', message: "Esta acción es irreversible" }, async () => {
//             const res = await deletePrivate(`/labors/delete/${lab.id}`)
//             Alert.success({ title: "Eliminada!", message: "Actividad eliminada" })
//             await updateState('labor')
//             setLabors(labors.filter(l => l !== lab))
//         })
//     }

//     const addIndependent = async () => {
//         if (!currentIndependent.edited) {
//             Alert.confirm({ title: 'Añadir actividad independiente?' }, async () => {
//                 try {
//                     const res = await postPrivate(`/independents/create`, {
//                         userid: user.id,
//                         independents: {
//                             title: currentIndependent.title,
//                             state: currentIndependent.state,
//                             beginDate: currentIndependent.beginDate,
//                             endDate: currentIndependent.endDate,
//                             description: currentIndependent.description
//                         }
//                     })
//                     Alert.success({ title: "Añadido!", message: "Actividad independiente añadida" })
//                     await updateState('independent')
//                     setIndependents([...independents, { ...currentIndependent, id: res.data.independent.id }])
//                 } catch (e) {
//                     Alert.error({ title: "Error!", message: e.response.data.msg })
//                 }
//             })
//         } else {
//             Alert.success({ title: "Actualizado!", message: 'Actividad independiente actualizada' })
//             await updateState('independent')
//             setIndependents([...independents, currentIndependent])
//         }
//         setCurrentIndependent({
//             ...currentIndependent,
//             title: "",
//             //state:"",
//             beginDate: "",
//             endDate: "",
//             description: "",
//             edited: false
//         })
//     }

//     const editIndependent = (ind) => {
//         Alert.confirm({ title: 'Deseas actualizar esta actividad?' }, () => {
//             let newCurrent = {
//                 ...ind,
//                 beginDate: new Date(ind.beginDate).toISOString().substring(0, 10),
//                 edited: true
//             }
//             if (ind.endDate) {
//                 newCurrent = {
//                     ...newCurrent,
//                     endDate: new Date(ind.endDate).toISOString().substring(0, 10),
//                 }
//             }
//             setCurrentIndependent(newCurrent)
//             setIndependents(independents.filter(l => l !== ind))
//         })
//     }

//     const deleteIndependent = async (ind) => {
//         Alert.confirm({ title: 'Deseas eliminar esta actividad?', message: "Esta acción es irreversible" }, async () => {
//             const res = await deletePrivate(`/independents/delete/${ind.id}`)
//             Alert.success({ title: "Eliminado", message: "Actividad eliminada" })
//             await updateState('independent')
//             setIndependents(independents.filter(l => l !== ind))
//         })
//     }

//     const fetchData = async () => {
//         //idiomas parametrizados
//         const languageList = await getPublic(`/parameters/languages`)
//         setLanList(languageList.data)
//         //habilidades parametrizadas
//         const skillsList = await getPublic(`/parameters/skills/${user.professionalprofile.career}`)
//         setSkillList(skillsList.data)
//     }

//     const setActivities = () => {
//         /*//idiomas del alumno
//         const langList = user.languages
//         setLanguages(langList)
//         //habilidades del alumno
//         const skList = user.skills
//         setSkills(skList)*/
//         //actividades académicas
//         const academicList = user.academicActivities
//         setAcademics(academicList)
//         //actividades laborales
//         const laborList = user.laborActivities
//         setLabors(laborList)
//         //actividades independientes
//         const indepList = user.independentActivities
//         setIndependents(indepList)
//     }

//     const updateState = async (act) => {
//         switch (act) {
//             case 'independent':
//                 const resInd = await getPrivate(`/independents/${user.id}`)
//                 dispatch(login({
//                     ...user,
//                     independentActivities: resInd.data
//                 }))
//                 break
//             case 'academic':
//                 const resAc = await getPrivate(`/academics/${user.id}`)
//                 dispatch(login({
//                     ...user,
//                     academicActivities: resAc.data
//                 }))
//                 break
//             case 'labor':
//                 const resLab = await getPrivate(`/labors/${user.id}`)
//                 dispatch(login({
//                     ...user,
//                     laborActivities: resLab.data
//                 }))
//                 break
//             case 'language':
//                 const resLan = await getPrivate(`/languages/${user.id}`)
//                 dispatch(login({
//                     ...user,
//                     languages: resLan.data.language
//                 }))
//                 break
//             case 'skill':
//                 const resSk = await getPrivate(`/skills/${user.id}`)
//                 dispatch(login({
//                     ...user,
//                     skills: resSk.data
//                 }))
//                 break
//         }
//         setActivities()
//     }

//     useEffect(() => {
//         fetchData()
//         setActivities()
//     }, []);

//     return (
//         <div className="profilePageContainer">

//             <div className="profesionalFormsContainer">
//                 <div className="aboutContainer">
//                     <h3>Actividad Académica</h3>
//                     {academics?.map(lan => {
//                         return (
//                             <div className="fillForms">
//                                 <div className="fillForm">
//                                     <label>Institución</label>
//                                     <label>{lan?.institution}</label>
//                                 </div>
//                                 <div className="fillForm">
//                                     <label>Título</label>
//                                     <label>{lan?.title}</label>
//                                 </div>
//                                 <div className="fillForm">
//                                     <label>Estado</label>
//                                     <label>{lan?.state}</label>
//                                 </div>
//                                 <div className="fillForm">
//                                     <label>Fecha de Inicio</label>
//                                     <label>{new Date(lan?.beginDate).toLocaleDateString("en-AU")}</label>
//                                 </div>
//                                 {lan?.endDate &&
//                                     <div className="fillForm">
//                                         <label>Fecha Finalización</label>
//                                         <label>{lan.endDate && new Date(lan?.endDate).toLocaleDateString("en-AU")}</label>
//                                     </div>}
//                                 {lan?.description &&
//                                     <div className="fillForm">
//                                         <label>Descripción</label>
//                                         <label id='activityDescription'>{lan?.description}</label>
//                                     </div>}

//                                 <div className="crudButtons">
//                                     <button className='plus' onClick={() => editAcademic(lan)}><FontAwesomeIcon icon={faPenToSquare} /></button>
//                                     <button className='plus' onClick={() => deleteAcademic(lan)}><FontAwesomeIcon icon={faTrashCan} /></button>
//                                 </div>
//                             </div>

//                         )
//                     })}
//                     <div className="fillForms">
//                         <div className="fillForm">
//                             <label>Institución</label>
//                             <input type="text" value={currentAcademic?.institution} onChange={(event) => { setCurrentAcademic({ ...currentAcademic, institution: event.target.value }) }} />
//                         </div>
//                         <div className="fillForm">
//                             <label>Título</label>
//                             <input type="text" value={currentAcademic?.title} onChange={(event) => { setCurrentAcademic({ ...currentAcademic, title: event.target.value }) }} />
//                         </div>
//                         <div className="fillForm">
//                             <label>Estado</label>
//                             <select name="" id="" onChange={(event) => { setCurrentAcademic({ ...currentAcademic, state: event.target.value }) }}>
//                                 <option value=""></option>
//                                 <option value="En curso">En curso</option>
//                                 <option value="Finalizado">Finalizado</option>
//                             </select>
//                         </div>
//                         <div className="fillForm">
//                             <label>Fecha de Inicio</label>
//                             <input type="date" value={currentAcademic?.beginDate} onChange={(event) => { setCurrentAcademic({ ...currentAcademic, beginDate: event.target.value }) }} />
//                         </div>
//                         <div className="fillForm">
//                             <label>Fecha Finalización</label>
//                             <input type="date" value={currentAcademic?.endDate} onChange={(event) => { setCurrentAcademic({ ...currentAcademic, endDate: event.target.value }) }} />
//                         </div>
//                         <div className="fillForm">
//                             <label>Descripción</label>
//                             <textarea type="date" value={currentAcademic?.description} onChange={(event) => { setCurrentAcademic({ ...currentAcademic, description: event.target.value }) }} />
//                         </div>
//                     </div>

//                     <button className='plus' onClick={() => addActivity("academic")}><FontAwesomeIcon icon={faPlus} /></button>

//                 </div>

//                 <div className="aboutContainer">
//                     <h3>Actividad Laboral</h3>
//                     {labors?.map(lan => {
//                         return (
//                             <div className="fillForms">
//                                 <div className="fillForm">
//                                     <label>Empresa</label>
//                                     <label>{lan?.company}</label>
//                                 </div>
//                                 <div className="fillForm">
//                                     <label>Título</label>
//                                     <label>{lan?.title}</label>
//                                 </div>
//                                 <div className="fillForm">
//                                     <label>Estado</label>
//                                     <label>{lan?.state}</label>
//                                 </div>
//                                 <div className="fillForm">
//                                     <label>Fecha de Inicio</label>
//                                     <label>{new Date(lan?.beginDate).toLocaleDateString("en-AU")}</label>
//                                 </div>
//                                 {lan?.endDate &&
//                                     <div className="fillForm">
//                                         <label>Fecha Finalización</label>
//                                         <label>{lan.endDate && new Date(lan?.endDate).toLocaleDateString("en-AU")}</label>
//                                     </div>}
//                                 {lan?.description &&
//                                     <div className="fillForm">
//                                         <label>Descripción</label>
//                                         <label id='activityDescription'>{lan?.description}</label>
//                                     </div>}
//                                 <button className='plus' onClick={() => editLabor(lan)}><FontAwesomeIcon icon={faPenToSquare} /></button>
//                                 <button className='plus' onClick={() => deleteLabor(lan)}><FontAwesomeIcon icon={faTrashCan} /></button>
//                             </div>

//                         )
//                     })}
//                     <div className="fillForms">
//                         <div className="fillForm">
//                             <label>Empresa</label>
//                             <input type="text" value={currentLabor?.company} onChange={(event) => { setCurrentLabor({ ...currentLabor, company: event.target.value }) }} />
//                         </div>
//                         <div className="fillForm">
//                             <label>Título</label>
//                             <input type="text" value={currentLabor?.title} onChange={(event) => { setCurrentLabor({ ...currentLabor, title: event.target.value }) }} />
//                         </div>
//                         <div className="fillForm">
//                             <label>Estado</label>
//                             <select name="" id="" onChange={(event) => { setCurrentLabor({ ...currentLabor, state: event.target.value }) }}>
//                                 <option value=""></option>
//                                 <option value="En curso">En curso</option>
//                                 <option value="Finalizado">Finalizado</option>
//                             </select>
//                         </div>
//                         <div className="fillForm">
//                             <label>Fecha de Inicio</label>
//                             <input type="date" value={currentLabor?.beginDate} onChange={(event) => { setCurrentLabor({ ...currentLabor, beginDate: event.target.value }) }} />
//                         </div>
//                         <div className="fillForm">
//                             <label>Fecha Finalización</label>
//                             <input type="date" value={currentLabor?.endDate} onChange={(event) => { setCurrentLabor({ ...currentLabor, endDate: event.target.value }) }} />
//                         </div>
//                         <div className="fillForm">
//                             <label>Descripción</label>
//                             <textarea type="date" value={currentLabor?.description} onChange={(event) => { setCurrentLabor({ ...currentLabor, description: event.target.value }) }} />
//                         </div>

//                     </div>

//                     <button className='plus' onClick={() => addActivity("labor")}><FontAwesomeIcon icon={faPlus} /></button>

//                 </div>

//                 <div className="aboutContainer">
//                     <h3>Actividad Independiente</h3>
//                     {independents?.map(lan => {
//                         return (
//                             <div className="fillForms">
//                                 <div className="fillForm">
//                                     <label>Título</label>
//                                     <label>{lan?.title}</label>
//                                 </div>
//                                 <div className="fillForm">
//                                     <label>Estado</label>
//                                     <label>{lan?.state}</label>
//                                 </div>
//                                 <div className="fillForm">
//                                     <label>Fecha de Inicio</label>
//                                     <label>{new Date(lan?.beginDate).toLocaleDateString("en-AU")}</label>
//                                 </div>
//                                 {lan?.endDate &&
//                                     <div className="fillForm">
//                                         <label>Fecha Finalización</label>
//                                         <label>{lan.endDate && new Date(lan?.endDate).toLocaleDateString("en-AU")}</label>
//                                     </div>}
//                                 {lan?.description &&
//                                     <div className="fillForm">
//                                         <label>Descripción</label>
//                                         <label id='activityDescription'>{lan?.description}</label>
//                                     </div>}
//                                 <button className='plus' onClick={() => editIndependent(lan)}><FontAwesomeIcon icon={faPenToSquare} /></button>
//                                 <button className='plus' onClick={() => deleteIndependent(lan)}><FontAwesomeIcon icon={faTrashCan} /></button>
//                             </div>

//                         )
//                     })}
//                     <div className="fillForms">
//                         <div className="fillForm">
//                             <label>Título</label>
//                             <input type="text" value={currentIndependent?.title} onChange={(event) => { setCurrentIndependent({ ...currentIndependent, title: event.target.value }) }} />
//                         </div>
//                         <div className="fillForm">
//                             <label>Estado</label>
//                             <select name="" id="" onChange={(event) => { setCurrentIndependent({ ...currentIndependent, state: event.target.value }) }}>
//                                 <option value=""></option>
//                                 <option value="En curso">En curso</option>
//                                 <option value="Finalizado">Finalizado</option>
//                             </select>
//                         </div>
//                         <div className="fillForm">
//                             <label>Fecha de Inicio</label>
//                             <input type="date" value={currentIndependent?.beginDate} onChange={(event) => { setCurrentIndependent({ ...currentIndependent, beginDate: event.target.value }) }} />
//                         </div>
//                         <div className="fillForm">
//                             <label>Fecha Finalización</label>
//                             <input type="date" value={currentIndependent?.endDate} onChange={(event) => { setCurrentIndependent({ ...currentIndependent, endDate: event.target.value }) }} />
//                         </div>
//                         <div className="fillForm">
//                             <label>Descripción</label>
//                             <textarea type="date" value={currentIndependent?.description} onChange={(event) => { setCurrentIndependent({ ...currentIndependent, description: event.target.value }) }} />
//                         </div>

//                     </div>

//                     <button className='plus' onClick={() => addActivity("independent")}><FontAwesomeIcon icon={faPlus} /></button>

//                 </div>


//                 <div className="aboutContainer">
//                     <h3>Idiomas</h3>
//                     {user.languages?.map(lan => {
//                         return (
//                             <div className="fillForms">
//                                 <div className="fillForm">
//                                     <label>Idioma</label>
//                                     <label>{lan?.language.name}</label>
//                                 </div>
//                                 <div className="fillForm">
//                                     <label>Nivel</label>
//                                     <label>{lan?.level}</label>
//                                 </div>
//                                 <button className='plus' onClick={() => deleteLanguage(lan)}><FontAwesomeIcon icon={faTrashCan} /></button>
//                             </div>
//                         )
//                     })}
//                     <div className="fillForms">
//                         <div className="fillForm">
//                             <label>Idioma</label>
//                             <select onChange={(v) => {
//                                 const languagesSelected = lanList.filter((l) => l.id == v.target.value)
//                                 const languageSelected = languagesSelected[0]
//                                 setCurrentLanguage({ ...currentLanguage, language: languageSelected?.name, languageId: languageSelected?.id })
//                             }} id="">
//                                 <option value=""></option>
//                                 {lanList.map((l) => {
//                                     return (<option value={l.id}>{l.name}</option>)
//                                 })}
//                             </select>
//                         </div>
//                         <div className="fillForm">
//                             <label>Nivel</label>
//                             <select onChange={(v) => setCurrentLanguage({ ...currentLanguage, level: v.target.value })} id="">
//                                 <option value=""></option>
//                                 <option value="C2">C2</option>
//                                 <option value="C1">C1</option>
//                                 <option value="B2">B2</option>
//                                 <option value="B1">B1</option>
//                                 <option value="A2">A2</option>
//                                 <option value="A1">A1</option>
//                             </select>
//                         </div>

//                     </div>

//                     <button className='plus' onClick={() => addLanguage()}><FontAwesomeIcon icon={faPlus} /></button>
//                 </div>

//                 <div className="aboutContainer">
//                     <h3>Habilidades</h3>
//                     {user.skills?.map(sk => {
//                         return (
//                             <div className="fillForms">
//                                 <div className="fillForm">
//                                     <label>Habilidad</label>
//                                     <label>{sk?.skill?.name}</label>
//                                 </div>
//                                 <div className="fillForm">
//                                     <label>Puntaje</label>
//                                     <label>{sk?.score}</label>
//                                 </div>
//                                 <button className='plus' onClick={() => deleteSkill(sk)}><FontAwesomeIcon icon={faTrashCan} /></button>
//                             </div>
//                         )
//                     })}
//                     <div className="fillForms">
//                         <div className="fillForm">
//                             <label>Habilidad</label>
//                             <select onChange={(v) => {
//                                 const skillsSelected = skillList.filter((l) => l.id == v.target.value)
//                                 const skillSelected = skillsSelected[0]
//                                 setCurrentSkill({ ...currentSkill, skill: skillSelected?.name, skillId: skillSelected?.id })
//                             }} id="">
//                                 <option value=""></option>
//                                 {skillList.map((l) => {
//                                     return (<option value={l.id}>{l.name}</option>)
//                                 })}
//                             </select>
//                         </div>
//                         <div className="fillForm" id='radiosForm'>
//                             <label>Puntaje</label>
//                             <div className='inputRadios'>
//                                 <input type="radio" value="1" id='1' name='score' onChange={(e) => setCurrentSkill({ ...currentSkill, score: e.target.value })} />
//                                 <label for="1">1</label>
//                                 <input type="radio" value="2" id='2' name='score' onChange={(e) => setCurrentSkill({ ...currentSkill, score: e.target.value })} />
//                                 <label for="2">2</label>
//                                 <input type="radio" value="3" id='3' name='score' onChange={(e) => setCurrentSkill({ ...currentSkill, score: e.target.value })} />
//                                 <label for="3">3</label>
//                                 <input type="radio" value="4" id='4' name='score' onChange={(e) => setCurrentSkill({ ...currentSkill, score: e.target.value })} />
//                                 <label for="4">4</label>
//                                 <input type="radio" value="5" id='5' name='score' onChange={(e) => setCurrentSkill({ ...currentSkill, score: e.target.value })} />
//                                 <label for="5">5</label>
//                             </div>
//                         </div>

//                     </div>

//                     <button className='plus' onClick={() => addSkill()}><FontAwesomeIcon icon={faPlus} /></button>
//                 </div>
//             </div >
//         </div >
//     )
// }
