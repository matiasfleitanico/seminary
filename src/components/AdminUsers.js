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
  const [searchTerm, setSearchTerm] = useState("");

  const sampleCourses = [
    {
      id: 0,
      title: "Identidad y Genética del Avivamiento",
      description: "Despertar Esporitual y Ministerial",
      link: "covers/identidad/photo1675362372.jpeg",
      key: "identidad",
    },
    {
      id: 1,
      title: "Vino Nuevo en Odres Nuevos",
      description: "Despertar Espiritual y doctrinal",
      link: "covers/identidad/photo1675362372.jpeg",
      key: "vinonuevo",
    },
    {
      id: 2,
      title: "La persona del Espíritu Santo",
      description: "Teológica y doctrinal",
      link: "covers/identidad/photo1675362372.jpeg",
      key: "espiritusanto",
    },
    {
      id: 3,
      title: "La oración y la guerra espiritual",
      description: "Doctrinal",
      link: "covers/identidad/photo1675362372.jpeg",
      key: "oracion",
    },
    {
      id: 4,
      title: "Hermenéutica y las NTICX",
      description: "Ministerial y personal",
      link: "covers/identidad/photo1675362372.jpeg",
      key: "hermeneutica",
    },
    {
      id: 5,
      title: "Evangelios sinópticos y cristología",
      description: "Bíblica y Teológica",
      link: "covers/identidad/photo1675362372.jpeg",
      key: "evangelios",
    },
    {
      id: 6,
      title: "Escatología con Daniel y Apocalipsis",
      description: "Teológica y Bíblica",
      link: "covers/identidad/photo1675362372.jpeg",
      key: "escatologia",
    },
    {
      id: 7,
      title: "Salud física, emocional y espiritual",
      description: "Personal, doctrinal y teológico",
      link: "covers/identidad/photo1675362372.jpeg",
      key: "salud",
    },
    {
      id: 8,
      title: "Seminario de Avivamiento I",
      description: "Despertar Espiritual, Bíblica",
      link: "covers/identidad/photo1675362372.jpeg",
      key: "avivamiento1",
    },
    {
      id: 9,
      title: "Fundamentos de las Doctrinas Cristianas",
      description: "Doctrinal y Teológico",
      link: "covers/identidad/photo1675362372.jpeg",
      key: "fundamentos",
    },
    {
      id: 10,
      title: "Perspectiva y Síntesis del Antiguo Testamento",
      description: "Bíblica",
      link: "covers/identidad/photo1675362372.jpeg",
      key: "antiguotestamento",
    },
    {
      id: 11,
      title: "Perspectiva y Síntesis del Nuevo Testamento",
      description: "´Bíblica",
      link: "covers/identidad/photo1675362372.jpeg",
      key: "nuevotestamento",
    },
    {
      id: 12,
      title: "Bases bíblicas para la familia y el hogar cristiano",
      description: "Bíblica, personal y ministerial",
      link: "covers/identidad/photo1675362372.jpeg",
      key: "hogarcristiano",
    },
    {
      id: 13,
      title: "Comunicación oral y escrita. Homilética y locución",
      description: "Ministerial, Personal y teológica",
      link: "covers/identidad/photo1675362372.jpeg",
      key: "homiletica",
    },
    {
      id: 14,
      title: "Avivamiento 2",
      description: "Despertar Espiritual, Bíblica",
      link: "covers/identidad/photo1675362372.jpeg",
      key: "avivamiento2",
    },
    {
      id: 15,
      title: "Teología Bíblica y sistemática",
      description: "Teológica y Bíblica",
      key: "teologia",
    },
    {
      id: 16,
      title: "Ética cristiana y deontología profesional",
      description: "Ministerial y teológica",
      link: "covers/identidad/photo1675362372.jpeg",
      key: "eticacristiana",
    },
    {
      id: 17,
      title: "Didáctica de la enseñanza Cristiana",
      description: "Ministerial",
      link: "covers/identidad/photo1675362372.jpeg",
      key: "didactica",
    },
    {
      id: 18,
      title: "Teología Pastoral avanzada",
      description: "Teológica, Ministerial",
      link: "covers/identidad/photo1675362372.jpeg",
      key: "teologiapastoral",
    },
    {
      id: 19,
      title: "La biblia, la cultura y los medios de comunicación",
      description: "Ministerial, personal y tesis final",
      link: "covers/identidad/photo1675362372.jpeg",
      key: "culturaymedios",
    },
  ];

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
      const courseToAdd = sampleCourses[courseId]; // Obtener la materia del arreglo
      if (courseToAdd) {
        try {
          const response = await fetch(
            `https://tecno-museo-default-rtdb.firebaseio.com/seminary/access/${selectedUser.user}/courses.json`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                [userAccessData.courses.length]: courseToAdd, // Enviar el objeto completo
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
      } else {
        console.error("Materia no encontrada en la lista");
      }
    }
  };

  
  return (
    <div className="main-container">
      <input
        type="text"
        id="search"
        placeholder="Buscar por nombre de usuario, nombre completo o correo electrónico"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <h1 className="main-heading">Lista de Usuarios</h1>
      <ul className="user-list">
        {fetchedData &&
          Object.entries(fetchedData).map(([key, userInfo]) => {
            const fullName = `${userInfo.full_name} (${userInfo.user})`;
            const email = userInfo.email;

            if (
              fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              email.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return (
                <li
                  key={key}
                  className="user-item"
                  onClick={() => handleUserClick(userInfo)}
                >
                  <h3>{userInfo.full_name}</h3>
                  <p>Email: {userInfo.email}</p>
                  <p>User: {userInfo.user}</p>
                </li>
              );
            } else {
              return null;
            }
          })}
      </ul>
      {selectedUser && editorOpen && (
  <div className="editor-container">
    <h2 className="editor-heading">Editor para {"@" + selectedUser.user}</h2> 
    {selectedUser && (
      <div className='access-grid'>
        <button onClick={handleCloseEditor} className="back-button">Atrás</button>
        <h3 className="sub-heading">Materias con ingreso:</h3>
        <ul className="access-list">
          {userAccessData && userAccessData.courses && (
            userAccessData.courses.map(courseIndex => {
              const course = userAccessData;
              console.log(courseIndex)
              return (
                <li className='list'>
                <div className="course-card">
                  <h5 className="course-title">{courseIndex.title}</h5>
                  <p className="course-id">id: {courseIndex.id}</p>
                </div>
              </li>
              );
            })
          )}
        </ul>
        <form onSubmit={handleSubmit} className="add-course-form">
          <label htmlFor="courseId" className="form-label">Agregar materia:</label>
          <input
            type="text"
            id="courseId"
            name="courseId"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="form-button">Agregar Curso</button>
        </form>
      </div>
    )}
  </div>
)}
    </div>
  );
}