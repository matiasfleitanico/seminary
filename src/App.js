import {Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";

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



import { AuthProvider } from "./context/authContext"


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
          } />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

/*Identidad */
        <Route path="/identidad/1" element={
          <ProtectedRoute>
            <IdentityOne/>
          </ProtectedRoute>} />

        <Route path="/identidad/2" element={
          <ProtectedRoute>
            <IdentityTwo/>
          </ProtectedRoute>} />

        <Route path="/identidad/3" element={
          <ProtectedRoute>
            <IdentityThree/>
          </ProtectedRoute>} />

        <Route path="/identidad/4" element={
          <ProtectedRoute>
            <IdentityFourth/>
          </ProtectedRoute>} />

        <Route path="/identidad/5" element={
          <ProtectedRoute>
            <IdentityFiveth/>
          </ProtectedRoute>} />


/* Vino Nuevo */
          <Route path="/vinonuevo/1" element={
          <ProtectedRoute>
            <NewWineOne/>
          </ProtectedRoute>} />
          <Route path="/vinonuevo/2" element={
          <ProtectedRoute>
            <NewWineTwo/>
          </ProtectedRoute>} />
          <Route path="/vinonuevo/3" element={
          <ProtectedRoute>
            <NewWineThree/>
          </ProtectedRoute>} />
          <Route path="/vinonuevo/4" element={
          <ProtectedRoute>
            <NewWineFourth/>
          </ProtectedRoute>} />
          <Route path="/vinonuevo/5" element={
          <ProtectedRoute>
            <NewWineFiveth/>
          </ProtectedRoute>} />
          <Route path="/vinonuevo/6" element={
          <ProtectedRoute>
            <NewWineSixth/>
          </ProtectedRoute>} />

          <Route path="/espiritusanto/1" element={
          <ProtectedRoute>
            <HolySpiritOne/>
          </ProtectedRoute>} />
          <Route path="/espiritusanto/2" element={
          <ProtectedRoute>
            <HolySpiritTwo/>
          </ProtectedRoute>} />
          <Route path="/espiritusanto/3" element={
          <ProtectedRoute>
            <HolySpiritThree/>
          </ProtectedRoute>} />
          <Route path="/espiritusanto/4" element={
          <ProtectedRoute>
            <HolySpiritFourth/>
          </ProtectedRoute>} />
          <Route path="/espiritusanto/5" element={
          <ProtectedRoute>
            <HolySpiritFiveth/>
          </ProtectedRoute>} />
          <Route path="/espiritusanto/6" element={
          <ProtectedRoute>
            <HolySpiritSixth/>
          </ProtectedRoute>} />


 
          <Route path="/oracionyguerra/1" element={
          <ProtectedRoute>
            <SpiritWarfareOne/>
          </ProtectedRoute>} />
          <Route path="/oracionyguerra/2" element={
          <ProtectedRoute>
            <SpiritWarfareTwo/>
          </ProtectedRoute>} />
          <Route path="/oracionyguerra/3" element={
          <ProtectedRoute>
            <SpiritWarfareThree/>
          </ProtectedRoute>} />
          <Route path="/oracionyguerra/4" element={
          <ProtectedRoute>
            <SpiritWarfareFourth/>
          </ProtectedRoute>} />
          <Route path="/oracionyguerra/5" element={
          <ProtectedRoute>
            <SpiritWarfareFiveth/>
          </ProtectedRoute>} />
          <Route path="/oracionyguerra/6" element={
          <ProtectedRoute>
            <SpiritWarfareSixth/>
          </ProtectedRoute>} />




          <Route path="/hermeneutica/1" element={
          <ProtectedRoute>
            <HermeneuticsOne/>
          </ProtectedRoute>} />
          <Route path="/hermeneutica/2" element={
          <ProtectedRoute>
            <HermeneuticsTwo/>
          </ProtectedRoute>} />
          <Route path="/hermeneutica/3" element={
          <ProtectedRoute>
            <HermeneuticsThree/>
          </ProtectedRoute>} />
          <Route path="/hermeneutica/4" element={
          <ProtectedRoute>
            <HermeneuticsFourth/>
          </ProtectedRoute>} />
          <Route path="/hermeneutica/5" element={
          <ProtectedRoute>
            <HermeneuticsFiveth/>
          </ProtectedRoute>} />



          <Route path="/evangeliossinopticos/1" element={
          <ProtectedRoute>
            <SynopticOne/>
          </ProtectedRoute>} />
          <Route path="/evangeliossinopticos/2" element={
          <ProtectedRoute>
            <SynopticTwo/>
          </ProtectedRoute>} />
          <Route path="/evangeliossinopticos/3" element={
          <ProtectedRoute>
            <SynopticThree/>
          </ProtectedRoute>} />
          <Route path="/evangeliossinopticos/4" element={
          <ProtectedRoute>
            <SynopticFourth/>
          </ProtectedRoute>} />
          <Route path="/evangeliossinopticos/5" element={
          <ProtectedRoute>
            <SynopticFiveth/>
          </ProtectedRoute>} />
          <Route path="/evangeliossinopticos/6" element={
          <ProtectedRoute>
            <SynopticSixth/>
          </ProtectedRoute>} />
          <Route path="/evangeliossinopticos/7" element={
          <ProtectedRoute>
            <SynopticSeven/>
          </ProtectedRoute>} />
          <Route path="/evangeliossinopticos/8" element={
          <ProtectedRoute>
            <SynopticEight/>
          </ProtectedRoute>} />


          <Route path="/escatologia/1" element={
          <ProtectedRoute>
            <EschatologyOne/>
          </ProtectedRoute>} />
          <Route path="/escatologia/2" element={
          <ProtectedRoute>
            <EschatologyTwo/>
          </ProtectedRoute>} />
          <Route path="/escatologia/3" element={
          <ProtectedRoute>
            <EschatologyThree/>
          </ProtectedRoute>} />
          <Route path="/escatologia/4" element={
          <ProtectedRoute>
            <EschatologyFourth/>
          </ProtectedRoute>} />
          <Route path="/escatologia/5" element={
          <ProtectedRoute>
            <EschatologyFiveth/>
          </ProtectedRoute>} />
          <Route path="/escatologia/6" element={
          <ProtectedRoute>
            <EschatologySixth/>
          </ProtectedRoute>} />
          <Route path="/escatologia/7" element={
          <ProtectedRoute>
            <EschatologySeven/>
          </ProtectedRoute>} />


        <Route path="/vino-nuevo" element={
          <ProtectedRoute>
            <NewWine/>
          </ProtectedRoute>} />
      </Routes>

    </AuthProvider>
  );
}

export default App;
