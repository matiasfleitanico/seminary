import { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { usuario } from "../Users";
import React from "react";
import {
  AiOutlinePlusSquare
} from "react-icons/ai";
import "./FilesCss/forum.css"
var counter = 0;
var ids ;

export default function App() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [count, setCount] = useState(<h1></h1>);
  const [showNewTopicForm, setShowNewTopicForm] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const [originalCount, setOriginalCount] = useState(null); 
  const [liked, setLiked] = useState(<div className="heart-liked"></div>);
  let like = null;
  
  const newTopicIs = {
    title: "",
    content: "",
    user: "",
    comments: [{ 
      content: "aaaa",
      date: new Date(),
      likes: [["seminary"]],
      user: "matifleita"
    }]
  };

  const newComment = {
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

  useEffect(() => {
    getData(
      "https://tecno-museo-default-rtdb.firebaseio.com/seminary/forum.json?auth=" +
      user.accessToken
    ).then((data) => {
      if (counter <= 3) {
        getForum();
      }
    });
  }, []);

  async function getData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    counter = counter + 1;
    return response.json();
  }

  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "PATCH",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    return response.json();
  }

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
    ).then(() => {
      navigate("/");
    });
  }

  function sendTopic(username) {
    newTopicIs.content = document.getElementById("content").value;
    newTopicIs.title = document.getElementById("title").value;
    newTopicIs.user = username;
    postData(
      "https://tecno-museo-default-rtdb.firebaseio.com/seminary/forum/" +
      ids +
      ".json?auth=" +
      user.accessToken,
      newTopicIs
    ).then(() => {
      navigate("/");
    });
  }

  function newTopic() {
    setOriginalCount(count); // Almacena el valor original de count
    setShowNewTopicForm(true);
    setCount(
      <div className="topic-form">
        <div
        >
          <input
            type="text"
            id="title"
            placeholder="Escribe el título del tema"
            className="input-field"
          ></input>
          <textarea
            type="text"
            id="content"
            placeholder="Escribe la descripción"
            className="input-field"
          ></textarea>
          <div onClick={(e) => {
            sendTopic1(e);
            setShowNewTopicForm(false);
          }} className="submit-button">Enviar</div>
        </div>
      </div>
    );
  }
  
  function sendTopic1(e) {
    e.preventDefault()
    getData(
      "https://tecno-museo-default-rtdb.firebaseio.com/seminary/back-data/" +
      user.uid +
      ".json?auth=" +
      user.accessToken
    ).then((data) => {
      sendTopic(data["user"]); 
    });
  }


  function handleLike(commentIndex, replyIndex, li) {
    like = <div className="heart-liked"></div>;
    fetch(
      "https://tecno-museo-default-rtdb.firebaseio.com/seminary/back-data/" +
      user.uid +
      ".json?auth=" +
      user.accessToken
    )
      .then((response) => response.json())
      .then((data) => {
        const currentUser = data["user"];
        updateLikes(user.uid, commentIndex, replyIndex, li);
      })
      .catch((error) => {
        console.error("Error fetching username:", error);
      });
  }
  
  function updateLikes(username, commentIndex, replyIndex, like) {
    const url =
      "https://tecno-museo-default-rtdb.firebaseio.com/seminary/forum/" +
      (commentIndex -1) +
      "/comments/" +
      (replyIndex - 1) +
      "/likes.json?auth=" +
      user.accessToken;
  
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ [like] : [username] }), // Add the username to the likes object
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`User ${username} liked comment ${commentIndex} - reply ${replyIndex}`);
        navigate("/foro");
      })
      .catch((error) => {
        console.error("Error updating likes:", error);
      });
  }
  
  function getForum() {
    setShowBackButton(true);
  
    let username;
    function onPressButton(a, i, q) {

      for (let i = 0; i < a.comments.length; i++) {
        const comentary = a.comments[i];
        const userLiked = comentary.likes.some(like => like[0] === user.uid);
      
        if (userLiked) {
          like = <div className="heart-liked"></div>;
          break;
        } else {
          like = (
            <div onClick={() => handleLike(i, q, comentary.likes.length)} className="heart"></div>
          );
        }
      }

      let comments = a.comments.map((comen, i) =>{

      if (i >= 1) {
        
        return (
          <div className="comment" key={i}>
            <p className="comment-content">{comen.content}</p>
            <p className="comment-user">@{comen.user}</p>
            <p className="comment-date">{comen.date}</p>
            <div className="comment-likes">
              <button className={`like-button`}>
              {like}
              </button>
              <p className={`likes-count ${comen.isLiked ? 'liked' : ''}`}>{comen?.likes.length - 1}</p>
            </div>
          </div>
        );
      } else {
        return null; // No renderizar nada para el primer comentario
      }});
      const descriptionWithLineBreaks = a.content.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));
      setCount(
        <div className="topic-details">
        <div>
          <h2>{a.title}</h2>
          <p className="comment-user">@{a.user}</p>
          <p><br/>{descriptionWithLineBreaks}<br/></p>
        </div>
        {comments}
        <form
          onSubmit={(e) => {
            sendComment(e, i, q, username);
          }}
        >
          <input
            type="text"
            id="comment"
            placeholder="Escribe tu comentario"
            className="input-field"
          ></input>
          <input type="submit" value="Enviar" className="submit-button"/>
        </form>
      </div>
      );
    }
    getData(
      "https://tecno-museo-default-rtdb.firebaseio.com/seminary/back-data/" +
      user.uid +
      ".json?auth=" +
      user.accessToken
    ).then((data) => {
      username = data["user"];
    });
  
    getData(
      "https://tecno-museo-default-rtdb.firebaseio.com/seminary/forum.json?auth=" +
      user.accessToken
    ).then((data) => {
      var forumes = data;
      ids = forumes.length;
      setTimeout(() => {
        setCount(
          forumes.map((counter, i) => {
            const descriptionWithLineBreaks = counter.content.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ));
        
            return (
              <div
                className="forum-item"
                onClick={() => {
                  onPressButton(counter, i, counter?.comments.length);
                }}
                key={i}
              >
                <h2 className="forum-title">{counter.title}</h2>
                <p className="comment-user"></p>
                <p className="forum-content"><em/>@{counter.user}<em/><br/><br/>{descriptionWithLineBreaks}</p>
                <p className="forum-responses">
                  {counter?.comments.length - 1} respuestas
                </p>
              </div>
            );
          })
        );
        setShowBackButton(false); // Desactiva el botón de regreso después de cargar los datos
        setShowNewTopicForm(false); // Oculta el formulario de nuevo tema después de cargar los datos
      }, 1500);
    });
  }
  

  const user_id = usuario.alumnos.findIndex(
    (alumno) => user.email === alumno.email
  );

  return (
    <div className="app-container">
    <div>
      <h2>Foro de alumnos</h2>
      <div className="forum-container">
        {count}
        {showBackButton && (
          <div
            onClick={() => {
              getForum();
            }}
            className="back-button"
          >
            Regresar
          </div>
        )}
        {!showNewTopicForm && !showBackButton && (
          <div
            onClick={() => {
              newTopic();
            }}
            className="add-topic-button"
          >
            <AiOutlinePlusSquare />
          </div>
        )}
      </div>
    </div>
  </div>
  );
}