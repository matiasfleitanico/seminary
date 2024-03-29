import "../FilesCss/subject.css";
import React, { useState, useEffect } from 'react';
import Menu from '../MenuSubject';
import VideoPlayer from "../VideoPlayer";
import { getDownloadUrlForFile } from "../../firebase";
import { useAuth } from '../../context/authContext';

function App() {
  const { logout, user } = useAuth();
  const [selectedSubtitle, setSelectedSubtitle] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [contentScreen, setContentScreen] = useState(null);
  const [sign, setSign] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedAdventureIndex, setSelectedAdventureIndex] = useState(0); // Estado para almacenar el índice de la aventura actual
  const [selectedSubtitleIndex, setSelectedSubtitleIndex] = useState(0); // Estado para almacenar el índice del subtitle actual

  
  useEffect(() => {
    // Realizar la solicitud GET aquí
    async function fetchSubjects() {
      try {
        const response = await fetch('https://tecno-museo-default-rtdb.firebaseio.com/seminary/subjects/identidad.json');
        const data = await response.json();
        handleAdventureClick(data[0]["subtitles"][0]); // Establecer el primer objeto como seleccionado
        setSubjects(data);

      const subjectsWithCount = data.map((adventure) => ({
        ...adventure,
        subtitlesCount: adventure.subtitles.length,
      }));

      const totalSubtitles = subjectsWithCount.reduce((total, adventure) => total + adventure.subtitles.length, 0);

      console.log("Cantidad total de subtitles:", totalSubtitles);

      setSubjects(subjectsWithCount);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    }

    fetchSubjects();
  }, []);


  const handleNextSubtitleClick = () => {
    const currentAdventure = subjects[selectedAdventureIndex];
    const nextSubtitleIndex = selectedSubtitleIndex + 1;
  
    // Cambiar al próximo subtitle de la aventura actual
    if (nextSubtitleIndex < currentAdventure.subtitles.length) {
      setSelectedSubtitleIndex(nextSubtitleIndex);
      handleAdventureClick(currentAdventure.subtitles[nextSubtitleIndex]);
    } else {
      // Restablecer el índice de subtítulo y avanzar a la siguiente aventura
      const nextAdventureIndex = selectedAdventureIndex + 1;
      if (nextAdventureIndex < subjects.length) {
        setSelectedAdventureIndex(nextAdventureIndex);
        setSelectedSubtitleIndex(0);
        handleAdventureClick(subjects[nextAdventureIndex].subtitles[0]);
      } else {
        // No hay más aventuras ni subtítulos
      }
    }
  };
  
  const handlePreviousSubtitleClick = () => {
    if (selectedSubtitleIndex > 0) {
      const prevSubtitleIndex = selectedSubtitleIndex - 1;
      setSelectedSubtitleIndex(prevSubtitleIndex);
      handleAdventureClick(subjects[selectedAdventureIndex].subtitles[prevSubtitleIndex]);
    } else {
      const prevAdventureIndex = selectedAdventureIndex - 1;
      if (prevAdventureIndex >= 0) {
        const prevAdventure = subjects[prevAdventureIndex];
        const prevSubtitleIndex = prevAdventure.subtitles.length - 1;
        setSelectedAdventureIndex(prevAdventureIndex);
        setSelectedSubtitleIndex(prevSubtitleIndex);
        handleAdventureClick(prevAdventure.subtitles[prevSubtitleIndex]);
      } else {
        // No hay aventuras anteriores ni subtítulos
      }
    }
  };
  const handleOptionClick = (index) => {
    setSelectedOption(index);

    if (selectedSubtitle.quizOptions[index].isCorrect) {
      setFeedback('¡Muy bien! Respuesta correcta.');
    } else {
      setFeedback('Respuesta incorrecta. Inténtalo de nuevo.');
    }
  };

  const handleAdventureClick = async (selectedSubtitle) => {
    setSelectedSubtitle(selectedSubtitle);

    if (selectedSubtitle.type === 'video') {
      const videoUrl = await getDownloadUrlForFile(selectedSubtitle.videoPath);
      setContentScreen(
        <div>
          <h1>{selectedSubtitle.title}</h1>
          <p>{selectedSubtitle.description}</p>
          <VideoPlayer videoUrl={videoUrl} />
        </div>
      );
    } else if (selectedSubtitle.type === 'module') {
      const pdfPath = await getDownloadUrlForFile(selectedSubtitle.pdfPath);
      setContentScreen(
        <div className="content-container">
          <h1>{selectedSubtitle.title}</h1>
          <p>{selectedSubtitle.description}</p>
          <div className="pdf-container">
            <iframe
              title={selectedSubtitle.title}
              src={pdfPath}
              width="100%"
              height="100%"
            />
          </div>
        </div>
      );
    } else if (selectedSubtitle.type === 'class-video') {
      const videoUrl = await getDownloadUrlForFile(selectedSubtitle.videoPath);
      const coverImage = await getDownloadUrlForFile(selectedSubtitle.coverImage);
      setContentScreen(
      <div className="content-container">
        <img src={coverImage} alt="Cover" className="cover-image" />
        <h1>{selectedSubtitle.title}</h1>
        <p>{selectedSubtitle.description}</p>
        {videoUrl && <VideoPlayer videoUrl={videoUrl} />}
      </div>
      );
    } else if (selectedSubtitle.type === 'quizz') {
      console.log(selectedSubtitle)
      setSign("")
      setContentScreen(
      <div className="quiz-container">
        <h1>{selectedSubtitle.title}</h1>
        <p>{selectedSubtitle.description}</p>
        {/* Agregar el cuestionario aquí */}
        <div className="question-container">
          <p>Pregunta:</p>
          <ul className="options-list">
            {selectedSubtitle.quizOptions && selectedSubtitle.quizOptions.map((option, index) => (
              <button className="quiz-option" onClick={() => setSign(option.isCorrect ? "¡Correcto!" : "Intenta nuevamente")} key={index}>
                {option.option}
              </button>
            ))}
          </ul>
        </div>
      </div>
      );
    }
  };

  return (
  <div className="App">
    <Menu subjects={subjects} onSubtitleClick={handleAdventureClick} activeSubtitle={selectedSubtitle} />
    <div className="adventure-details">
      {contentScreen}
      {sign === "" ? "" : sign}
      {/* Botón para avanzar al próximo subtitle */}
      <div className="subtitle-buttons-container">
        {!(selectedAdventureIndex === 0 && selectedSubtitleIndex === 0) && (
          <button className="previous-subtitle-button" onClick={handlePreviousSubtitleClick}>
            Anterior Subtitle
          </button>
        )}
        {!(selectedAdventureIndex === subjects.length - 1 && selectedSubtitleIndex === subjects[selectedAdventureIndex].subtitles.length - 1) && (
          <button className="next-subtitle-button" onClick={handleNextSubtitleClick}>
            Siguiente Subtitle
          </button>
        )}
      </div>
    </div>
  </div>
  );
}

export default App;

/*const subjects2 = [
  {
    title: 'Aventura 1',
    subtitles: [
      {
        title: 'Comenzando la aventura',
        type: 'class-video',
        description: 'Esta es una introducción a la aventura.',
        videoPath: 'videos/identidad/Identidad y genética del AVIVAMIENTO - Materia # 1 - Certificado en Ministerio - Lic. Mario Fleita (1).mp4',
        coverImage: 'covers/identidad/photo1675362372.jpeg',
        onClick: () => handleAdventureClick('Comenzando la aventura'),
      },
      {
        title: 'Continuando la aventura',
        type: 'module',
        description: 'Este es un módulo para aprender más.',
        pdfPath: 'modules/identity/file',
        coverImage: 'ruta/de/imagen2.jpg',
        onClick: () => handleAdventureClick('Continuando la aventura'),
      },
    ],
    onClick: () => handleAdventureClick('Aventura 1'),
  },
  {
    title: 'Aventura 2',
    subtitles: [
      {
        title: 'Lección 1',
        type: 'video',
        description: 'Una lección en video sobre un tema interesante.',
        videoPath: 'videos/identidad/Identidad y genética del AVIVAMIENTO - Materia # 1 - Certificado en Ministerio - Lic. Mario Fleita (1).mp4',
        coverImage: 'ruta/de/imagen3.jpg',
        onClick: () => handleAdventureClick('Lección 1'),
      },
      {
        title: 'Lección 2',
        type: 'quizz',
        description: 'Un cuestionario para poner a prueba tus conocimientos.',
        quizOptions: [
          { option: 'Opción 1', isCorrect: true },
          { option: 'Opción 2', isCorrect: false },
          { option: 'Opción 3', isCorrect: false },
        ],
        onClick: () => handleAdventureClick('Lección 2'),
      },
    ],
    onClick: () => handleAdventureClick('Aventura 2'),
  },
]; */