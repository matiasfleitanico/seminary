import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { usuario } from "../../Users";
import React from "react";

export  default function Identidad() {
    const {user} = useAuth();
    const navigate = useNavigate()
    var user_id;

    var main = {
        display: "grid",
        gridTemplateColumns: "15% 85%"
    }
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
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
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
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
    }

    const customStyle_1 = {
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
        gridTemplateColumns: "1fr",
        padding: "15px",
        gridGap: "30px",
        backgroundColor: "white",
        width: "auto",
        height: "800px",
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

    var box = {
        textDecoration: "none",
    }
    var center = {
        alignItems: "center",
        justifyItems: "center",
        textAlign: "center"
    }
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
    }
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
    }
    var span = {
        fontSize : "xxx-large",
        color: "white"
    }
    var span_1 = {
        fontSize : "xxx-large",
        color: "#333333"
    }
    var box = {
        textDecoration: "none",
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
        <div style={main}>
            <div style={sidebar}>
                <a style={box} href="/identidad/1">
                    <div style={button_selected}>
                        <span style={span} class="material-symbols-outlined"> home </span> 
                    </div>
                </a>
                <a style={box} href="/identidad/2">
                    <div style={button}>
                        <span style={span_1} class="material-symbols-outlined"> picture_as_pdf </span> 
                    </div>
                </a>
                <a style={box} href="/identidad/3">
                    <div style={button}>
                        <span style={span_1} class="material-symbols-outlined"> task </span> 
                    </div>
                </a>
                <a style={box} href="/identidad/4">
                    <div style={button}>
                        <span style={span_1} class="material-symbols-outlined"> auto_videocam </span> 
                    </div>
                </a>
                <a style={box} href="/identidad/5">
                    <div style={button}>
                        <span style={span_1} class="material-symbols-outlined"> preliminary </span> 
                    </div>
                </a>   
            </div>
            <div>
            <div style={customStyle_1}>
                <img style={img_1} src={"https://i.imgur.com/QoeAo7L.jpg"}></img>
                <h1>Identidad y Genética del Avivamiento</h1>
                <p style={center}> El origen de nuestra identidad y la lucha contra Satanás y el pecado que intentan distorsionarla. Los principios del ADN espiritual que Esdras, Nehemías y otros hombres del AT usaron para originar los grandes avivamientos escriturales. La Biblia y Jesús como modelos únicos de lo que somos, lo que tenemos, lo que podemos ser (propósito); y a dónde vamos (destino)</p>
            </div>
            </div>
        </div>
    );
  }