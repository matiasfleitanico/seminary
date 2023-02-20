import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { usuario } from "../Users";
import React from "react";

export  default function Identidad() {
    const {user} = useAuth();
    const navigate = useNavigate()
    var user_id;
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
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
    }

    for(let i = 0; i < usuario.alumnos.length; i++) {
        if(user.email){
            if (user.email === usuario.alumnos[i].email){
                user_id = i;
                connectSubject(user_id)
                console.log("You have access requested")
                break;
            } else if (i === usuario.alumnos.length -1){
                setTimeout( ()=> {
                    navigate("/")
                }, 300) 
                console.log("You don't have access requested")
            }
        }
    }
    var img = {
        borderRadius: "8px",
        width:"100%"
    }
    var img_1 = {
        borderRadius: "8px",
        width:"100%",
        maxHeight: "300px",
        objectFit: "cover"
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
    var content = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        justifyItems: "center"
    }
    var center = {
        alignItems: "center",
        justifyItems: "center",
        textAlign: "center"
    }

    function connectSubject(a){
        let hasSubject = true;
        for(let i = 0; i <= usuario.alumnos.length; i++){
            console.log("You are?")
            if (usuario.alumnos[a].access[i] === 0){
                hasSubject = true
                break;
            } else if(i === usuario.alumnos.length){
                hasSubject = false;
                navigate("/")
            }
        }
    }
    return (
        <div>
            <div style={customStyle}>
                <img style={img_1} src={"https://i.imgur.com/QoeAo7L.jpg"}></img>
                <h1>VINO NUEVO EN ODRES NUEVOS</h1>
                <p style={center}> 
El vino nuevo como metáfora de lo que el nuevo pacto hace en el corazón del hombre y cómo su nueva doctrina forma discípulos justificados, sin velo, libres y competentes. La esencia de la copa del nuevo pacto en relación con la ley y la gracia y los beneficios sobre la iglesia de hoy que va hacia la gloria.</p>
            </div>
            <div style={customStyle}>
                <h1>Módulos</h1>
                <p style={center}>
                Lee los módulos antes de continuar con la tarea. <br/>
                Es importante que te encuentres registrado con tu Gmail para poder acceder a los módulos.<br/>
                <b>Presiona la imagen corespondiente </b>
                </p>
                <div style={content}>
                    <a style={box} href="https://drive.google.com/file/d/1xhd88-dQd8EVxLUUA9qW5pHl2NGsgMgf/view" download>            
                        <h2>Módulo 1</h2>
                        <img style={img} src={"https://i.imgur.com/cJ4UvSR.jpg"}></img>
                    </a>
                    <a style={box} href="https://drive.google.com/file/d/1xPX4DaUrXh9MBnBhDBQalY2gILX5g1IV/view" download>            
                        <h2>Módulo 2</h2>
                        <img style={img} src={"https://i.imgur.com/SwPdQqO.jpg"}></img>
                    </a>
                </div>
            </div>
            <div style={customStyle}>
                <h1>Tarea</h1>
                <p style={center}>TAREA: Luego de leer los MÓDULOS I y II, responder el siguiente cuestionario. <br />
                <b>IMPORTANTE: sólo se permite enviarla una sola vez.</b> </p>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeLs3FmfOsH9FKZXqdzvc2V6TPOqNeaPSHSLw5Mt1EQDJLgdw/viewform?embedded=true" width="640" height="2088" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>            
            </div>
            <div style={customStyle}>
                <h1>Videoclase I</h1>
                <iframe width="1280" height="720" src="https://www.youtube.com/embed/N2a-F9346so" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>            
            </div>
            <div style={customStyle}>
                <h1>Videoclase II</h1>
                <iframe width="1280" height="720" src="https://www.youtube.com/embed/Vso67uwCc5M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>            
            </div>
            <div style={customStyle}>
                <h1>Examen Final</h1>
                <p style={center}> <br />
                 <b>PROXIMAMENTE</b>
                </p>
            </div>
        </div>
    );
  }
  //<button style={button} onClick={googleLogin}>Ingresar con Google</button>
