import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { usuario } from "../Users";


export default function App() {

    const {logout, loading, user} = useAuth();
    const navigate = useNavigate()

    const HandleLogout = async () => {
        await logout();
        navigate("/login")
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
        borderRadius: "10px"
    }
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
    const bigbox = {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        padding: "10px",
        width: "100%"
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
    var listItems = user.email === email_user ? usuario.alumnos[user_id].access.map((number) =>
        <a href={usuario.materias[number].path} style={box}>
            <h2>{usuario.materias[number].title}</h2>
            <img style={img} src={usuario.materias[number].link}></img>
            <p>{usuario.materias[number].description}</p>
        </a>
    ) : "";

    if(loading) return <h1>Loading</h1>

    if(user.email === "matiasfleitanico@gmail.com") return(
        <div style={customStyle}>
            <h1>Hola {user.displayName || user.email}, usted es Administrador</h1>
            <button style={button} onClick={HandleLogout}>Salir</button>
            <div style={bigbox}>
                {listItems}
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
                {listItems}
            </div>
        </div>
    );
  }