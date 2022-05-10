import 'antd/dist/antd.min.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentHome from './Containers/Home/StudentHome';
import LoginPage from "./Containers/Login/LoginPage";
import MainLayout from './Containers/Main/MainLayout';
import StudentMeetups from './Containers/Meetups/StudentMeetups';
import StudentProjectThesis from './Containers/ProjectThesis/StudentProjectThesis';
import StudentSettings from './Containers/Settings/StudentSettings';
import SignupPage from "./Containers/Signup/SignupPage";
import StudentTeam from './Containers/Team/StudentTeam';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/" element={<MainLayout />} >
            <Route path="home" element={<StudentHome />} />
            <Route path="team" element={<StudentTeam />} />
            <Route path="project" element={<StudentProjectThesis />} />
            <Route path="meetup" element={<StudentMeetups />} />
            <Route path="settings" element={<StudentSettings />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
