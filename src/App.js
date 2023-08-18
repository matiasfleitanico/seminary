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
import Search from "./components/Search";
import Materias from "./components/Materias"
import Foro from "./components/Foro";
import Sidebar from "./components/Sidebar";

import IdentityOne from "./components/Identity/IdentityOne";
import IdentityTwo from "./components/Identity/IdentityTwo";
import IdentityThree from "./components/Identity/IdentityThree";
import IdentityFourth from "./components/Identity/IdentityFourth";
import IdentityFiveth from "./components/Identity/IdentityFiveth";

import NewWineOne from "./components/NewWine/NewWineOne";
import NewWineTwo from "./components/NewWine/NewWineTwo";
import NewWineThree from "./components/NewWine/NewWineThree";
import NewWineFourth from "./components/NewWine/NewWineFourth";
import NewWineFiveth from "./components/NewWine/NewWineFiveth";
import NewWineSixth from "./components/NewWine/NewWineSixth";

import NewWine from "./components/NewWinBase";

import HolySpiritOne from "./components/HolySpirit/HolySpiritOne";
import HolySpiritTwo from "./components/HolySpirit/HolySpiritTwo";
import HolySpiritThree from "./components/HolySpirit/HolySpiritThree";
import HolySpiritFourth from "./components/HolySpirit/HolySpiritFourth";
import HolySpiritFiveth from "./components/HolySpirit/HolySpiritFiveth";
import HolySpiritSixth from "./components/HolySpirit/HolySpiritSixth";

import SpiritWarfareOne from "./components/SpiritWarfare/SpiritWarfareOne";
import SpiritWarfareTwo from "./components/SpiritWarfare/SpiritWarfareTwo";
import SpiritWarfareThree from "./components/SpiritWarfare/SpiritWarfareThree";
import SpiritWarfareFourth from "./components/SpiritWarfare/SpiritWarfareFourth";
import SpiritWarfareFiveth from "./components/SpiritWarfare/SpiritWarfareFiveth";
import SpiritWarfareSixth from "./components/SpiritWarfare/SpiritWarfareSixth";

import HermeneuticsOne from "./components/Hermeneutics/HermeneuticsOne";
import HermeneuticsTwo from "./components/Hermeneutics/HermeneuticsTwo";
import HermeneuticsThree from "./components/Hermeneutics/HermeneuticsThree";
import HermeneuticsFourth from "./components/Hermeneutics/HermeneuticsFourth";
import HermeneuticsFiveth from "./components/Hermeneutics/HermeneuticsFiveth";

import SynopticOne from "./components/Synoptic/SynopticOne";
import SynopticTwo from "./components/Synoptic/SynopticTwo";
import SynopticThree from "./components/Synoptic/SynopticThree";
import SynopticFourth from "./components/Synoptic/SynopticFourth";
import SynopticFiveth from "./components/Synoptic/SynopticFiveth";
import SynopticSixth from "./components/Synoptic/SynopticSixth";
import SynopticSeven from "./components/Synoptic/SynopticSeven";
import SynopticEight from "./components/Synoptic/SynopticEight";

import EschatologyOne from "./components/Eschatology/EschatologyOne";
import EschatologyTwo from "./components/Eschatology/EschatologyTwo";
import EschatologyThree from "./components/Eschatology/EschatologyThree";
import EschatologyFourth from "./components/Eschatology/EschatologyFourth";
import EschatologyFiveth from "./components/Eschatology/EschatologyFiveth";
import EschatologySixth from "./components/Eschatology/EschatologySixth";
import EschatologySeven from "./components/Eschatology/EschatologySeven";

import OverallHealthOne from "./components/OverallHealth/OverallHealthOne";
import OverallHealthTwo from "./components/OverallHealth/OverallHealthTwo";
import OverallHealthThree from "./components/OverallHealth/OverallHealthThree";
import OverallHealthFourth from "./components/OverallHealth/OverallHealthFourth";
import OverallHealthFiveth from "./components/OverallHealth/OverallHealthFiveth";

import RevivalOne from "./components/Revival/RevivalOne";
import RevivalTwo from "./components/Revival/RevivalTwo";
import RevivalThree from "./components/Revival/RevivalThree";
import RevivalFourth from "./components/Revival/RevivalFourth";
import RevivalFiveth from "./components/Revival/RevivalFiveth";
import RevivalSixth from "./components/Revival/RevivalSixth";
import RevivalSeven from "./components/Revival/RevivalSeven";
import RevivalEight from "./components/Revival/RevivalEight";

import FundamentsOne from "./components/Fundaments/FundamentsOne";
import FundamentsTwo from "./components/Fundaments/FundamentsTwo";
import FundamentsThree from "./components/Fundaments/FundamentsThree";
import FundamentsFourth from "./components/Fundaments/FundamentsFourth";
import FundamentsFiveth from "./components/Fundaments/FundamentsFiveth";  

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
                     <div class="maintenance-page">
                  <div class="robot">😢</div>
                  <div class="message">Estamos en mantenimiento, disculpen las molestias</div>
                </div>
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
        /*Materias */
        <Route
          path="/materias"
          element={
            <ProtectedRoute>
              <Materias />
            </ProtectedRoute>
          }
        />
        /*Foro */
        <Route
          path="/foro"
          element={
            <ProtectedRoute>
              <Foro />
            </ProtectedRoute>
          }
        />
      
        /*Identidad */
        <Route
          path="/identidad"
          element={
            <ProtectedRoute>
              <Subject pathname={"identidad"} />
            </ProtectedRoute>
          }
        />
        
        /* Vino Nuevo */
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
          path="/evangeliossinopticos"
          element={
            <ProtectedRoute>
              <Subject pathname={"evangelios"} />
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
