import "antd/dist/antd.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentHome from "./Containers/Home/StudentHome";
import LoginPage from "./Containers/Login/LoginPage";
import MainLayout from "./Containers/Main/MainLayout";
import Meetups from "./Containers/Meetups/Meetups";
import StudentProjectThesis from "./Containers/ProjectThesis/StudentProjectThesis";
import StudentSettings from "./Containers/Settings/StudentSettings";
import SignupPage from "./Containers/Signup/SignupPage";
import Team from "./Containers/Team/Team";
import PrivateRoutes from "./Utils/PrivateRoutes";
import StudentNotifications from "./Containers/Notifications/StudentNotifications";
import Proposals from "./Containers/Proposals/Proposals";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/" element={<MainLayout />}>
            <Route element={<PrivateRoutes />}>
              <Route path="home" element={<StudentHome />} />
              <Route path="team" element={<Team />} />
              <Route path="proposals" element={<Proposals />} />
              <Route path="project" element={<StudentProjectThesis />} />
              <Route path="meetup" element={<Meetups />} />
              <Route path="settings" element={<StudentSettings />} />
            </Route>
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
