import React from 'react';
import './FilesCss/Admin.css';

export default function Sidebar() {
  return (
    <div>
    <div className='admin-content'>
      <h2 className='admin-title'>Acceso para administradores</h2>
      <a className='admin-link' href='/admin/users'>
        <button className='admin-button'>Lista de usuarios</button>
      </a>
      <a className='admin-link' href='/admin/subject'>
        <button className='admin-button'>Crear/Editar Materia</button>
      </a>
      <a className='admin-link' href='/admin/notifications'>
        <button className='admin-button'>Manejar notificaciones</button>
      </a>
      <a className='admin-link' href='/admin/files'>
        <button className='admin-button'>Manejar archivos</button>
      </a>
    </div>
    </div>
  );
}