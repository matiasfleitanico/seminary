import { useRef } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { usuario } from "../../Users";
import React from "react";
import { AiFillHome, AiOutlineSearch, AiFillSetting } from "react-icons/ai";
import { RiAccountCircleFill } from "react-icons/ri";

export default function Identidad() {
  const { user } = useAuth();
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const navigate = useNavigate();

  var user_id;
  var main = {};
  var sidebar_2 = {};
  var span_1 = {};
  var span_side_2 = {};
  var sidebar = {};
  var button_selected = {};
  var button = {};
  var button_pressed = {};
  var datas;
  var counter;

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
    return response.json(); // parses JSON response into native JavaScript objects
  }

  getData(
    "https://tecno-museo-default-rtdb.firebaseio.com/seminary/" +
      user.uid +
      ".json?auth=" +
      user.accessToken
  ).then((data) => {
    datas = data; // JSON data parsed by `data.json()` call
    console.log(datas);
    loopOn();
  });

  function loopOn() {
    /* el próximo número sería el ID de la materia */
   let ids = 1
       for (let i = 0; i < datas.access.length; i++) {  
         if(datas.access[i] < ids){
         console.log("This is not your subject")
         } else if (datas.access[i] === ids) {
           connectSubject(user_id);
           console.log("You have access requested");
           break;
         } else {
           setTimeout(() => {
             navigate("/");
           }, 300);
           console.log("You don't have access requested");
         }
       }
     }

  if (windowSize.current[0] < 900) {
    main = {
      display: "grid",
      gridTemplateRows: "auto 80% auto",
      padding: "10px",
    };
    sidebar_2 = {
      backgroundColor: "#8C32FF",
      width: "100%",
      margin: "15px 0",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      alignItems: "center",
      position: "fixed",
      bottom: "-15px",
      left: "0",
      height: "4%",
    };
    span_1 = {
      color: "black",
      margin: "0",
      fontSize: "small",
    };
    span_side_2 = {
      color: "white",
      fontSize: "1rem",
      textAlign: "center",
      textDecoration: "none",
      textJustify: "inter-word",
      alignItems: "center",
    };
    sidebar = {
      display: "grid",
      alignItems: "center",
      justifyItems: "center",
      gridTemplateColumns: "1fr",
      gridGap: "15px",
      width: "100%",
      height: "auto",
      margin: "15px",
      justifySelf: "center",
      alignSelf: "start",
      borderRadius: "10px",
    };
    button_selected = {
      display: "grid",
      alignItems: "center",
      justifyItems: "center",
      gridTemplateColumns: "1fr",
      gridGap: "30px",
      backgroundColor: "#333333",
      width: "100%",
      height: "45px",
      justifySelf: "center",
      alignSelf: "center",
      borderRadius: "10px",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };
    button_pressed = {
      display: "grid",
      alignItems: "center",
      justifyItems: "center",
      gridTemplateColumns: "1fr",
      gridGap: "30px",
      backgroundColor: "#656565",
      width: "100%",
      height: "45px",
      justifySelf: "center",
      alignSelf: "center",
      borderRadius: "10px",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };
    button = {
      display: "grid",
      alignItems: "center",
      justifyItems: "center",
      gridTemplateColumns: "1fr",
      gridGap: "30px",
      backgroundColor: "white",
      width: "100%",
      height: "45px",
      justifySelf: "center",
      alignSelf: "center",
      borderRadius: "10px",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };
  } else {
    main = {
      display: "grid",
      gridTemplateColumns: "20% 71% 7%",
      padding: "10px",
      gridGap: "5px",
      width: "100%",
    };
    sidebar_2 = {
      backgroundColor: "#8C32FF",
      width: "100%",
      borderRadius: "10px",
      margin: "15px 0",
      display: "grid",
      gridTemplateRows: "1fr 1fr 1fr 1fr",
      alignItems: "center",
      maxHeight: "800px",
    };
    span_1 = {
      color: "black",
      margin: "0",
    };
    span_side_2 = {
      color: "white",
      fontSize: "2rem",
      textAlign: "center",
      textDecoration: "none",
      textJustify: "inter-word",
      alignItems: "center",
    };
    sidebar = {
      display: "grid",
      alignItems: "center",
      justifyItems: "center",
      gridTemplateColumns: "1fr",
      gridGap: "15px",
      width: "100%",
      height: "auto",
      margin: "15px",
      justifySelf: "center",
      alignSelf: "start",
      borderRadius: "10px",
    };
    button_selected = {
      display: "grid",
      alignItems: "center",
      justifyItems: "center",
      gridTemplateColumns: "1fr",
      gridGap: "30px",
      backgroundColor: "#333333",
      width: "100%",
      height: "100px",
      justifySelf: "center",
      alignSelf: "center",
      borderRadius: "10px",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };
    button_pressed = {
      display: "grid",
      alignItems: "center",
      justifyItems: "center",
      gridTemplateColumns: "1fr",
      gridGap: "30px",
      backgroundColor: "#656565",
      width: "100%",
      height: "100px",
      justifySelf: "center",
      alignSelf: "center",
      borderRadius: "10px",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };
    button = {
      display: "grid",
      alignItems: "center",
      justifyItems: "center",
      gridTemplateColumns: "1fr",
      gridGap: "30px",
      backgroundColor: "white",
      width: "100%",
      height: "100px",
      justifySelf: "center",
      alignSelf: "center",
      borderRadius: "10px",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };
  }

  const customStyle = {
    display: "grid",
    alignItems: "center",
    justifyItems: "center",
    gridTemplateColumns: "1fr",
    padding: "15px",
    gridGap: "30px",
    backgroundColor: "white",
    width: "auto",
    height: "100%",
    margin: "15px 0",
    justifySelf: "center",
    alignSelf: "center",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  };

  const customStyle_1 = {
    display: "grid",
    alignItems: "center",
    justifyItems: "center",
    gridTemplateColumns: "1fr",
    padding: "15px",
    gridGap: "30px",
    backgroundColor: "white",
    width: "95%",
    height: "auto",
    margin: "15px 0 200px",
    justifySelf: "center",
    alignSelf: "center",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  };

  var img = {
    borderRadius: "8px",
    width: "100%",
  };
  var img_1 = {
    borderRadius: "8px",
    width: "100%",
    maxHeight: "300px",
    objectFit: "cover",
  };
  var boxes = {
    backgroundColor: "#EAE8E8",
    borderRadius: "12px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    padding: "10px",
    width: "80%",
    display: "grid",
    margin: "10px",
    textDecoration: "none",
    color: "black",
  };
  var content = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    justifyItems: "center",
  };
  var center = {
    alignItems: "center",
    justifyItems: "center",
    textAlign: "center",
  };

  var span = {
    color: "white",
    margin: "0",
  };
  var span_1 = {
    color: "black",
    margin: "0",
  };
  var span_2 = {
    color: "grey",
    margin: "0",
  };
  var box = {
    textDecoration: "none",
    width: "100%",
  };
  var iframe = {
    width: "100%",
    height: "28em",
  };

  function connectSubject(a) {
    for (let i = 0; i <= usuario.alumnos.length; i++) {
      console.log("You are?");
      if (usuario.alumnos[a].access[i] === 0) {
        break;
      } else if (i === usuario.alumnos.length) {
        navigate("/");
      }
    }
  }
  return (
    <div style={main}>
      <div style={sidebar}>
        <a style={box} href="/espiritusanto/1">
          <div style={button_pressed}>
            <h2 style={span_2}>Introducción</h2>
          </div>
        </a>
        <a style={box} href="/espiritusanto/2">
          <div style={button_pressed}>
            <h2 style={span_2}>Módulos</h2>
          </div>
        </a>
        <a style={box} href="/espiritusanto/3">
          <div style={button_pressed}>
            <h2 style={span_2}>Tarea</h2>
          </div>
        </a>
        <a style={box} href="/espiritusanto/4">
          <div style={button_pressed}>
            <h2 style={span}>Video-Clase I</h2>
          </div>
        </a>
        <a style={box} href="/espiritusanto/5">
          <div style={button_selected}>
            <h2 style={span_1}>Video-Clase II</h2>
          </div>
        </a>
        <a style={box} href="/espiritusanto/6">
          <div style={button}>
            <h2 style={span_1}>Examen</h2>
          </div>
        </a>
      </div>
      <div style={customStyle_1}>
        <h1>Videoclase II</h1>
        <iframe
          style={iframe}
          width="1280"
          height="720"
          src="https://www.youtube.com/embed/cLrPSAt6g-w"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <div style={sidebar_2}>
        <a style={span_side_2} href="/">
          <AiFillHome />
        </a>
        <a style={span_side_2} href="/buscar">  
          <AiOutlineSearch />
        </a>
        <a style={span_side_2} href="/cuenta">
          <RiAccountCircleFill />
        </a>
        <a style={span_side_2} href="/configuracion">
          <AiFillSetting />
        </a>
      </div>
    </div>
  );
}
