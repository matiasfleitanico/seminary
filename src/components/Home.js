
// Empty dependency array to trigger this effect only on mount

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { usuario } from '../Users';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getDownloadUrlForFile } from "../firebase";
import './FilesCss/Home.css'; // Import your CSS file
import { useGlobalContext } from '../context/GlobalContext';
var counter = 0;

ChartJS.register(ArcElement, Tooltip, Legend);

export default function App() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const [count, setCount] = useState(<div className='lds-dual-ring'></div>);
  const [title, setTitle] = useState(<div className='lds-dual-ring'></div>);
  const [activeIcon, setActiveIcon] = useState('home');
  const [forum, setForum] = useState(<div className='lds-dual-ring'></div>);
  const [noti, setNoti] = useState(<div className='lds-dual-ring'></div>);
  const [mat, setMat] = useState(5);
  const { globalRoute, setGlobalRoute } = useGlobalContext();
  var email_user = "";
  var user_id = 0;
  var datas;
  var courses;
  var forumes;
  var notis;
  let data = {
    labels: ['Materias hechas', 'Materias faltantes'],
    datasets: [
      {
        label: 'Materias',
        data: [mat, 20 - mat ],
        backgroundColor: [
          'rgba(140,150,255,1)',
          'rgb(140,50,255,1)'
        ],
        spacing:0,
        borderWidth: 1,
        hoverBorderWidth:4,
        offset: 20,
        weight: 100
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false, // Oculta la leyenda
      },
    },
  };
  const [cuadros, setCuadros] = useState([
  ]);

  useEffect(() => {
    const elemento = document.querySelector('.customStyleBack');
    if (elemento) {
      elemento.classList.remove('customStyleBack'); // Remueve la clase original si existe
      elemento.classList.add('vinonuevo'); // Agrega la nueva clase
    }      

    
  }, []);

  async function getData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    counter = counter + 1;
    return response.json();
    // parses JSON response into native JavaScript objects
  }

  
  getData(
    "https://tecno-museo-default-rtdb.firebaseio.com/seminary/back-data/" +
      user.uid +
      ".json?auth=" +
      user.accessToken
  ).then((data) => {
    datas = data;
    if (counter <= 3) {
      getCourses(datas["user"]);
    }
  });

  async function getCourses(username) {
    const url = `https://tecno-museo-default-rtdb.firebaseio.com/seminary/access/${username}/courses.json?auth=${user.accessToken}`;
    getData(url)
      .then(async (data) => {
        const coursesArray = Object.values(data); // Convertir el objeto en un array
        const coursesCount = coursesArray.length;
        setMat(coursesCount);
  
        let courses_random = [];
        if (coursesCount >= 3) {
          const uniqueRandomIndexes = new Set();
          while (uniqueRandomIndexes.size < 3) {
            const randomIndex = Math.floor(Math.random() * coursesCount);
            uniqueRandomIndexes.add(randomIndex);
          }
  
          courses_random = Array.from(uniqueRandomIndexes).map((index) => coursesArray[index]);
        } else if (coursesCount > 0) {
          courses_random = coursesArray;
        }
        const titulos = {
          0: "Identidad y Genética del avivamiento",
          1: "Vino Nuevo en Odres Nuevos",
          2: "La persona del Espíritu Santo",
          3: "La oración y la guerra espiritual",
          4: "Hermenéutica y las NTICX",
          5: "Evangelios sinópticos y cristología",
          6: "Escatología con Daniel y Apocalipsis",
          7: "Salud física, emocional y espiritual",
          8: "Seminario de Avivamiento I",
          9: "Fundamentos de las Doctrinas Cristianas",
          10: "Perspectiva y Síntesis del Antiguo Testamento",
          11: "Perspectiva y Síntesis del Nuevo Testamento",
          12: "Bases bíblicas para la familia y el hogar cristiano",
          13: "Comunicación oral y escrita. Homilética y locución",
          14: "Vino Nuevo en Odres Nuevos",
          15: "Vino Nuevo en Odres Nuevos",
          16: "Vino Nuevo en Odres Nuevos",
          17: "Vino Nuevo en Odres Nuevos",
          18: "Vino Nuevo en Odres Nuevos",
          19: "Vino Nuevo en Odres Nuevos",
        };

        console.log(coursesArray)
        
        cambiarClase(coursesArray[0].id, coursesArray[0].title, coursesArray[0].profesor)
        for (let i = 0; i < 20; i++) {
          // Verificar si el ID actual existe en el array 'grupos'
          const exist = coursesArray.some(courseArray => courseArray.id === i);
          
          // Si el ID no existe, agregar un nuevo objeto al final del array
          if (!exist) {
            coursesArray.push({
              id: i,
              title:  titulos[i] || "",
              isBlocked: true
            });
          }
        }
        setCuadros(coursesArray)
        // Descargar las imágenes y preparar el JSX
        const coursesJSX = await Promise.all(
          courses_random.map(async (course) => {
            const imageUrl = await getDownloadUrlForFile(course.link);
            setGlobalRoute(course.key);

            return (
              <a className='box' href={course.key} key={course.id}>
                <img className='img' src={imageUrl} alt='Course Image' />
                <h3>{course.title}</h3>
              </a>
            );
          })
        );
  
        setTimeout(() => {
          getForum();
          getNotifications(username);
  
          setCount(coursesJSX);
        }, 700);
      });
  }
  function getForum() {
    getData(
      "https://tecno-museo-default-rtdb.firebaseio.com/seminary/forum.json?auth=" +
        user.accessToken
    ).then((data) => {
      forumes = data;
    
      setTimeout(() => {
        setForum(() => (
            <a  className='link' href={"foro"}>
              <h2>{forumes[forumes.length-1]["title"]}</h2>
              <p>{forumes[forumes.length-1]["content"]}</p>
            </a>
          ))
      }, 200);
    });
  }

  function getNotifications(username) {
    getData(
      "https://tecno-museo-default-rtdb.firebaseio.com/seminary/access/" + username + "/notification.json?auth=" +
        user.accessToken
    ).then((data) => {
      notis = data;
      setTimeout(() => {
        setNoti(() => (
            <a className='link_1' href={notis[notis.length-1]["link"]}>
              <h2>{notis[notis.length-1]["title"]}</h2>
              <p>{notis[notis.length-1]["description"]}</p>
            </a>
          ))
      }, 200);
    });
  }
  const HandleLogout = async () => {
    await logout();
    navigate("/login");
  };

  for (let i = 0; i < usuario.alumnos.length; i++) {
    if (user.email === usuario.alumnos[i].email) {
      email_user = user.email;
      user_id = i;
    }
  }
  const cambiarClase = (id, title, teacher) => {
    const elemento = document.getElementById('back');
    if (elemento) {
      setTitle(() => (
        <div class="titulo">
          <p className='numb-cuadro'>{id* 1  < 9 ? "0" +(id* 1 + 1) : (id* 1 + 1)}</p>
          <h1 className='titlecuadro'>{title}</h1>
          <h3 className='teacher'>{teacher}</h3>
          <div class="boton-reproducir2">
            <div class="circulo2"></div>
            <div class="triangulo2"></div>
          </div>
        </div>
      ))
      elemento.classList.remove('identidad', 'vinonuevo', 'espiritu', 'guerra', "customStyleBack"); 
      // Agrega la nueva clase según el ID del cuadro
      switch (id) {
        case 0:
          elemento.classList.add('identidad');
          break;
        case 1:
          elemento.classList.add('vinonuevo');
          break;
        case 2:
          elemento.classList.add('espiritu');
          break;
        case 3:
          elemento.classList.add('guerra');
          break;
        default:
      }
    }
  };



  // Función para filtrar los cuadros
  const filtrarCuadros = (filtro) => {
    // Lógica para filtrar los cuadros según el filtro proporcionado
    // Por ejemplo, podrías filtrar por el profesor
    const cuadrosFiltrados = cuadros.filter(cuadro => cuadro.profesor === filtro);
    // Actualiza el estado con los cuadros filtrados
    setCuadros(cuadrosFiltrados);
  };


  return (
    <div id='back' className='customStyleBack'>
        {title}
      <div className='slide'>
      {/* Botones para filtrar los cuadros */}
      {/* Renderiza los cuadros */}
      {cuadros.map(cuadro => (
        
        <div onClick={() => cambiarClase(cuadro.id, cuadro.title, cuadro.profesor)}
        style={{ backgroundImage: `linear-gradient(280deg, rgb(24, 24, 24, 0.8) 0%, rgb(31, 31, 32, 0.4) 100%), url(${cuadro.link})` }}
        className='box' key={cuadro.id}>
          <p className='numb'>{cuadro.id* 1  < 9 ? "0" +(cuadro.id* 1 + 1) : (cuadro.id* 1 + 1)}</p>
          <div class="boton-reproducir">
            <div class="circulo"></div>
            <div class="triangulo"></div>
          </div>
          <h2 className='title-cuadro'>{cuadro.title}</h2>
          <p>{cuadro.descripcion}</p>
          <p>{cuadro.profesor}</p>
          {cuadro.isBlocked && (
            <div>Conseguir este curso</div>
          )}
        </div>
      ))}
      </div>
    </div>
  );
}
