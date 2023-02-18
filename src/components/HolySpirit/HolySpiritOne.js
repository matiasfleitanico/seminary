import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { usuario } from "../../Users";
import React from "react";

export default function Identidad() {
  const { user } = useAuth();
  const navigate = useNavigate();
  var user_id;

  var main = {
    display: "grid",
    gridTemplateColumns: "15% 85%",
  };
  var sidebar = {
    display: "grid",
    alignItems: "center",
    justifyItems: "center",
    gridTemplateColumns: "1fr",
    padding: "15px",
    gridGap: "30px",
    width: "100px",
    height: "800px",
    margin: "15px",
    justifySelf: "center",
    alignSelf: "start",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  };

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
    width: "auto",
    height: "1000px",
    margin: "15px",
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

  var box = {
    textDecoration: "none",
  };
  var center = {
    alignItems: "center",
    justifyItems: "center",
    textAlign: "center",
  };
  var button_selected = {
    display: "grid",
    alignItems: "center",
    justifyItems: "center",
    gridTemplateColumns: "1fr",
    gridGap: "30px",
    backgroundColor: "#333333",
    width: "100px",
    height: "100px",
    margin: "15px",
    justifySelf: "center",
    alignSelf: "center",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  };
  var button = {
    display: "grid",
    alignItems: "center",
    justifyItems: "center",
    gridTemplateColumns: "1fr",
    gridGap: "30px",
    backgroundColor: "white",
    width: "100px",
    height: "100px",
    margin: "15px",
    justifySelf: "center",
    alignSelf: "center",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  };
  var span = {
    fontSize: "xxx-large",
    color: "white",
  };
  var span_1 = {
    fontSize: "xxx-large",
    color: "#333333",
  };
  var box = {
    textDecoration: "none",
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
      <div style={sidebar}>
        <a style={box} href="/espiritusanto/1">
          <div style={button_selected}>
            <span style={span} class="material-symbols-outlined">
              {" "}
              home{" "}
            </span>
          </div>
        </a>
        <a style={box} href="/espiritusanto/2">
          <div style={button}>
            <span style={span_1} class="material-symbols-outlined">
              {" "}
              picture_as_pdf{" "}
            </span>
          </div>
        </a>
        <a style={box} href="/espiritusanto/3">
          <div style={button}>
            <span style={span_1} class="material-symbols-outlined">
              {" "}
              task{" "}
            </span>
          </div>
        </a>
        <a style={box} href="/espiritusanto/4">
          <div style={button}>
            <span style={span_1} class="material-symbols-outlined">
              {" "}
              auto_videocam{" "}
            </span>
          </div>
        </a>
        <a style={box} href="/espiritusanto/5">
          <div style={button}>
            <span style={span_1} class="material-symbols-outlined">
              {" "}
              auto_videocam{" "}
            </span>
          </div>
        </a>
        <a style={box} href="/espiritusanto/6">
          <div style={button}>
            <span style={span_1} class="material-symbols-outlined">
              {" "}
              preliminary{" "}
            </span>
          </div>
        </a>
      </div>
      <div>
        <div style={customStyle_1}>
          <img style={img_1} src={"https://i.imgur.com/QoeAo7L.jpg"}></img>
          <h1>La persona del Espíritu Santo</h1>
          <p style={center}>
            La doctrina de la naturaleza de la persona del Espíritu Santo como
            Espíritu de Cristo, Espíritu Consolador y Espíritu de la Promesa.
            Las tres fases del ciclo de impartición en el NT. Efectos de su
            regeneración, pero también el de su ausencia. El ciclo de los
            tiempos y las tres personas de la Trinidad. El Pentecostés, la
            unción y el derramamiento. El Espíritu como administrador total de
            la Iglesia. <br /> <br /> <br /> POLÍTICA DE PRIVACIDAD Todo el
            material del SEMINARIO PODER DE DIOS que se da en cada materia es
            exclusivo para los alumnos regulares: que cursan, que son guiados
            por el profesor para estudiar el material y luego ser evaluados. Que
            los Módulos, los libros, las lecturas, tareas, reflexiones, apuntes
            y toda producción es para uso exclusivamente personal. NO
            COMPARTIR!! <br /> <br />
            BIBLIAS. SUGERIMOS LAS VERSIONES: Reina Valera 1960. La Nueva
            Traducción Viviente. Reina Valera con Números Strong. King James
            Versión con Strong. <br/> <br/> MATERIALES DE ESTUDIO que deben tener: un
            cuaderno para tomar apuntes. Lapiceras. Teléfono, Notebook, Tableta
            o Pc, conexión a Internet. <br/> Los materiales están en formato digital
            PDF. Por lo tanto, deben tener un programa o aplicación para leer
            los archivos. <br/> Si no tienen, pueden descargar gratuitamente en Play
            Store:  <br/>
            <a href="https://play.google.com/store/apps/details?id=com.pdfreader.pdfeditor.pdfreadeforandroid.pdfeditorforandroidfree">
              CLICK ACÁ
            </a>{" "} <br></br>
            Sugerimos, también, instalar en android la aplicación gratuita
            MyBible. La podés encontrar en Play Store:{" "} <br></br>
            <a href="https://play.google.com/store/apps/details?id=ua.mybible">
                CLICK ACÁ
            </a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
