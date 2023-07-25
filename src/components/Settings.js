import { useState } from "react";
import { useRef } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { usuario } from "../Users";
import React from "react";
import { AiFillHome, AiOutlineSearch, AiFillSetting, AiFillBook } from "react-icons/ai";
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

  if (windowSize.current[0] < 900) {
    main = {
      display: "grid",
      gridTemplateRows: "90% auto",
      padding: "10px",
      margin: "200px 0 0"
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
    width: "90%",
    height: "auto",
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
    width: "90%",
    height: "auto",
    margin: "15px",
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
      <div style={customStyle}>
        <h1>Preguntas frecuentes</h1>
        <div style={customStyle_1}>
          <h3>¿Qué validez tiene el diploma?</h3>
          <p>
            Los diplomas con las certificaciones extendidas por el Seminario
            Poder de Dios poseen el aval de la firma N° 11.431, inscripta en el
            Registro Nacional de Culto de la Nación Argentina, lo que implica el
            reconocimiento para ejercer como ministro religioso. Los diplomas se
            extienden para “vocaciones religiosas”.
          </p>
        </div>
        <div style={customStyle_1}>
          <h3>¿Cuál es la Misión del Seminario?</h3>
          <p>
            Capacitar a obreros para un nuevo avivamiento, equipándolos con
            efectivos recursos fundamentados en la Palabra de Dios para que, con
            vidas transformadas y con el fuego del Espíritu Santo, afecten a su
            Nación y sean protagonistas de la cosecha de los últimos tiempos.
          </p>
        </div>
        <div style={customStyle_1}>
          <h3>¿Cuál es la Visión del Seminario? </h3>
          <p>
            Propiciar en nuestra nación un cambio de paradigma en el perfil del
            ministro llamado por Dios para el servicio, resaltando las
            cualidades de integridad y santidad en su carácter cristiano de
            obrero como principal requisito. Impulsar la oración, la Palabra, la
            guía del Espíritu Santo y la demostración de poder como fundamento
            del servicio que garantice el éxito de la gran comisión.
          </p>
        </div>
        <div style={customStyle_1}>
          <h3>¿Cuál es la Objetivo del Seminario? </h3>
          <p>
            En este seminario las materias están diseñadas para proveer al
            obrero de hoy, una guía para un entrenamiento práctico sobre la base
            de los fundamentos bíblicos sólidos, fortaleciéndole en su carácter
            y a la vez, creciendo en el conocimiento y el poder de la palabra
            viva de Dios.
          </p>
        </div>
        <div style={customStyle_1}>
          <h3>¿Cuál es la Modalidad de estudio?</h3>
          <p>
            100% ON LINE en una combinación eficiente de diferentes métodos de
            impartición, modelos de enseñanza y estilos de aprendizaje, en línea
            desde casa o cualquier lugar.
          </p>
        </div>
        <div style={customStyle_1}>
          <h3>¿Qué Material didáctico facilita el Seminario?</h3>
          <p>
            El Seminario SPDD da material de estudio (módulos, libros, textos,
            videos, audios, imágenes) en FORMATO DIGITAL.
          </p>
        </div>
        <div style={customStyle_1}>
          <h3>¿Cuáles son los requisitos para el ingreso?</h3>
          <p>
            1. Completar debidamente la Solicitud de Ingreso.<br></br>
            2. Entregar una foto digital.<br></br>
            3. Abonar el valor de la Matrícula (una sola vez por año).<br></br>
            4. Demostrar poseer suficiente Experiencia de Vida y Ministerio que
            le permitan estudiar en forma acelerada. <br></br>
            5. Sujetarse a la decisión de Dirección sobre las equivalencias
            solicitadas por estudios previos en otras instituciones educativas.{" "}
            <br></br>
            6. Enviar todos sus Certificados de estudio previos (copia).
            <br></br>
            7. Aceptar que todos los Títulos y Diplomas son para “vocaciones
            religiosas”.<br></br>
            8. Aval (autorización) pastoral, si corresponde.
          </p>
        </div>
        <div style={customStyle_1}>
          <h3>¿Cuáles son los requisitos para aprobar las materias?</h3>
          <p>
            - 80 % de trabajos prácticos aprobados.<br></br>- 100 % en los
            informes de lecturas.<br></br>- Examen escrito: se aprueba con 4
            (cuatro).
          </p>
        </div>
        <div style={customStyle_1}>
          <h3>¿Qué es la secuencia curricular?</h3>
          <p>
            La secuencia curricular provee al estudiante el orden en que deben
            matricular las materias, a través de su carrera académica de forma
            tal que pueda obtener el título en un tiempo razonable. Este
            programa se debe al grado de conexión e interrelación que poseen los
            conocimientos de cada Materia. En consecuencia, el SEMINARIO PODER
            DE DIOS expresa la propuesta de cursada ideal, teniendo en cuenta el
            orden de las materias y el tiempo para hacerla. Sin embargo, nuestra
            metodología asincrónica, 100 por ciento en línea, permite que cada
            alumno avance a su tiempo, adelantando este ofrecimiento o
            demorándolo.
          </p>
        </div>
        <div style={customStyle_1}>
          <h3>¿Quiénes son los fundadores?</h3>
          <p>
            ALICIA Y MARIO FLEITA, ambos Comunicadores sociales, periodistas,
            profesores, autores y pastores principales de la Iglesia Poder de
            dios Argentina.
          </p>
        </div>
        <div style={customStyle_1}>
          <h3>¿Quién es el director del SPDD?</h3>
          <p>
            MARIO NÉSTOR FLEITA, Licenciado en la Enseñanza de la lengua y la
            Literatura. Profesor. Teólogo. Comunicador Social con
            especialización en Periodismo. Pastor principal y fundador de la
            Iglesia Poder de Dios Argentina.
          </p>
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
