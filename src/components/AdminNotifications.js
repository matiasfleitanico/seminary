
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
  const [notificationData, setNotificationData] = useState({
    title: "",
    description: "",
    link: "",
  });
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

  const handleSubmitNotification = async (e) => {
    e.preventDefault();

    if (selectedUser) {
      try {
        const response = await fetch(
          `https://tecno-museo-default-rtdb.firebaseio.com/seminary/access/${selectedUser.user}/notification.json`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              [userAccessData.notification.length]: notificationData,
            }),
          }
        );

        if (response.ok) {
          // Limpiar los campos del formulario después de enviar
          setNotificationData({
            title: "",
            description: "",
            link: "",
          });

          console.log("Notificación enviada exitosamente");
        } else {
          console.error("Error al enviar la notificación");
        }
      } catch (error) {
        console.error("Error al enviar la notificación:", error);
      }
    }
  };

  return (
    <div className="container">
      {/* Lista de Usuarios */}
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

{/* Editor y Formulario de Notificación */}
{selectedUser && editorOpen && (
  <div className="editor">
    <h2>Editor para {"@" + selectedUser.user}</h2>
    {selectedUser && (
      <div>
        {/* ... (contenido existente del editor) ... */}
        <form onSubmit={handleSubmitNotification}>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={notificationData.title}
            onChange={(e) =>
              setNotificationData({ ...notificationData, title: e.target.value })
            }
          />
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={notificationData.description}
            onChange={(e) =>
              setNotificationData({
                ...notificationData,
                description: e.target.value,
              })
            }
          />
          <label htmlFor="link">Enlace:</label>
          <input
            type="text"
            id="link"
            name="link"
            value={notificationData.link}
            onChange={(e) =>
              setNotificationData({ ...notificationData, link: e.target.value })
            }
          />
          <button type="submit">Enviar Notificación</button>
        </form>
      </div>
    )}
  </div>
)}
      
    </div>
  );
}