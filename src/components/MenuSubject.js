import './FilesCss/menu.subject.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineArrowLeft, AiOutlineMenu } from 'react-icons/ai';
import { RiAccountCircleFill } from 'react-icons/ri';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: null,
      isOpen: true,
    };
    this.timeout = null; 
  }


  componentDidMount() {
    // Establecer el temporizador para cerrar el menú después de 5 segundos (5000 ms) de inactividad
    this.timeout = setTimeout(this.closeMenu, 5000);
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeSubtitle !== prevProps.activeSubtitle) {
      const { subjects, activeSubtitle } = this.props;
      
      // Buscar la aventura que contiene el subtítulo activo
      const activeAdventureIndex = subjects.findIndex(adventure =>
        adventure.subtitles && adventure.subtitles.includes(activeSubtitle)
      );
      
      // Abrir la aventura encontrada
      if (activeAdventureIndex !== -1) {
        this.setState({
          activeIndex: activeAdventureIndex,
          isOpen: true,
        });
      }
    }

    // Reiniciar el temporizador cuando cambie cualquier prop
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.closeMenu, 5000);
  }

  componentWillUnmount() {
    // Limpiar el temporizador antes de que el componente sea desmontado
    clearTimeout(this.timeout);
  }

  closeMenu = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleTitleClick = (index) => {
    const { subjects } = this.props;
    const clickedSubject = subjects[index]; 
    if (clickedSubject.subtitles && clickedSubject.subtitles.length > 0) {
      this.setState((prevState) => ({
        activeIndex: prevState.activeIndex === index ? null : index,
      }));
    } else if (clickedSubject.onClick) {
      clickedSubject.onClick();
    }
  };

  renderMenuItem(item, index) {
    const { activeIndex } = this.state;
    const isActive = activeIndex === index;
    const { isOpen } = this.state;

    return (
      <div className="menu-item" key={item.title}>
      <div
        className={`menu-title ${isActive ? 'active' : ''}`}
        onClick={() => this.handleTitleClick(index)}
      >
        {item.title}
      </div>
      {isActive && item.subtitles && item.subtitles.length > 0 && (
        <div className={`menu-subtitles ${isOpen ? 'open' : ''}`}>
          {item.subtitles.map((subtitle, subIndex) => (
            <div
              key={subIndex}
              className={`menu-subtitle ${this.props.activeSubtitle === subtitle ? 'active-subtitle' : ''}`}
            >
              <button
                className="subtitle-button"
                onClick={() => this.props.onSubtitleClick(subtitle)}
              >
                {subtitle.title}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    );
  }

  render() {
    const { subjects } = this.props;

    return (
      <div className={`menu-container ${this.state.isOpen ? 'open' : ''}`}> {/* Agregamos la clase 'open' si isOpen es true */}
        <div className={`menu-button ${this.state.isOpen ? 'open' : ''}`} onClick={() => this.setState({ isOpen: !this.state.isOpen })}>
          {this.state.isOpen ? <AiOutlineArrowLeft /> : <AiOutlineMenu />}
        </div>
        {this.state.isOpen ? 
        subjects.map((item, index) => (
          <div className='title-buttons' key={index}>{this.renderMenuItem(item, index)}</div>
        )) : ""}
        
      </div>
    );
  }
}

Menu.propTypes = {
  subjects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      subtitles: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          onClick: PropTypes.func.isRequired,
        })
      ),
      onClick: PropTypes.func,
    })
  ).isRequired,
  onSubtitleClick: PropTypes.func.isRequired,
  activeSubtitle: PropTypes.object, // Asegúrate de definir el propType correcto aquí
};

export default Menu;