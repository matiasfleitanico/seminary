
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
  
    return (
      <div className='customStyle'>
        <div className='divisor'>
          <div className='whitebox_1'>
            <h2 className='h2_margin'>Mis Cursos</h2>
            <div className='bigbox'>{count}</div>
            <a className='a' href='/materias'>
              <div className='buttonMore'>Ver todo</div>
            </a>
          </div>
          <div className='blackbox_1'>
              <div className='canvas'>
                <h2 className='title-white'>Cantidad de<br/> cursos <br/>completados</h2>
                <h2 className='title-white-2'>{mat} de 20 materias completadas</h2>
              </div>
              <div className='canvas'>
              <Pie height="100px" width="100px" data={data} options={options} />
              </div>
          </div>
          <div className='blackbox_2'>
          <h2 className='title-white-1'>Notificaciones Recientes</h2>
            <div className='whitebox_2'>
              {noti}
            </div>
          </div>
          <div className='whitebox_3'>
            <h2 className='h2_margin'>Foro de Alumnos</h2>
            {forum}
          </div>
        </div>
      </div>
    );
  }
  