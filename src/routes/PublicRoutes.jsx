import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import ComRegisterForm from "../components/comRegisterForm";
import DevRegisterForm from "../components/devRegisterForm";
import { IFrameComponent } from "../components/iFrameComponent";
import LoginForm from "../components/loginForm";
import { selectUser } from "../features/userSlice";
import { ConfirmRegisterDev } from "../pages/auth/confirmRegisterDev";
import Configuration from "../pages/configuration";
import { EventsAdmin } from "../pages/configuration/eventsAdmin";
import { FormAdmin } from "../pages/configuration/formAdmin";
import { NewsAdmin } from "../pages/configuration/newsAdmin";
import { ScholarshipsAdmin } from "../pages/configuration/scholarshipsAdmin";
import { Course } from "../pages/course";
import Events from "../pages/events/newEvent/Events";
import GameJam from "../pages/gameJam/GameJam";
import Home from "../pages/home";
import MyCourses from "../pages/myCourses";
import MasterView from "../pages/myCourses/MasterView";
import { MyProfile } from "../pages/myProfile";
import { EditProfesionalProfile } from "../pages/myProfile/profesionalProfile/editProfProfile";
import { Offer } from "../pages/offer";
import { Scholarships } from "../pages/scholarships";
import Error from "../components/error";

function PublicRoutes({setColapseDisabled}) {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  return (
    <>
      <Routes>
        {/*Public routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registerDev" element={<DevRegisterForm />} />
        <Route path="/registerCom" element={<ComRegisterForm />} />
        <Route
          path="/confirmRegisterDev/:id"
          element={<ConfirmRegisterDev />}
        />
        <Route path="*" element={<Error/>}/>

        {user && (
          <>
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/myCourses" element={<MasterView/>} />
            <Route exact path="/course/:id" element={<Course setColapseDisabled={setColapseDisabled} />} />
            <Route path="/events" element={<Events />} />
            <Route path="/offer" element={<Offer />} />
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/home" element={<Home />} />
            <Route path="/gameJam" element={<GameJam/>} />
          </>
        )}

        {user?.professionalprofile.role === 1 && (
          <>
            <Route path="/config" element={<Configuration />} />
            <Route path="/config/events" element={<EventsAdmin />} />
            <Route path="/config/news" element={<NewsAdmin />} />
            <Route path="/config/forms" element={<FormAdmin />} />
            <Route
              path="/config/scholarships"
              element={<ScholarshipsAdmin />}
            />
            <Route
              path="/config/adminMoodle"
              element={<IFrameComponent url="/admin/search.php" />}
            />
            <Route path="/config/formAdmin" element={<FormAdmin />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default PublicRoutes;
