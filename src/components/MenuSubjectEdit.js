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
      activeSubIndex: null, 
      isOpen: true,
    };
    this.timeout = null; 
    this.inputRef = React.createRef();
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
    const { activeIndex } = this.state;
    if (activeIndex === index) {
      this.inputRef.current.blur(); // Quitar el enfoque del input si ya está activo
    }
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
          {/* Renderizar un input editable si el ítem está activo */}
          {isActive ? (
            <input
              type="text"
              value={item.title}
              ref={this.inputRef}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                const newTitle = e.target.value;
                this.props.subjects[index].title = newTitle;
                this.forceUpdate();
              }}
              onBlur={() => {
                this.setState({ activeIndex: null });
              }}
            />
          ) : (
            item.title
          )}
        </div>
        {isActive && item.subtitles && item.subtitles.length > 0 && (
          <div className={`menu-subtitles ${isOpen ? 'open' : ''}`}>
            {item.subtitles.map((subtitle, subIndex) => (
              <div
                key={subIndex}
                className={`menu-subtitle ${this.props.activeSubtitle === subtitle ? 'active-subtitle' : ''}`}
              >
                {/* Renderizar un input editable para el subtítulo si está activo */}
                {this.renderSubtitleItem(subtitle, subIndex, index)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  renderSubtitleItem(subtitle, subIndex, adventureIndex) {
    const isActive = this.state.activeIndex === adventureIndex && this.state.activeSubIndex === subIndex;
    const { isOpen } = this.state;

    return (
      <div
        key={subIndex}
        className={`subtitle-item ${isActive ? 'active' : ''}`}
        onClick={() => this.handleSubtitleClick(adventureIndex, subIndex)}
      >
        {isActive ? (
          <input
            type="text"
            value={subtitle.title}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              const newTitle = e.target.value;
              this.props.subjects[adventureIndex].subtitles[subIndex].title = newTitle;
              this.forceUpdate();
            }}
            onBlur={() => {
              this.setState({ activeSubIndex: null });
            }}
          />
        ) : (
          <button className="subtitle-button">
            {subtitle.title}
          </button>
        )}
      </div>
    );
  }

  handleSubtitleClick(adventureIndex, subIndex) {
    this.setState({
      activeIndex: adventureIndex,
      activeSubIndex: subIndex,
    });
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
          <div key={index}>{this.renderMenuItem(item, index)}</div>
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