import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import QuizManagement from "./Components/Dashboard/Admin Dashboard/QuizManagement.jsx";
import StudentsList from "./Components/Dashboard/Admin Dashboard/StudentsList.jsx";
import ContactList from "./Components/Dashboard/Admin Dashboard/ContactList.jsx";
import HomePage from "./Components/Home/HomePage.jsx";
import { Contactpage } from "./Components/Home/Contact/Contactpage.jsx";
import Servicepage from "./Components/Home/Service/Servicepage.jsx";
import Aboutpage1 from "./Components/Home/About/Aboutpage.jsx";
import { Register } from "./Components/Registration/Register.jsx";
import Login from "./Components/AuthLogin/Login.jsx";
import Dashboard from "./Components/Dashboard/Admin Dashboard/Dashboard.jsx";
import Quizpage from "./Components/Dashboard/User Dashboard/Quizpage.jsx";
import StartQuizList from "./Components/Dashboard/User Dashboard/StartQuizList.jsx";
import TakeQuiz from "./Components/Dashboard/User Dashboard/TakeQuiz.jsx";
import UserScores from "./Components/Dashboard/User Dashboard/UserScores.jsx";
import { PrivateRoute } from "./Components/services/PrivateRoute.jsx";
import { ROLES } from "./Components/services/RoleService.js";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<Aboutpage1 />} />
        <Route path="/services" element={<Servicepage />} />
        <Route path="/contact" element={<Contactpage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/quizzes" element={<QuizManagement />} />
          <Route path="/admin/students" element={<StudentsList />} />
          <Route path="/admin/contacts" element={<ContactList />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={[ROLES.USER]} />}>
          <Route path="/user/dashboard" element={<Quizpage />} />
          <Route path="/start-quiz" element={<StartQuizList />} />
          <Route path="/start-quiz/:quizId" element={<TakeQuiz />} />
          <Route path="/view-score" element={<UserScores />} />
        </Route>
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
}
