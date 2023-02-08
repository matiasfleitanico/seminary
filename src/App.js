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


        <Route path="/vino-nuevo" element={
          <ProtectedRoute>
            <NewWine/>
          </ProtectedRoute>} />
      </Routes>

    </AuthProvider>
  );
}

export default App;
