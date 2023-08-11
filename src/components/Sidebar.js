import { AiFillHome, AiFillBook, AiOutlineSearch, AiFillSetting } from 'react-icons/ai';
import { RiAccountCircleFill } from 'react-icons/ri';
import "./FilesCss/sidebar.css"

const Sidebar = ({ activeIcon }) => {
  return (
    <div className='sidebar'>
      <a className={activeIcon === 'home' ? 'span_side_2' : 'span_side_1'} href='/'>
        <AiFillHome />
      </a>
      <a className={activeIcon === 'book' ? 'span_side_2' : 'span_side_1'} href='/materias'>
        <AiFillBook />
      </a>
      <a className={activeIcon === 'search' ? 'span_side_2' : 'span_side_1'} href='/foro'>
        <AiOutlineSearch />
      </a>
      <a className={activeIcon === 'account' ? 'span_side_2' : 'span_side_1'} href='/cuenta'>
        <RiAccountCircleFill />
      </a>
      <a className={activeIcon === 'settings' ? 'span_side_2' : 'span_side_1'} href='/configuracion'>
        <AiFillSetting />
      </a>
    </div>
  );
};

export default Sidebar;