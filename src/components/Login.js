import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export  default function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState()

    const handleChange = ({target: {name, value}}) => {
        setUser({...user, [name]: value})
    }
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await login(user.email, user.password)
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
            } else if (error.code === "auth/wrong-password") {
                setError("Su contraseña es incorrecta, intente nuevamente.")
            } else if (error.code === "auth/user-not-found") {
                setError("Usuario no encontrado")
            } else if(error.code === "auth/too-many-requests") {
                setError("Intentó demasiadas veces, intente de nuevo más tarde.")
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

    const form = {
        display: "grid",
        alignItems: "start",
        justifyItems: "center",
        gridTemplateColumns: "1fr",
        gridGap: "20px",
        width: "100%"
    }
    const loginStyle = {
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
        gridTemplateColumns: "1fr",
        padding: "45px",
        borderRadius: "39px",
        margin: "25%",
        gridGap: "30px",
        backgroundColor: "white"
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

    const googleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginWithGoogle()
            // console.log("then")
            // navigate("/")
        } catch (error){
            console.log(error)
        }
    }
    const toRegister = () => {
        navigate("/register")
    }
    
    return (
        <div style={loginStyle}>
            <h1>Iniciar Sesión</h1>
            {error && <p>{error}</p>}
            <form style={form} onSubmit={handleSubmit}>
                <input style={input} type="emai" name="email" placeholder="pedro@gmail.com" onChange={handleChange}/>
                <input style={input}  type="password" name="password" placeholder="*******" onChange={handleChange}/>
                <button style={button} >Ingresar</button>
            </form>
            
            <button style={button_2} onClick={toRegister}>Registrarse</button>
        </div>
    );
  }
  //<button style={button} onClick={googleLogin}>Ingresar con Google</button>