import "antd/dist/antd.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Containers/Home/Home";
import LoginPage from "./Containers/Login/LoginPage";
import MainLayout from "./Containers/Main/MainLayout";
import SupervisorMeetups from "./Containers/Meetups/SupervisorMeetups.jsx";
import StudentProjectThesis from "./Containers/ProjectThesis/StudentProjectThesis";
import Settings from "./Containers/Settings/Settings";
import SignupPage from "./Containers/Signup/SignupPage";
import Team from "./Containers/Team/Team";
import PrivateRoutes from "./Utils/PrivateRoutes";
import Proposals from "./Containers/Proposals/Proposals";
import ManageStudent from "./Containers/ManageStudent/ManageStudent";
import ManageSupervisor from "./Containers/ManageSupervisor/ManageSupervisor";
import StudentMeetups from "./Containers/Meetups/StudentMeetups";
import { useSelector } from "react-redux";
import NotFound from "./Containers/NotFound/NotFound";
import AccessDenied from "./Containers/AccessDenied/AccessDenied";
import AllProjects from "./Containers/AllProjects/AllProjects";
import Users from "./Containers/Users/Users";

function App() {
  let user = useSelector((state) => state.auth?.user);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<MainLayout />}>
              <Route path="home" element={<Home />} />
              <Route
                path="team"
                element={
                  user?.member_status_id === 1 ||
                  user?.member_status_id === 3 ? (
                    <Team />
                  ) : (
                    <AccessDenied />
                  )
                }
              />

              <Route
                path="proposals"
                element={
                  user?.member_status_id === 4 ? (
                    <Proposals />
                  ) : (
                    <AccessDenied />
                  )
                }
              />

              <Route
                path="all_projects"
                element={
                  user?.member_status_id === 4 ? (
                    <AllProjects />
                  ) : (
                    <AccessDenied />
                  )
                }
              />

              <Route
                path="manage_users"
                element={
                  user?.member_status_id === 4 ? <Users /> : <AccessDenied />
                }
              />

              <Route
                path="project"
                element={
                  user?.member_status_id === 1 ? (
                    <StudentProjectThesis />
                  ) : (
                    <AccessDenied />
                  )
                }
              />
              <Route
                path="supervisor_meetup"
                element={
                  user?.member_status_id === 1 ||
                  user?.member_status_id === 3 ? (
                    <SupervisorMeetups />
                  ) : (
                    <AccessDenied />
                  )
                }
              />
              <Route
                path="student_meetup"
                element={
                  user?.member_status_id === 1 ||
                  user?.member_status_id === 3 ? (
                    <StudentMeetups />
                  ) : (
                    <AccessDenied />
                  )
                }
              />
              <Route path="settings" element={<Settings />} />
              <Route
                path="manage_students"
                element={
                  user?.member_status_id === 5 ? (
                    <ManageStudent />
                  ) : (
                    <AccessDenied />
                  )
                }
              />
              <Route
                path="manage_supervisors"
                element={
                  user?.member_status_id === 5 ? (
                    <ManageSupervisor />
                  ) : (
                    <AccessDenied />
                  )
                }
              />
            </Route>
          </Route>

          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
