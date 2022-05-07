import 'antd/dist/antd.min.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Containers/Login/LoginPage";
import MainLayout from './Containers/Main/MainLayout';
import SignupPage from "./Containers/Signup/SignupPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="mainlayout" element={<MainLayout />} />
          <Route path="signin" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
