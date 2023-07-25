import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { usuario } from "../Users";
import React from "react";
import { useState } from "react";
var counter = 0;
let emails = [];

export default function App() {
  const { logout, loading, user } = useAuth();
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();
  var datas;
  var listItems;
  const [Uid, setUid] = useState("");

  const [newUser, setNewUser] = useState({
    email: "",
    access: [],
    credential: "",
    academyic_table: [],
  });

  const handleChangeForUid = ({ target: { value } }) => {
    setUid(value);
  };
  const handleChange_1 = ({ target: { name, value } }) => {
    if (value === "on") {
      setNewUser({ ...newUser, access: newUser.access.concat(parseInt(name)) });
    } else {
      for (let i = 0; i < newUser.access.length; i++) {
        if (i === name) {
          let newArr = newUser.filter((newUs) => newUs != i);
          setNewUser(...newUser, newArr);
        }
      }
    }
    setTimeout(() => {
      console.log(newUser);
    }, 300);
  };
  const handleChange = ({ target: { name, value } }) => {
    setNewUser({ ...newUser, [name]: value });
    console.log(newUser);
  };
  let form = {};

  async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "PATCH", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  function submitData(e) {
    e.preventDefault();
    postData(
      "https://tecno-museo-default-rtdb.firebaseio.com/seminary/" +
        Uid +
        ".json?auth=" +
        user.accessToken,
      newUser
    ).then((data) => {
      datas = data; // JSON data parsed by `data.json()` call
    });
  }

  console.log(user);
  const [count, setCount] = React.useState(<h1></h1>);

  function delayAddOne() {
    Object.entries(datas).forEach(([key, value]) => {
      emails = emails.concat([value]);
      console.log(emails, "333333333333");
    });
    setCount(() => {
      let html = "";
      for (let i = 0; i < emails.length; i++) {
        html = html.concat(<p>{emails[i].email}</p>);
        console.log(html);
        if ((i = emails.length - 1)) {
          return html;
        }
      }
    });
  }

  async function getData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    counter = counter + 1;
    return response.json(); // parses JSON response into native JavaScript objects
  }

  getData(
    "https://tecno-museo-default-rtdb.firebaseio.com/seminary/back-data.json?auth=" +
      user.accessToken
  ).then((data) => {
    datas = data; // JSON data parsed by `data.json()` call
    setCount(()=>{
      setCount(
      <div style={box}>
          <h2>hola</h2>
          <p>estamos trabajando para mejorar las listas de administradores</p>
      </div>
      );
    })
  });

  const HandleLogout = async () => {
    await logout();
    navigate("/login");
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
  };
  const header = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    justifyItems: "end",
    height: "50px",
    width: "100%",
  };

  const button = {
    backgroundColor: "#333333",
    padding: "5px",
    minWidth: "150px",
    width: "50px",
    height: "39px",
    padding: "0 10px",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
    justifySelf: "end",
    margin: "10px",
  };
  var email_user = "";
  var user_id = 0;
  for (let i = 0; i < usuario.alumnos.length; i++) {
    if (user.email === usuario.alumnos[i].email) {
      email_user = user.email;
      user_id = i;
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
    color: "black",
  };
  const bigbox = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    padding: "10px",
    width: "100%",
  };
  const name_tittle = {
    justifySelf: "start",
    margin: "15px",
    color: "grey",
  };
  var img = {
    borderRadius: "8px",
    width: "100%",
  };
  var canva_1 = {
    position: "relative",
    width: "100%",
    height: "0",
    paddingTop: "63.2047%",
    paddingBottom: "0",
    boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16",
    marginTop: "1.6em",
    marginBottom: "0.9em",
    overflow: "hidden",
    borderRadius: "8px",
    willChange: "transform",
  };
  var canva_2 = {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
    border: "none",
    padding: "0",
    margin: "0",
  };
  return (
    <div style={customStyle}>
      <div style={header}>
        <h4 style={name_tittle}>{user.displayName || user.email}</h4>
        <button style={button} onClick={HandleLogout}>
          Cerrar Sesión
        </button>
      </div>
      <div>
        <h1>Panel de Administración</h1>
        <h3>Alumnos</h3>
      </div>
      <form onSubmit={submitData}>{count}</form>
    </div>
  );
}
