import React, { useState, useEffect } from 'react';
import "../FilesCss/subject-copy.css";


const Adventures = () => {
  const [currentAdventureIndex, setCurrentAdventureIndex] = useState(1  );
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  const [subjectName, setSubjectName] = useState('');
  const [adventures, setAdventures] = useState([
    {
      title: "Pagina 1",
      subtitles: [
        {
          title: "subtitulo 1",
          type: "class-video",
          description: "Esta es una introducción a la aventura.",
          videoPath: "videos/identidad/video.mp4",
          coverImage: "covers/identidad/photo1675362372.jpeg"
        },
        {
          title: "subtitulo 2",
          type: "module",
          description: "Este es un módulo para aprender más.",
          pdfPath: "modules/identity/file",
          coverImage: "ruta/de/imagen2.jpg"
        }
      ]
    },
    {
      title: "Pagina 2",
      subtitles: [
        {
          title: "subtitulo 3",
          type: "video",
          description: "Una lección en video sobre un tema interesante.",
          videoPath: "videos/identidad/Identidad y genética del AVIVAMIENTO - Materia # 1 - Certificado en Ministerio - Lic. Mario Fleita (1).mp4",
          coverImage: "ruta/de/imagen3.jpg"
        },
        {
          title: "subtitulo 4",
          type: "quizz",
          description: "Un cuestionario para poner a prueba tus conocimientos.",
          quizOptions: [
            { option: "Opción 1", isCorrect: true },
            { option: "Opción 2", isCorrect: false },
            { option: "Opción 3", isCorrect: false }
          ]
        }
      ]
    }
  ]);

  const handleSendData = () => {
    const url = `https://tecno-museo-default-rtdb.firebaseio.com/seminary/subjects.json`;

    console.log(adventures)
    console.log({ [subjectName]: adventures})

    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({ [subjectName]: adventures})
    })
      .then(response => response.json())
      .then(data => {
        console.log('Datos enviados exitosamente:', data);
      })
      .catch(error => {
        console.error('Error al enviar datos:', error);
      });
  };

  const handleAdventureChange = (index, field, value) => {
    const updatedAdventures = [...adventures];
    updatedAdventures[index][field] = value;
    setAdventures(updatedAdventures);
  };

  const handleSubtitleChange = (adventureIndex, subtitleIndex, field, value) => {
    const updatedAdventures = [...adventures];
    updatedAdventures[adventureIndex].subtitles[subtitleIndex][field] = value;
    setAdventures(updatedAdventures);
  };

  const currentAdventure = adventures[currentAdventureIndex];
  const currentSubtitle = currentAdventure.subtitles[currentSubtitleIndex];

  const handleDeleteSubtitle = (index) => {
    const updatedAdventures = [...adventures];
    updatedAdventures[currentAdventureIndex].subtitles.splice(index, 1);
    
    if (currentSubtitleIndex === index) {
      setCurrentSubtitleIndex(0);
    } else if (currentSubtitleIndex > index) {
      setCurrentSubtitleIndex(currentSubtitleIndex - 1);
    }
    
    setAdventures(updatedAdventures);
  };
  const handleAddSubtitle = () => {
    const newSubtitle = {
      title: 'Nuevo Subtítulo',
      type: 'video', // Define el tipo por defecto
      description: '',
      videoPath: '',
      coverImage: '',
    };
  
    const updatedAdventures = [...adventures];
    updatedAdventures[currentAdventureIndex].subtitles.push(newSubtitle);
    setAdventures(updatedAdventures);
    setCurrentSubtitleIndex(updatedAdventures[currentAdventureIndex].subtitles.length - 1);
  };
  const handleAddAdventure = () => {
    const newAdventure = {
      title: "Nueva Página",
      subtitles: [
        {
          title: "Subtítulo predeterminado",
          type: "class-video",
          description: "",
          videoPath: "",
          coverImage: ""
        }
      ]
    };
  
    const updatedAdventures = [...adventures, newAdventure];
    setCurrentAdventureIndex(updatedAdventures.length - 1);
    setCurrentSubtitleIndex(0);
    setAdventures(updatedAdventures);
  };
  
  const handleDeleteAdventure = (index) => {
    const updatedAdventures = [...adventures];
    updatedAdventures.splice(index, 1);
    console.log(currentSubtitle)
    if (currentAdventureIndex === index) {
      setCurrentAdventureIndex(0);
      setCurrentSubtitleIndex(0);
    } else if (currentAdventureIndex > index) {
      setCurrentAdventureIndex(currentAdventureIndex - 1);
    }
  
    setAdventures(updatedAdventures);
  };

  const handleSubtitleTypeChange = (newType) => {
    const updatedAdventures = [...adventures];
    const updatedSubtitle = { ...currentSubtitle, type: newType };
    
    if (newType === 'class-video') {
      updatedSubtitle.coverImage = 'ruta de la portada';
      updatedSubtitle.videoPath = 'ruta del video';
      updatedSubtitle.type = 'class-video';
      updatedSubtitle.description = 'Introduccion';
    } else if
    (newType === 'video') {
      updatedSubtitle.videoPath = 'ruta del video';
      updatedSubtitle.coverImage = '';
      updatedSubtitle.type = 'video';
      updatedSubtitle.description = 'Video';
    } else if (newType === 'module') {
      updatedSubtitle.pdfPath = 'ruta del pdf';
      updatedSubtitle.videoPath = '';
      updatedSubtitle.coverImage = '';
      updatedSubtitle.type = 'module';
      updatedSubtitle.description = 'Modulo Pdf';
      updatedSubtitle.complement = 'url para lectura complementaria';
    } else if (newType === 'quizz') {
      updatedSubtitle.pdfPath = '';
      updatedSubtitle.videoPath = '';
      updatedSubtitle.coverImage = '';
      updatedSubtitle.type = 'quizz';
      updatedSubtitle.description = 'Preguntas para desafiar tus conocimientos';
      updatedSubtitle.quizOptions = [
        { option: "Opción 1", isCorrect: true },
        { option: "Opción 2", isCorrect: false },
        { option: "Opción 3", isCorrect: false }
      ]
    } else if (newType === 'form') {
      updatedSubtitle.pdfPath = '';
      updatedSubtitle.videoPath = '';
      updatedSubtitle.coverImage = '';
      updatedSubtitle.type = 'form';
      updatedSubtitle.description = 'Este es un examen/tarea';
      updatedSubtitle.quizOptions = '';
      updatedSubtitle.formLink = 'aqui va el link de google embebed';
    }
    
    updatedAdventures[currentAdventureIndex].subtitles[currentSubtitleIndex] = updatedSubtitle;
    setAdventures(updatedAdventures);
  };
  const handleQuizOptionChange = (adventureIndex, subtitleIndex, optionIndex, field, value) => {
    const updatedAdventures = [...adventures];
    updatedAdventures[adventureIndex].subtitles[subtitleIndex].quizOptions[optionIndex][field] = value;
    setAdventures(updatedAdventures);
  };
  const handleAddQuizOption = () => {
    const updatedAdventures = [...adventures];
    const updatedSubtitle = { ...currentSubtitle };
    updatedSubtitle.quizOptions.push({ option: '', isCorrect: false });
    updatedAdventures[currentAdventureIndex].subtitles[currentSubtitleIndex] = updatedSubtitle;
    setAdventures(updatedAdventures);
  };
  const handleDeleteQuizOption = (optionIndex) => {
    const updatedAdventures = [...adventures];
    const updatedSubtitle = { ...currentSubtitle };
    updatedSubtitle.quizOptions.splice(optionIndex, 1);
    updatedAdventures[currentAdventureIndex].subtitles[currentSubtitleIndex] = updatedSubtitle;
    setAdventures(updatedAdventures);
  };

  const [subjects, setSubjects] = useState({});
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    fetch('https://tecno-museo-default-rtdb.firebaseio.com/seminary/subjects.json')
      .then(response => response.json())
      .then(data => {
        setSubjects(data);
      })
      .catch(error => {
        console.error('Error fetching subjects:', error);
      });
  }, []);

  const handleSelectSubject = (subjectKey) => {
    const selected = subjects[subjectKey];
    setSelectedSubject(selected);
    console.log('Subject seleccionado:', selected);
    setSubjectName(subjectKey);
    setAdventures(selected)
  };

  return (
    <div className="adventures-container">
      <div>
        <h2>Selecciona un tema:</h2>
        <div>
          {Object.keys(subjects).map((subjectKey) => (
            <button
              key={subjectKey}
              onClick={() => handleSelectSubject(subjectKey)}
            >
              {subjectKey}
            </button>
          ))}
        </div>
        {selectedSubject && (
          <div>
            <h3>Materia seleccionada:</h3>
          </div>
        )}
      </div>
      <input
        type="text"
        placeholder="Nombre de la materia"
        value={subjectName}
        onChange={(e) => setSubjectName(e.target.value)}
      />
      <div className="content-wrapper">
        {/* Botones de Página */}
      <div className="page-buttons">
        {adventures.map((adventure, index) => (
          <div key={index} className={`page-button ${index === currentAdventureIndex ? 'active' : ''}`}>
            <div className='button-title' onClick={() => {setCurrentAdventureIndex(index); setCurrentSubtitleIndex(0)}}>
              {adventure.title}
            </div>
            <button className='button'  onClick={() => handleDeleteAdventure(index)}>Eliminar</button>
          </div>
        ))}
        <button  className='button' onClick={handleAddAdventure}>+</button>
      </div>
        
        {/* Menú de Subtítulos */}
      <div className="subtitles-menu">
        {currentAdventure.subtitles.map((subtitle, index) => (
          <div key={index} className={`subtitle-item ${index === currentSubtitleIndex ? 'active' : ''}`}>
            <div className='button-title' onClick={() => setCurrentSubtitleIndex(index)}>
              {subtitle.title}
            </div>
            <button className='button'  onClick={() => handleDeleteSubtitle(index)}>Eliminar</button>
          </div>
        ))}
        <button className='button'  onClick={handleAddSubtitle}>+</button>
      </div>

      <div className="content-container">
      <button className='button' onClick={() => handleSubtitleTypeChange('class-video')}>Cambiar a Introducción</button>
      <button className='button' onClick={() => handleSubtitleTypeChange('video')}>Cambiar a Video</button>
      <button className='button' onClick={() => handleSubtitleTypeChange('quizz')}>Cambiar a Quiz</button>
      <button className='button' onClick={() => handleSubtitleTypeChange('module')}>Cambiar a Modulo</button>
      <button className='button' onClick={() => handleSubtitleTypeChange('form')}>Cambiar a Form</button>
      <h3>Tipo de subtitulo: {currentSubtitle.type.length ? currentSubtitle.type : ""}</h3>
      {currentSubtitle.type === 'class-video' && (
          <div className="module">
            <h1>Portada:</h1>
            <div className="module-link">
              <input
                type="text"
                value={currentAdventure.subtitles[currentSubtitleIndex].coverImage}
                onChange={(e) => handleSubtitleChange(currentAdventureIndex, currentSubtitleIndex, 'coverImage', e.target.value)}
              />
            </div>
          </div>
      )}
          <input
            type="text"
            value={currentAdventure.title}
            onChange={(e) => handleAdventureChange(currentAdventureIndex, 'title', e.target.value)}
          />
          <input
            type="text"
            value={currentSubtitle.title}
            onChange={(e) => handleSubtitleChange(currentAdventureIndex, currentSubtitleIndex, 'title', e.target.value)}
          />
          <textarea
            value={currentSubtitle.description}
            onChange={(e) => handleSubtitleChange(currentAdventureIndex, currentSubtitleIndex, 'description', e.target.value)}
          />
          {(currentSubtitle.type === 'class-video' || currentSubtitle.type === 'video') &&(
          <div className="module">
            <h1>Video:</h1>
            <div className="module-link">
              <input
                type="text"
                value={currentAdventure.subtitles[currentSubtitleIndex].videoPath}
                onChange={(e) => handleSubtitleChange(currentAdventureIndex, currentSubtitleIndex, 'videoPath', e.target.value)}
              />
            </div>
          </div>
        )}
        {currentSubtitle.type === 'module' &&(
           <div className="module">
          <div className="module">
            <h1>Modulo</h1>
            <div className="module-link">
              <input
                type="text"
                value={currentAdventure.subtitles[currentSubtitleIndex].pdfPath}
                onChange={(e) => handleSubtitleChange(currentAdventureIndex, currentSubtitleIndex, 'pdfPath', e.target.value)}
              />
            </div>
          </div>
          <div className="module">
                    <h1>Lectura complementaria:</h1>
                    <div className="module-link">
                      <input
                        type="text"
                        value={currentAdventure.subtitles[currentSubtitleIndex].complement}
                        onChange={(e) => handleSubtitleChange(currentAdventureIndex, currentSubtitleIndex, 'complement', e.target.value)}
                      />
                    </div>
                    </div>
                    </div>
        )}
        {currentSubtitle.type === 'form' &&(
          <div className="module">
            <h1>Link de formulario:</h1>
            <div className="module-link">
              <input
                type="text"
                value={currentAdventure.subtitles[currentSubtitleIndex].formLink}
                onChange={(e) => handleSubtitleChange(currentAdventureIndex, currentSubtitleIndex, 'formLink', e.target.value)}
              />
            </div>
          </div>

        )}
        {currentSubtitle.type === 'quizz' && (
          <div className="quizz">
            <h1>Quiz</h1>
            {currentSubtitle.quizOptions.length ? currentSubtitle.quizOptions.map((option, index) => (
            <div key={index} className="quiz-option">
            <input
              type="text"
              value={option.option}
              onChange={(e) => handleQuizOptionChange(currentAdventureIndex, currentSubtitleIndex, index, 'option', e.target.value)}
            />
            <label>
              Correcto
              <input
                type="checkbox"
                checked={option.isCorrect}
                onChange={(e) => handleQuizOptionChange(currentAdventureIndex, currentSubtitleIndex, index, 'isCorrect', e.target.checked)}
              />
            </label>
            <button className='button' v onClick={() => handleDeleteQuizOption(index)}>Eliminar</button>
          </div>
            )): ""}
            <button className='button'  onClick={handleAddQuizOption}>Agregar Opción</button>
          </div>
        )}
        </div>
      </div>
      <button className='button'  onClick={handleSendData}>Enviar</button>
    </div>
  );
}

export default Adventures;