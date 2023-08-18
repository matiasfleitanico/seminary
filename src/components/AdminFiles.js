import './FilesCss/Admin.css';
import React, { useState } from 'react';
import { uploadFile, getDownloadUrlForFile } from "../firebase"

function FileUploader() {
  const [filePath, setFilePath] = useState('');
  const [filePath2, setFilePath2] = useState('');
  const [filePath3, setFilePath3] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(''); 
  const [url, setUrl] = useState(''); 

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  };

  const handlePathChange2 = (event) => {
    setFilePath2(event.target.value);
  };

  const handlePathChange3 = (event) => {
    setFilePath3(event.target.value);
  };
  const handlePathChange = (event) => {
    setFilePath(event.target.value);
    if(event.target.value === "modules/"){
      setFilePath2("");
    } else if(event.target.value === "videos/"){
      setFilePath2("");
    }
  };
  const handlePathButton = (path) => {
    setFilePath(path);
    if(path=== "profile/"){
      setFilePath2("");
    } else if(path === "videos/"){
      setFilePath2("");
    }
  };

  const handlePathButton2 = (path) => {
    setFilePath2(path);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      const fullFilePath = filePath + filePath2 + filePath3;
      uploadFile(selectedFile, fullFilePath);
      const fileName = selectedFile.name;
      setUrl(await getDownloadUrlForFile(fileName));
      setFileUrl(url); // Actualiza el estado con la URL del archivo
    }
  };

  return (
    <div className="file-uploader-container">
      <h1 className="file-uploader-title">Asistente para subir archivos</h1>
      <form onSubmit={handleSubmit} className="file-uploader-form">
        <div className="file-input-container">
          <label className="file-input-label">Arrastra tus archivos aquí</label>
          <input accept=".jpg, .jpeg, .png, .mp4, .pdf" type="file" onChange={handleFileChange} className="file-input" />
        </div>
        <div className="path-input-container">
          <label className="path-input-label">Armado de ruta de archivo</label>
          <input type="text" value={filePath} onChange={handlePathChange} className="path-input" disabled />
          {["modules/", "videos/"].includes(filePath) && (
            <input type="text" value={filePath2} onChange={handlePathChange2} className="path-input" disabled />
          )}
          <input type="text" value={filePath3} onChange={handlePathChange3} className="path-input" placeholder='Escriba aqui el nombre para su archivo'/>
          <label className="path-input-label">Ruta final del archivo (No olvide agregarle al final el tipo de archivo. Por ej: mp4, jpg, etc...)</label>
          <input type="text" value={filePath + filePath2 + filePath3} className="path-input" disabled />
          <div className="path-buttons">
            <p>¿Qué tipo de archivo estás buscando subir?</p>
            <button type="button" className="path-button" onClick={() => handlePathButton("modules/")}>Modulos</button>
            <button type="button" className="path-button" onClick={() => handlePathButton("profile/")}>Fotos</button>
            <button type="button" className="path-button" onClick={() => handlePathButton("videos/")}>Videos</button>
            <button type="button" className="path-button" onClick={() => handlePathButton("covers/")}>Portadas</button>
          </div>
          {["modules/", "videos/"].includes(filePath) && (
            <div className="path-buttons">
              <p>¿Para qué materia?</p>
              <button type="button" className="path-button" onClick={() => handlePathButton2("identidad/")}>Identidad</button>
              <button type="button" className="path-button" onClick={() => handlePathButton2("espiritusanto/")}>Espíritu Santo</button>
              <button type="button" className="path-button" onClick={() => handlePathButton2("oracionyguerra/")}>Guerra Espiritual</button>
              <button type="button" className="path-button" onClick={() => handlePathButton2("hermeneutica/")}>Hermenéutica</button>
              <button type="button" className="path-button" onClick={() => handlePathButton2("evangeliossinopticos/")}>Evangelios Sinópticos</button>
              <button type="button" className="path-button" onClick={() => handlePathButton2("escatologia/")}>Escatología</button>
              <button type="button" className="path-button" onClick={() => handlePathButton2("salud/")}>Salud física, emocional y espiritual</button>
              <button type="button" className="path-button" onClick={() => handlePathButton2("avivamiento/")}>Seminario de Avivamiento I</button>
              <button type="button" className="path-button" onClick={() => handlePathButton2("fundamentos/")}>Fundamentos de las Doctrinas Cristianas</button>
            </div>
          )}
        </div>
        <button type="submit" className="submit-button">Enviar</button>
      </form>
      {fileUrl && (
        <h1 className="file-url">URL del archivo: <a href={fileUrl}>{url}</a></h1>
      )}
    </div>
  );
}

export default FileUploader;