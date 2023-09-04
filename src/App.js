import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";
import Settings from "./components/Settings";
import Account from "./components/Account";
import Admin from "./components/Admin";
import AdminUsers from "./components/AdminUsers";
import AdminNotifications from "./components/AdminNotifications";
import AdminFiles from "./components/AdminFiles";
import Materias from "./components/Materias"
import Foro from "./components/Foro";
import Sidebar from "./components/Sidebar";


import OldTestamentOne from "./components/OldTestament/OldTestamentOne";
import OldTestamentTwo from "./components/OldTestament/OldTestamentTwo";
import OldTestamentThree from "./components/OldTestament/OldTestamentThree";
import OldTestamentFourth from "./components/OldTestament/OldTestamentFourth";
import OldTestamentFiveth from "./components/OldTestament/OldTestamentFiveth";


import Subject from "./components/subject/Subject"
import SubjectEdit from "./components/subject/SubjectEdit"

import { AuthProvider } from "./context/authContext";
import "./components/FilesCss/app.css"

function App() {
  const [activeIcon, setActiveIcon] = useState("book");
  // Actualizar activeIcon cuando cambie la ruta
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === '/') setActiveIcon('home');
    else if (currentPath === '/materias') setActiveIcon('book');
    else if (currentPath === '/foro') setActiveIcon('search');
    else if (currentPath === '/cuenta'|| currentPath === '/admin'|| currentPath === '/admin/notifications'|| currentPath === '/admin/users') setActiveIcon('account');
    else if (currentPath === '/configuracion') setActiveIcon('settings');
  }, []);
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/configuracion"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cuenta"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/files"
          element={
            <ProtectedRoute>
              <AdminFiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/subject"
          element={
            <ProtectedRoute>
              <SubjectEdit />
            </ProtectedRoute>
          }
        />
                <Route
          path="/admin/notifications"
          element={
            <ProtectedRoute>
              <AdminNotifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buscar"
          element={
            <ProtectedRoute>
              <Foro />
            </ProtectedRoute>
          }
        />

        <Route
          path="/materias"
          element={
            <ProtectedRoute>
              <Materias />
            </ProtectedRoute>
          }
        />

        <Route
          path="/foro"
          element={
            <ProtectedRoute>
              <Foro />
            </ProtectedRoute>
          }
        />
      

        <Route
          path="/identidad"
          element={
            <ProtectedRoute>
              <Subject pathname={"identidad"} />
            </ProtectedRoute>
          }
        />
        
        
        <Route
          path="/antiguotestamento"
          element={
            <ProtectedRoute>
              <Subject pathname={"antiguotestamento"} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vinonuevo"
          element={
            <ProtectedRoute>
              <Subject pathname={"vinonuevo"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/espiritusanto"
          element={
            <ProtectedRoute>
              <Subject pathname={"espiritusanto"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/oracion"
          element={
            <ProtectedRoute>
              <Subject pathname={"oracion"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hermeneutica"
          element={
            <ProtectedRoute>
              <Subject pathname={"hermeneutica"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/evangelios"
          element={
            <ProtectedRoute>
              <Subject pathname={"evangeliossinopticos"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/escatologia"
          element={
            <ProtectedRoute>
              <Subject pathname={"escatologia"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/salud"
          element={
            <ProtectedRoute>
              <Subject pathname={"salud"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/avivamiento"
          element={
            <ProtectedRoute>
              <Subject pathname={"avivamiento"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fundamentos"
          element={
            <ProtectedRoute>
              <Subject pathname={"fundamentos"} />
            </ProtectedRoute>
          }
        />


        <Route
          path="/antiguo/1"
          element={
            <ProtectedRoute>
              <OldTestamentOne />
            </ProtectedRoute>
          }
        />
        <Route
          path="/antiguo/2"
          element={
            <ProtectedRoute>
              <OldTestamentTwo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/antiguo/3"
          element={
            <ProtectedRoute>
              <OldTestamentThree />
            </ProtectedRoute>
          }
        />
        <Route
          path="/antiguo/4"
          element={
            <ProtectedRoute>
              <OldTestamentFourth />
            </ProtectedRoute>
          }
        />
        <Route
          path="/antiguo/5"
          element={
            <ProtectedRoute>
              <OldTestamentFiveth />
            </ProtectedRoute>
          }
        />


        
      </Routes>
      <Sidebar activeIcon={activeIcon} />
    </AuthProvider>
  );
}

export default App;
