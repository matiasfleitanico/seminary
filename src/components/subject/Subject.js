import "../FilesCss/subject.css";
import React, { useState, useEffect } from 'react';
import Menu from '../MenuSubject';
import VideoPlayer from "../VideoPlayer";
import { getDownloadUrlForFile } from "../../firebase";
import { useAuth } from '../../context/authContext';
import PropTypes from 'prop-types';

function App({ pathname }) {
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
        const response = await fetch(`https://tecno-museo-default-rtdb.firebaseio.com/seminary/subjects/${pathname}.json`);
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
  }, [pathname]);


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
          {selectedSubtitle.complement && selectedSubtitle.complement !== "" && (
            <a href={selectedSubtitle.complement} className="complementary-link">
              <h3 className="complementary-title">Lectura complementaria</h3>
            </a>
          )}
        </div>
      );
    } else if (selectedSubtitle.type === 'class-video') {
      const videoUrl = await getDownloadUrlForFile(selectedSubtitle.videoPath);
      const coverImage = await getDownloadUrlForFile(selectedSubtitle.coverImage);
      const descriptionWithLineBreaks = selectedSubtitle.description.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));
      setContentScreen(
      <div className="content-container">
        <img src={coverImage} alt="Cover" className="cover-image" />
        <h1>{selectedSubtitle.title}</h1>
        <div className="text-center">{descriptionWithLineBreaks}</div>
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
          <ul className="options-list">
            {selectedSubtitle.quizOptions && selectedSubtitle.quizOptions.map((option, index) => (
              <button className="quiz-option" onClick={() => setSign(option.isCorrect ? "¡Correcto! Sigue así" : "Intenta nuevamente")} key={index}>
                {option.option}
              </button>
            ))}
          </ul>
        </div>
      </div>
      );
    } else if (selectedSubtitle.type === 'form') {
      setSign("")
      const descriptionWithLineBreaks = selectedSubtitle.description.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));
      setContentScreen(
      <div className="quiz-container">
        <h1>{selectedSubtitle.title}</h1>
        <div className="text-center">{descriptionWithLineBreaks}</div>
        <div className="question-container">
          <iframe
          src={selectedSubtitle.formLink}
          width="340"
            height="1376"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
          />
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
            Anterior 
          </button>
        )}
        {!(selectedAdventureIndex === subjects.length - 1 && selectedSubtitleIndex === subjects[selectedAdventureIndex].subtitles.length - 1) && (
          <button className="next-subtitle-button" onClick={handleNextSubtitleClick}>
            Siguiente 
          </button>
        )}
      </div>
    </div>
  </div>
  );
}

App.propTypes = {
    pathname: PropTypes.string.isRequired, // Definir propType para 'pathname'
  };

export default App;