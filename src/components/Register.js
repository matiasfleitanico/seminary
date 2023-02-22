import { useRef } from "react";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export  default function Register() {
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    const [user, setUser] = useState({
        displayName: "",
        email: "",
        password: ""
    });
    const {signUp} = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState()

    var form;
    var signUpStyle;
    if (windowSize.current[0] < 900) {
        form = {
            display: "grid",
            alignItems: "start",
            justifyItems: "center",
            gridTemplateColumns: "1fr",
            gridGap: "20px",
            width: "100%"
        }
        signUpStyle = {
            display: "grid",
            alignItems: "center",
            justifyItems: "center",
            gridTemplateColumns: "1fr",
            padding: "45px",
            borderRadius: "39px",
            margin: "5%",
            gridGap: "30px",
            backgroundColor: "white"
        }
    } else {
        form = {
            display: "grid",
            alignItems: "start",
            justifyItems: "center",
            gridTemplateColumns: "1fr",
            gridGap: "20px",
            width: "100%"
        }
        signUpStyle = {
            display: "grid",
            alignItems: "center",
            justifyItems: "center",
            gridTemplateColumns: "1fr",
            padding: "45px",
            borderRadius: "39px",
            margin: "10% 25%",
            gridGap: "30px",
            backgroundColor: "white"
        }
    }

    const handleChange = ({target: {name, value}}) => {
        setUser({...user, [name]: value})
    }
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await signUp(user.email, user.password, user.displayName)
            navigate("/")
            setError("")
        } catch (error) {
            // setError(error.message)
            console.log(error.code)
            if(error.code === "auth/weak-password"){
                setError("Su contraseña es demasiado corta.")
            } else if(error.code === "auth/invalid-email") {
                setError("Correo inválido.")
            } else if(error.code === "auth/email-already-in-use") {
                setError("Este correo ya está registrado.")
            }
        }
        
    }
    const input = {
        backgroundColor : "white",
        width: "100%",
        color: "black",
        borderRadius: "5px",
        height: "39px",
        padding: "0 10px"
    }
    const button = {
        backgroundColor : "#333333",
        padding: "5px",
        minWidth: "150px",
        width: "100%",
        height: "39px",
        padding: "0 10px",
        borderRadius: "5px",
        color: "white",
        cursor: "pointer"
    }
    const button_2 = {
        backgroundColor : "grey",
        padding: "5px",
        minWidth: "150px",
        width: "100%",
        height: "39px",
        padding: "0 10px",
        borderRadius: "5px",
        color: "black",
        cursor: "pointer"
    }
    const toLogin = () => {
        navigate("/login")
    }
    return (
        <div style={signUpStyle}>
            <h1>Registrarse</h1>
            {error && <p>{error}</p>}
            <form style={form} onSubmit={handleSubmit}>
                <input style={input} type="text" name="displayName" placeholder="Nombre y Apellido" onChange={handleChange}/>
                <input style={input} type="email" name="email" placeholder="mariana@gmail.com" onChange={handleChange}/>
                <input style={input} type="password" name="password" placeholder="******" onChange={handleChange}/>
                <button style={button} >Registrarse</button>
            </form>
            <button style={button_2} onClick={toLogin}>O Ingresar</button>
        </div>
    );
  }