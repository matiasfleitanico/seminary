import { useState } from "react";
import { useRef } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { usuario } from "../Users";
import React from "react";
import { AiFillHome, AiOutlineSearch, AiFillSetting, AiFillBook } from "react-icons/ai";
import { RiAccountCircleFill } from "react-icons/ri";

export default function Identidad() {
    const { logout, loading, user } = useAuth();
    const HandleLogout = async () => {
        await logout();
        navigate("/login");
      };
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
  console.log(user);
  if (windowSize.current[0] < 900) {
    main = {
      display: "grid",
      gridTemplateRows: "auto auto",
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
    button = {
      display: "grid",
      alignItems: "center",
      justifyItems: "center",
      gridTemplateColumns: "1fr",
      gridGap: "30px",
      backgroundColor: "grey",
      width: "100px",
      height: "45px",
      justifySelf: "center",
      alignSelf: "center",
      borderRadius: "10px",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      color: "white"
    };
  } else {
    main = {
      display: "grid",
      gridTemplateColumns: "auto 7%",
      padding: "10px",
      gridGap: "1%",
    };
    sidebar_2 = {
      backgroundColor: "#8C32FF",
      width: "100%",
      borderRadius: "10px",
      margin: "15px 0",
      display: "grid",
      gridTemplateRows: "1fr 1fr 1fr 1fr",
      alignItems: "center",
      height: "800px",
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
    button = {
      display: "grid",
      alignItems: "center",
      justifyItems: "center",
      gridTemplateColumns: "1fr",
      gridGap: "30px",
      backgroundColor: "grey",
      width: "300px",
      height: "100px",
      justifySelf: "center",
      alignSelf: "center",
      borderRadius: "10px",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      color: "white"
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
    margin: "15px",
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
    width: "100%",
    height: "auto",
    margin: "15px 0",
    justifySelf: "center",
    alignSelf: "center",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  };

  for (let i = 0; i < usuario.alumnos.length; i++) {
    if (user.email) {
      if (user.email === usuario.alumnos[i].email) {
        user_id = i;
        connectSubject(user_id);
        console.log("You have access requested");
        break;
      } else if (i === usuario.alumnos.length - 1) {
        setTimeout(() => {
          navigate("/");
        }, 300);
        console.log("You don't have access requested");
      }
    }
  }
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
  var box = {
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
  var box = {
    textDecoration: "none",
    width: "100%",
  };
  var img = {
    textDecoration: "none",
    width: "70%",
    padding: "0 15%",
  };

  function connectSubject(a) {
    let hasSubject = true;
    for (let i = 0; i <= usuario.alumnos.length; i++) {
      console.log("You are?");
      if (usuario.alumnos[a].access[i] === 0) {
        hasSubject = true;
        break;
      } else if (i === usuario.alumnos.length) {
        hasSubject = false;
        navigate("/");
      }
    }
  }
  return (
    <div style={main}>
      <div style={customStyle_1}>
        <h3>Mi cuenta</h3>
        <h4>Mi email: {user.email} </h4>
        <button style={button} onClick={HandleLogout}>
          Cerrar Sesión
        </button>

        <a href="/admin">PANEL DE ADMINISTRADOR</a>
      </div>
      </div>
  );
}
