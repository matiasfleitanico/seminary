import {Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";
import Identity from "./components/Identity";
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
        <Route path="/identidad" element={
          <ProtectedRoute>
            <Identity/>
          </ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
