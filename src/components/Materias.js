import { useRef } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { usuario } from "../Users";
import React from "react";
import { AiFillHome, AiOutlineSearch, AiFillSetting, AiFillBook } from "react-icons/ai";
import { RiAccountCircleFill } from "react-icons/ri";
var counter = 0;

export default function App() {
  var main = {};
  var sidebar_2 = {};
  var span_1 = {};
  var span_side_2 = {};
  var sidebar = {};
  var button_selected = {};
  var buttons = {};
  var button_pressed = {};
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const { logout, loading, user } = useAuth();
  const navigate = useNavigate();
  var datas;
  var courses;

  console.log(user);
  const [count, setCount] = React.useState(<h1></h1>);

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
    console.log(datas["user"]); // JSON data parsed by `data.json()` call
    if (counter <= 3) {
      getCourses(datas["user"]);
    }
  });

  function getCourses(username) {
    getData(
      "https://tecno-museo-default-rtdb.firebaseio.com/seminary/access/" +
        username +
        "/courses.json?auth=" +
        user.accessToken
    ).then((data) => {
      courses = data;
      console.log(courses); // JSON data parsed by `data.json()` call
      setTimeout(() => {
        setCount(
          courses.map((number) => (
            <a href={usuario.materias[number].path} style={box}>
              <img style={img} src={usuario.materias[number].link}></img>
              <h2>{usuario.materias[number].title}</h2>
            </a>
          ))
        );
      }, 700);
    });
  }
  var whitebox;
  var bigbox;
  const HandleLogout = async () => {
    await logout();
    navigate("/login");
  };
  if (windowSize.current[0] < 900) {
    bigbox = {
      display: "grid",
      gridTemplateColumns: "repeat(1, 1fr)",
      padding: "10px",
      width: "100%",
    };
    whitebox = {
      display: "grid",
      gridTemplateColumns: "repeat(1, 1fr)",
      padding: "10px",
      width: "100%",
      backgroundColor: "white",
      borderRadius: "10px",
      margin: "40px 0"
    };
  } else {
    bigbox = {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      padding: "10px",
      width: "100%",
    };
    whitebox = {
      display: "grid",
      gridTemplateColumns: "repeat(1, 1fr)",
      padding: "10px",
      width: "100%",
      backgroundColor: "white",
      borderRadius: "10px",
      margin: "40px 0"
    };
  }

  const customStyle = {
    display: "grid",
    alignItems: "center",
    justifyItems: "center",
    gridTemplateColumns: "80% 20%",
    gridTemplateRows: "1fr",
    padding: "15px",
    gridGap: "30px",
    width: "auto",
    height: "auto",
    margin: "15px 0",
    justifySelf: "center",
    alignSelf: "center",
    height: "auto",
  };
  const header = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    justifyItems: "end",
    height: "50px",
    width: "100%",
  };

  const button = {
    backgroundColor: "#333333",
    padding: "5px",
    minWidth: "150px",
    width: "50px",
    height: "39px",
    padding: "0 10px",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
    justifySelf: "end",
    margin: "10px",
  };
  var email_user = "";
  var user_id = 0;
  for (let i = 0; i < usuario.alumnos.length; i++) {
    if (user.email === usuario.alumnos[i].email) {
      email_user = user.email;
      user_id = i;
    }
  }
  var box = {
    borderRadius: "12px",
    padding: "10px",
    width: "80%",
    display: "grid",
    margin: "10px",
    textDecoration: "none",
    color: "black",
  };

  const name_tittle = {
    justifySelf: "start",
    margin: "15px",
    color: "grey",
  };
  var img = {
    borderRadius: "8px",
    width: "100%",
  };

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
      gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
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
    buttons = {
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
      gridTemplateRows: "1fr 1fr 1fr 1fr 1fr",
      alignItems: "center",
      maxWidth: "100px",
      height: "100%",
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
    buttons = {
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

  if (
    user.email === "matiasfleitanico@gmail.com" ||
    user.email === "ezekielfleita10@gmail.com" ||
    user.email === "seminariopoderdedios@gmail.com" ||
    user.email === "fleita.ariana@gmail.com"
  ) {
    return (
      <div style={customStyle}>
        <div>
          <div style={whitebox}>
            <h2>Mis Cursos</h2>
            <div style={bigbox}>{count}</div>
          </div>
        </div>

        <div style={sidebar_2}>
        <a style={span_side_2} href="/">
            <AiFillHome />
          </a>
          <a style={span_side_2} href="/materias">
            <AiFillBook />
          </a>
          <a style={span_side_2} href="/foro">
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
  } else {
    return (
      <div style={customStyle}>
      <div>
        <div style={whitebox}>
          <h2>Mis Cursos</h2>
          <div style={bigbox}>{count}</div>
        </div>
      </div>

      <div style={sidebar_2}>
      <a style={span_side_2} href="/">
          <AiFillHome />
        </a>
        <a style={span_side_2} href="/materias">
          <AiFillBook />
        </a>
        <a style={span_side_2} href="/foro">
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
}
