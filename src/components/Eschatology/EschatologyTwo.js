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
    var boxes = {
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
        justifyItems: "center",
        gridGap: "5px"
    }

    var box = {
        textDecoration: "none",
    }
    var center = {
        alignItems: "center",
        justifyItems: "center",
        textAlign: "center"
    }
    var button_pressed = {
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
        gridTemplateColumns: "1fr",
        gridGap: "30px",
        backgroundColor: "#545454",
        width: "100px",
        height: "100px",
        margin: "15px",
        justifySelf: "center",
        alignSelf: "center",
        borderRadius: "10px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
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
    var span_2 = {
        fontSize : "xxx-large",
        color: "#828282"
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
                <a style={box} href="/escatologia/1">
                    <div style={button_pressed}>
                        <span style={span_2} class="material-symbols-outlined"> home </span> 
                    </div>
                </a>
                <a style={box} href="/escatologia/2">
                    <div style={button_selected}>
                        <span style={span} class="material-symbols-outlined"> picture_as_pdf </span> 
                    </div>
                </a>
                <a style={box} href="/escatologia/3">
                    <div style={button}>
                        <span style={span_1} class="material-symbols-outlined"> task </span> 
                    </div>
                </a>
                <a style={box} href="/escatologia/4">
                    <div style={button}>
                        <span style={span_1} class="material-symbols-outlined"> task </span> 
                    </div>
                </a>
                <a style={box} href="/escatologia/5">
                    <div style={button}>
                        <span style={span_1} class="material-symbols-outlined"> task </span> 
                    </div>
                </a>   
                <a style={box} href="/escatologia/6">
                    <div style={button}>
                        <span style={span_1} class="material-symbols-outlined"> auto_videocam </span> 
                    </div>
                </a>
                <a style={box} href="/escatologia/7">
                    <div style={button}>
                        <span style={span_1} class="material-symbols-outlined"> preliminary</span> 
                    </div>
                </a>     
            </div>
            <div>

            <div style={customStyle}>
                <h1>Módulos</h1>
                <p style={center}>
                Lee los módulos antes de continuar con la tarea. <br/>
                Es importante que te encuentres registrado con tu Gmail para poder acceder a los módulos.<br/>
                <b>Presiona la imagen corespondiente </b>
                </p>
                <div style={content}>
                    <a style={boxes} href="https://drive.google.com/file/d/1mQzGWq1Xs43ykC68nV19oSBeU2u79HFA/view" download>            
                        <h2>Módulo 1</h2>
                        <img style={img} src={"https://i.imgur.com/cJ4UvSR.jpg"}></img>
                    </a>
                    <a style={boxes} href="https://drive.google.com/file/d/1M1zS9q2R-w2VFot4t00AttrfhDVmW6gy/view" download>            
                        <h2>Módulo 2</h2>
                        <img style={img} src={"https://i.imgur.com/SwPdQqO.jpg"}></img>
                    </a>
                    <a style={boxes} href="https://drive.google.com/file/d/1WICxYvVNPk8iWnUbXETebWcp3K9FgTt3/view" download>            
                        <h2>Módulo 3</h2>
                        <img style={img} src={"https://i.imgur.com/62vsudZ.png"}></img>
                    </a>
                    <a style={boxes} href="https://drive.google.com/file/d/1kiphEl_tGrry8PndGOL3WyjJdzRfeRLj/view" download>            
                        <h2>Módulo 4</h2>
                        <img style={img} src={"https://i.imgur.com/jebHzv8.png"}></img>
                    </a>
                </div>
                <h2>Videos complementarios</h2>
        <a style={boxes} href="https://www.youtube.com/playlist?list=PLM3CooHmrlGJALWrf1ukI06IKELan2oar" download>            
                <h2>Escatología</h2>
        </a>
            </div>
        </div>
    </div>
    );
  }