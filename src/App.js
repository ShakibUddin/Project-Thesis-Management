import "antd/dist/antd.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Containers/Home/Home";
import LoginPage from "./Containers/Login/LoginPage";
import MainLayout from "./Containers/Main/MainLayout";
import Meetups from "./Containers/Meetups/Meetups";
import StudentProjectThesis from "./Containers/ProjectThesis/StudentProjectThesis";
import Settings from "./Containers/Settings/Settings";
import SignupPage from "./Containers/Signup/SignupPage";
import Team from "./Containers/Team/Team";
import PrivateRoutes from "./Utils/PrivateRoutes";
import StudentNotifications from "./Containers/Notifications/StudentNotifications";
import Proposals from "./Containers/Proposals/Proposals";
import ManageStudent from "./Containers/ManageStudent/ManageStudent";
import ManageSupervisor from "./Containers/ManageSupervisor/ManageSupervisor";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/" element={<MainLayout />}>
            <Route element={<PrivateRoutes />}>
              <Route path="home" element={<Home />} />
              <Route path="team" element={<Team />} />
              <Route path="proposals" element={<Proposals />} />
              <Route path="project" element={<StudentProjectThesis />} />
              <Route path="meetup" element={<Meetups />} />
              <Route path="settings" element={<Settings />} />
              <Route path="manage_students" element={<ManageStudent />} />
              <Route path="manage_supervisors" element={<ManageSupervisor />} />
            </Route>
          </Route>
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
