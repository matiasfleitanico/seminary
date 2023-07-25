
import { useNavigate } from "react-router-dom";
import React from "react";


export default function Search() {
    const navigate = useNavigate();
    setTimeout(()=> {
        navigate("/foro");
    }, 1000)
    
  return (
    <div>
        <div></div>
    </div>
  );
}
