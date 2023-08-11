import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import "./FilesCss/Admin.css";
import {
  AiFillHome,
  AiOutlineSearch,
  AiFillSetting,
  AiFillBook,
} from 'react-icons/ai';  
import { RiAccountCircleFill } from 'react-icons/ri';

export default function App() {
  const { user } = useAuth();
  const [fetchedData, setFetchedData] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userAccessData, setUserAccessData] = useState(null);
  const [courseId, setCourseId] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://tecno-museo-default-rtdb.firebaseio.com/seminary/back-data.json?auth=" +
            user.accessToken
        );
        const data = await response.json();
        setFetchedData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);
  const [selectedUserCourses, setSelectedUserCourses] = useState({});
  const handleUserClick = async (userInfo) => {
    setSelectedUser(userInfo);
    setEditorOpen(true);
    try {
      const response = await fetch(
        `https://tecno-museo-default-rtdb.firebaseio.com/seminary/access/${userInfo.user}.json`
      );
      const accessData = await response.json();
      setUserAccessData(accessData);
    } catch (error) {
      console.error('Error fetching user access data:', error);
    }
  };
  const fetchAccessData = async (userName) => {
    try {
      const response = await fetch(
        `https://tecno-museo-default-rtdb.firebaseio.com/seminary/access/${userName}.json`
      );
  
      if (response.ok) {
        const data = await response.json();
        setSelectedUserCourses(data.courses || {});
      } else {
        console.error("Error al obtener los datos de acceso");
      }
    } catch (error) {
      console.error("Error al obtener los datos de acceso:", error);
    }
  };
  const handleCloseEditor = () => {
    setEditorOpen(false); // Cerrar el editor al hacer clic en "Atrás"
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isNaN(courseId) && courseId !== "") {
      try {
        const response = await fetch(
          `https://tecno-museo-default-rtdb.firebaseio.com/seminary/access/${selectedUser.user}/courses.json`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              [userAccessData.courses.length]: + courseId,
            }),
          }
        );
  
        if (response.ok) {
          fetchAccessData(selectedUser.user);
          setCourseId(""); // Limpiar el input después de agregar
        } else {
          console.error("Error al agregar curso");
        }
      } catch (error) {
        console.error("Error al agregar curso:", error);
      }
    }
  };
  return (
    <div className="container">
      <h1>Lista de Usuarios</h1>
      <ul className="user-list">
        {fetchedData &&
          Object.entries(fetchedData).map(([key, userInfo]) => (
            <li
              key={key}
              className="user-item"
              onClick={() => handleUserClick(userInfo)}
            >
              <h3>{userInfo.full_name}</h3>
              <p>Email: {userInfo.email}</p>
              <p>User: {userInfo.user}</p>
            </li>
          ))}
      </ul>

      {selectedUser && editorOpen && (
        <div className="editor">
          <h2>Editor para {"@" + selectedUser.user}</h2>
          {selectedUser && (
            <div>
              <button onClick={handleCloseEditor} className="back-button">Atrás</button>
              <h3>Materias con ingreso:</h3>
              <ul>
              {userAccessData && userAccessData.courses && Object.entries(userAccessData.courses).map(([courseIndex, value]) => (
                <li key={courseIndex}>
                    Materia {(value * 1) + 1}: { "id: "+ value}
                </li>
                ))}
              </ul>
              <form onSubmit={handleSubmit}>
              <label htmlFor="courseId">Agregar materia:</label>
              <input
                type="text"
                id="courseId"
                name="courseId"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
              />
              <button type="submit">Agregar Curso</button>
            </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}