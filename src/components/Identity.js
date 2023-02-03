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
                <h1>Identidad y Genética del Avivamiento</h1>
                <p style={center}> El origen de nuestra identidad y la lucha contra Satanás y el pecado que intentan distorsionarla. Los principios del ADN espiritual que Esdras, Nehemías y otros hombres del AT usaron para originar los grandes avivamientos escriturales. La Biblia y Jesús como modelos únicos de lo que somos, lo que tenemos, lo que podemos ser (propósito); y a dónde vamos (destino)</p>
            </div>
            <div style={customStyle}>
                <h1>Módulos</h1>
                <p style={center}>
                Lee los módulos antes de continuar con la tarea. <br/>
                Es importante que te encuentres registrado con tu Gmail para poder acceder a los módulos.<br/>
                <b>Presiona la imagen corespondiente </b>
                </p>
                <div style={content}>
                    <a style={box} href="https://drive.google.com/file/d/1RTAWXIuU4_C0agP5xZ4kKtJWLRfBDJWz/view" download>            
                        <h2>Módulo 1</h2>
                        <img style={img} src={"https://i.imgur.com/cJ4UvSR.jpg"}></img>
                    </a>
                    <a style={box} href="https://drive.google.com/file/d/1FEDvzUT7GctKb4MUxdQw3MAqFyu2MZHl/view" download>            
                        <h2>Módulo 2</h2>
                        <img style={img} src={"https://i.imgur.com/SwPdQqO.jpg"}></img>
                    </a>
                </div>
                <h2>Lecturas complementarias</h2>
                <a style={box} href="https://drive.google.com/file/d/1v7e9492nT5jqD_imZ-lmact378crEuSz/view" download>            
                        <h2>Biografía de Esdras</h2>
                </a>
                <a style={box} href="https://drive.google.com/file/d/17YhlvszxB3Dy2PQ8HBzXvbS3A2FLzZU3/view" download>            
                        <h2>Significado de CONSAGRAR</h2>
                </a>
                <a style={box} href="https://drive.google.com/file/d/1qOxuLv7tymtwme5FAAZI1Pqu2l6AxBHa/view" download>            
                        <h2>Caracteríticas del Líder</h2>
                </a>
            </div>
            <div style={customStyle}>
                <h1>Tarea</h1>
                <p style={center}>TAREA: Luego de leer los MÓDULOS I y II - PDF”, la “Biografía de ESDRAS – PDF”, <br />
                    el “Significado de la palabra CONSAGRAR” y las “Características del líder cristiano” responder el siguiente cuestionario. <br />
                    <b>IMPORTANTE: sólo se permite enviarla una sola vez.</b> </p>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdw7z44T3Zjf5ewFadzhC7Co8CemsFGMtHwiBSA2dPd_haujw/viewform?embedded=true" width="640" height="1376" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>            
            </div>
            <div style={customStyle}>
                <h1>Videoclase</h1>
                <iframe width="1280" height="720" src="https://www.youtube.com/embed/8QqtcQYSJtk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
            </div>
            <div style={customStyle}>
                <h1>Examen Final</h1>
                <p style={center}>
                EXAMEN: TENIENDO EN CUENTA los módulos, la video-clase (diagramas y apuntes),  <br />
                indicar la respuesta correcta!! <br />
                 <b>IMPORTANTE: sólo se permite enviar el examen una sola vez una sola vez.</b>
                </p>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeQaRFzeHYF5bWnw2G1iTkst6mj0liZtkPEuQMtbmeAiUn7jw/viewform?embedded=true" width="640" height="7139" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>
            </div>
        </div>
    );
  }
  //<button style={button} onClick={googleLogin}>Ingresar con Google</button>
