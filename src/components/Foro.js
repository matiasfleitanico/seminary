import { useRef } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { usuario } from "../Users";
import React from "react";
import {
  AiFillHome,
  AiOutlineSearch,
  AiFillSetting,
  AiOutlinePlusSquare,
  AiFillBook
} from "react-icons/ai";
import { RiAccountCircleFill } from "react-icons/ri";
var counter = 0;
var ids ;

export default function App() {
  var main = {};
  var sidebar_2 = {};
  var span_1 = {};
  var span_side_2 = {};
  var span_side_3 = {};
  var sidebar = {};
  var button_selected = {};
  var buttons = {};
  var button_pressed = {};
  var newTopicIs = {
    title: "",
    content: "",
    date: new Date().toLocaleDateString("es-ar", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    user: "",
    comments:
    [{ 
      content: "aaaa",
      date: new Date(),
      likes: ["seminary"],
      user: "matifleita"
    }]
  };


      
  
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const { logout, loading, user } = useAuth();
  const navigate = useNavigate();
  var datas;
  var courses;
  var forumes;
  var newComment = {
    content: "",
    date: new Date().toLocaleDateString("es-ar", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    likes: ["seminary"],
    user: "",
  };

  function newTopic() {
    setCount(
      <div>
        <form
          onSubmit={(e) => {
            sendTopic1(e);
            console.log("Sdfsdfsdfsdf")
          }}
          style={bigbox_5}
        >
          <input
            style={input_1}
            type="text"
            id="title"
            placeholder="Escribe el título del tema"
          ></input>
          <p></p>
          <input
            style={input}
            type="text"
            id="content"
            placeholder="Escribe la descripción"
          ></input>
          <p></p>
          <input type="submit" value="Enviar datos"/>
        </form>
      </div>
    );
  }

  const [count, setCount] = React.useState(<h1></h1>);

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
    return response.json();
    // parses JSON response into native JavaScript objects
  }

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

  getData(
    "https://tecno-museo-default-rtdb.firebaseio.com/seminary/forum.json?auth=" +
      user.accessToken
  ).then((data) => {
    datas = data; // JSON data parsed by `data.json()` call
    if (counter <= 3) {
      getForum();
    }
  });

  function sendComment(e, i, q, username) {
    e.preventDefault();
    newComment.content = document.getElementById("comment").value;
    newComment.user = username;
    postData(
      "https://tecno-museo-default-rtdb.firebaseio.com/seminary/forum/" +
        i +
        "/comments/" +
        q +
        ".json?auth=" +
        user.accessToken,
      newComment
    ).then((data) => {
      datas = data;
      navigate("/")// JSON data parsed by `data.json()` call
    });
  }

  function sendTopic(username) {
    newTopicIs.content = document.getElementById("content").value;
    newTopicIs.title = document.getElementById("title").value;
    newTopicIs.user = username;
    console.log("ssssssssssssss" + ids)
    postData(
      "https://tecno-museo-default-rtdb.firebaseio.com/seminary/forum/" +
        ids +
        ".json?auth=" +
        user.accessToken,
        newTopicIs
    ).then((data) => {
      datas = data;
      navigate("/")// JSON data parsed by `data.json()` call
    });
  }
  function sendTopic1(e) {
    e.preventDefault();
    getData(
      "https://tecno-museo-default-rtdb.firebaseio.com/seminary/back-data/" +
        user.uid +
        ".json?auth=" +
        user.accessToken
    ).then((data) => {
      datas = data;
      sendTopic(datas["user"]); 
    });
  }

  function getForum() {
    let username;
    getData(
      "https://tecno-museo-default-rtdb.firebaseio.com/seminary/back-data/" +
        user.uid +
        ".json?auth=" +
        user.accessToken
    ).then((data) => {
      datas = data;
      username = datas["user"];
    });
    function onPressButton(a, i, q) {

      let comments = a.comments.map((comen, i) =>
        i < 1 ? (
          ""
        ) : (
          <div style={bigbox_4}>
            <p>{comen.content}</p>
            <p style={parraf}>@{comen.user}</p>
            <p style={parraf_1}>{comen.date}</p>
            <p style={parraf}>{comen?.likes.length - 1} likes</p>
          </div>
        )
      );
      setCount(
        <div>
          <div style={bigbox_3}>
            <h2>{a.title}</h2>
            <p style={parraf}>@{a.user}</p>
            <p>{a.content}</p>
          </div>
          {comments}
          <form
            onSubmit={(e) => {
              sendComment(e, i, q, username);
            }}
            style={bigbox_3}
          >
            <input
            style={input}
              type="text"
              id="comment"
              placeholder="Escribe tu comentario"
            ></input>
            <input style={button} type="submit" value="Enviar"/>
          </form>
        </div>
      );
    }
    getData(
      "https://tecno-museo-default-rtdb.firebaseio.com/seminary/forum.json?auth=" +
        user.accessToken
    ).then((data) => {
      forumes = data;

      ids = forumes.length
      console.log("aaaaaaaaaaaaaaaaaaaaaaaa" + ids)
      setTimeout(() => {
        setCount(
          forumes.map((counter, i) => (
            <div
              onClick={() => {

                onPressButton(counter, i, counter?.comments.length);
              }}
              style={bigbox_3}
            >
              <h2>{counter.title}</h2>
              <p style={parraf}>@{counter.user}</p>
              <p>{counter.content}</p>
              <p style={parraf}>{counter?.comments.length - 1} respuestas</p>
            </div>
          ))
        );
      }, 1500);
    });
  }
  var whitebox;
  let input = {
    border: "none",
    minHeight: "100px",
    borderRadius: "10px",
    margin: "25px 10px",
    padding: "25px 10px",
  };
  let input_1 = {
    border: "none",
    height: "25px",
    borderRadius: "10px",
    margin: "25px 10px",
    padding: "25px 10px",
  };
  let parraf = {
    display: "grid",
    alignSelf: "start",
    justifySelf: "end",
    color: "grey",
  };
  let parraf_1 = {
    display: "grid",
    alignSelf: "start",
    justifySelf: "start ",
    color: "grey",
  };
  let bigbox_3 = {
    backgroundColor: "#EAE8E8",
    borderRadius: "10px",
    textDecoration: "none",
    color: "black",
    padding: "0 40px",
    margin: "10px 45px",
    display: "grid",
    gridTemplateColumns: "80% 20%",
    gridTemplateRows: "1fr 1fr",
  };

  let bigbox_4 = {
    backgroundColor: "white",
    borderRadius: "10px",
    textDecoration: "none",
    color: "black",
    padding: "0 40px",
    margin: "10px 45px",
    display: "grid",
    gridTemplateColumns: "80% 20%",
    gridTemplateRows: "1fr 1fr",
    border: "1px solid #000",
  };
  let bigbox_5 = {
    backgroundColor: "#EAE8E8",
    borderRadius: "10px",
    textDecoration: "none",
    color: "black",
    padding: "0 40px",
    margin: "10px 45px",
    display: "grid",
    gridTemplateColumns: "80% 20%",
    gridTemplateRows: "30% 70%",
  };
  var bigbox;
  const HandleLogout = async () => {
    await logout();
    navigate("/login");
  };
  if (windowSize.current[0] < 900) {
    bigbox = {
      display: "grid",
      gridTemplateColumns: "repeat(1, 1fr)",
      padding: "10px",
      width: "100%",
    };
    whitebox = {
      display: "grid",
      gridTemplateColumns: "repeat(1, 1fr)",
      padding: "10px",
      width: "100%",
      backgroundColor: "white",
      borderRadius: "10px",
      margin: "40px 0",
    };
  } else {
    bigbox = {
      display: "grid",
      gridTemplateColumns: "repeat(1, 1fr)",
      padding: "10px",
      width: "100%",
    };
    whitebox = {
      display: "grid",
      gridTemplateColumns: "repeat(1, 1fr)",
      padding: "10px",
      width: "100%",
      backgroundColor: "white",
      borderRadius: "10px",
      margin: "40px 0",
    };
  }

  const customStyle = {
    display: "grid",
    alignItems: "center",
    justifyItems: "center",
    gridTemplateColumns: "80% 20%",
    gridTemplateRows: "1fr",
    padding: "15px",
    gridGap: "30px",
    width: "auto",
    height: "auto",
    margin: "15px 0",
    justifySelf: "center",
    alignSelf: "center",
    height: "auto",
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
    borderRadius: "12px",
    padding: "10px",
    width: "80%",
    display: "grid",
    margin: "10px",
    textDecoration: "none",
    color: "black",
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

  if (windowSize.current[0] < 900) {
    main = {
      display: "grid",
      gridTemplateRows: "auto 80% auto",
      padding: "10px",
    };
    sidebar_2 = {
      backgroundColor: "#8C32FF",
      width: "100%",
      margin: "15px 0",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
      alignItems: "center",
      position: "fixed",
      bottom: "-15px",
      left: "0",
      height: "4%",
    };
    span_1 = {
      color: "black",
      margin: "0",
      fontSize: "small",
    };
    span_side_2 = {
      color: "white",
      fontSize: "1rem",
      textAlign: "center",
      textDecoration: "none",
      textJustify: "inter-word",
      alignItems: "center",
    };
    sidebar = {
      display: "grid",
      alignItems: "center",
      justifyItems: "center",
      gridTemplateColumns: "1fr",
      gridGap: "15px",
      width: "100%",
      height: "auto",
      margin: "15px",
      justifySelf: "center",
      alignSelf: "start",
      borderRadius: "10px",
    };
    button_selected = {
      display: "grid",
      alignItems: "center",
      justifyItems: "center",
      gridTemplateColumns: "1fr",
      gridGap: "30px",
      backgroundColor: "#333333",
      width: "100%",
      height: "45px",
      justifySelf: "center",
      alignSelf: "center",
      borderRadius: "10px",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };
    button_pressed = {
      display: "grid",
      alignItems: "center",
      justifyItems: "center",
      gridTemplateColumns: "1fr",
      gridGap: "30px",
      backgroundColor: "#656565",
      width: "100%",
      height: "45px",
      justifySelf: "center",
      alignSelf: "center",
      borderRadius: "10px",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };
    buttons = {
      display: "grid",
      alignItems: "center",
      justifyItems: "center",
      gridTemplateColumns: "1fr",
      gridGap: "30px",
      backgroundColor: "white",
      width: "100%",
      height: "45px",
      justifySelf: "center",
      alignSelf: "center",
      borderRadius: "10px",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };
  } else {
    main = {
      display: "grid",
      gridTemplateColumns: "20% 71% 7%",
      padding: "10px",
      gridGap: "5px",
      width: "100%",
    };
    sidebar_2 = {
      backgroundColor: "#8C32FF",
      width: "100%",
      borderRadius: "10px",
      margin: "15px 0",
      display: "grid",
      gridTemplateRows: "1fr 1fr 1fr 1fr 1fr",
      alignItems: "center",
      maxWidth: "100px",
      height: "100%",
    };
    span_1 = {
      color: "black",
      margin: "0",
    };
    span_side_2 = {
      color: "white",
      fontSize: "2rem",
      textAlign: "center",
      textDecoration: "none",
      textJustify: "inter-word",
      alignItems: "center",
    };
    sidebar = {
      display: "grid",
      alignItems: "center",
      justifyItems: "center",
      gridTemplateColumns: "1fr",
      gridGap: "15px",
      width: "100%",
      height: "auto",
      margin: "15px",
      justifySelf: "center",
      alignSelf: "start",
      borderRadius: "10px",
    };
    button_selected = {
      display: "grid",
      alignItems: "center",
      justifyItems: "center",
      gridTemplateColumns: "1fr",
      gridGap: "30px",
      backgroundColor: "#333333",
      width: "100%",
      height: "100px",
      justifySelf: "center",
      alignSelf: "center",
      borderRadius: "10px",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };
    button_pressed = {
      display: "grid",
      alignItems: "center",
      justifyItems: "center",
      gridTemplateColumns: "1fr",
      gridGap: "30px",
      backgroundColor: "#656565",
      width: "100%",
      height: "100px",
      justifySelf: "center",
      alignSelf: "center",
      borderRadius: "10px",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };
    buttons = {
      display: "grid",
      alignItems: "center",
      justifyItems: "center",
      gridTemplateColumns: "1fr",
      gridGap: "30px",
      backgroundColor: "white",
      width: "100%",
      height: "100px",
      justifySelf: "center",
      alignSelf: "center",
      borderRadius: "10px",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };
  }
  let span_side_4 = {
    color: "grey",
    fontSize: "4rem",
    textAlign: "end",
    textDecoration: "none",
    display: "grid",
    alignItems: "end",
    padding: "25px 40px",
  };
  if (
    user.email === "matiasfleitanico@gmail.com" ||
    user.email === "ezekielfleita10@gmail.com" ||
    user.email === "seminariopoderdedios@gmail.com" ||
    user.email === "fleita.ariana@gmail.com"
  ) {
    return (
      <div style={customStyle}>
        <div style={whitebox}>
          <h2>Foro de alumnos</h2>
          <div style={bigbox}>
            {count}
            <div
              onClick={() => {
                newTopic();
              }}
              style={span_side_4}
              href="/"
            >
              <AiOutlinePlusSquare />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div style={customStyle}>
        <div style={whitebox}>
          <h2>Foro de alumnos</h2>
          <div style={bigbox}>
            {count}
            <div
              onClick={() => {
                newTopic();
              }}
              style={span_side_4}
              href="/"
            >
              <AiOutlinePlusSquare />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
