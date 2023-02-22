
import { useRef } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { usuario } from "../Users";
import React from 'react';
var counter = 0;


export default function App() {
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    const {logout, loading, user} = useAuth();
    const navigate = useNavigate();
    var datas;
    var listItems;
    
console.log(user)
    const [count, setCount] = React.useState(<h1></h1>);
      
    function delayAddOne() {
        setCount(datas["access"].map((number) =>
                <a href={usuario.materias[number].path} style={box}>
                    <h2>{usuario.materias[number].title}</h2>
                    <img style={img} src={usuario.materias[number].link}></img>
                    <p>{usuario.materias[number].description}</p>
                </a>
            ));
        console.log("AAAAAA", datas);
    }


    async function getData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });
        counter = counter + 1
        return response.json(); // parses JSON response into native JavaScript objects
      }
      
      getData('https://tecno-museo-default-rtdb.firebaseio.com/seminary/'+ user.uid + ".json?auth=" + user.accessToken)
        .then((data) => {
          datas = data // JSON data parsed by `data.json()` call
          if(counter === 2) {
            delayAddOne()
            console.log("BASTAAA", counter)
          }
          console.log(datas)
        })
    var bigbox;
    const HandleLogout = async () => {
        await logout();
        navigate("/login")
    }
    if (windowSize.current[0] < 900) {
        bigbox = {
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            padding: "10px",
            width: "100%"
        }
    } else {
        bigbox = {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            padding: "10px",
            width: "100%"
        }
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
        height: "auto",
        margin: "15px 0",
        justifySelf: "center",
        alignSelf: "center",
        borderRadius: "10px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      };
    const header = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems:"center",
        justifyItems: "end",
        height: "50px",
        width: "100%"
    }

    const button = {
        backgroundColor : "#333333",
        padding: "5px",
        minWidth: "150px",
        width: "50px",
        height: "39px",
        padding: "0 10px",
        borderRadius: "5px",
        color: "white",
        cursor: "pointer",
        justifySelf: "end",
        margin: "10px"
    }
    var email_user = "";
    var user_id = 0;
    for(let i = 0; i < usuario.alumnos.length; i++) {
        if (user.email === usuario.alumnos[i].email){
            email_user = user.email;
            user_id = i
        }
    }
    var box = {
        backgroundColor: "#EAE8E8",
        borderRadius: "12px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        padding: "10px",
        width: "80%",
        display: "grid",
        margin: "10px",
        textDecoration: "none",
        color: "black"
    }

    const name_tittle = {
        justifySelf: "start",
        margin: "15px",
        color: "grey"
    }
    var img = {
        borderRadius: "8px",
        width:"100%"
    }

    
    if(user.email === "matiasfleitanico@gmail.com" || "ezekielfleita@gmail.com" || "seminariopoderdedios@gmail.com" || "fleita.ariana@gmail.com") return(
        <div style={customStyle}>
            <h1>Hola {user.displayName || user.email}, usted es Administrador</h1>
            <button style={button} onClick={HandleLogout}>Salir</button>
            <div style={bigbox}>
                {count}
            </div>
            <div>
                <a href="/admin">PANEL DE ADMINISTRADOR</a>
            </div>
        </div>
    )
        return (
            <div style={customStyle}>
                <div style={header}>
                    <h4 style={name_tittle}>{user.displayName || user.email}</h4>
                    <button style={button} onClick={HandleLogout}>Cerrar Sesión</button>
                </div>
                <div>            
                    <h1>Seminario Poder de Dios</h1>
                    <h3>Materias</h3>
                </div>
                <div style={bigbox}>
                    {count}
                </div>
            </div>
        );

  }