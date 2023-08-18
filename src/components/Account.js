import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { getDownloadUrlForFile, uploadFile } from '../firebase'; // Asegúrate de importar correctamente esta función
import './FilesCss/account.css'; // Importa tu archivo CSS

export default function ProfilePage() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfileData, setEditedProfileData] = useState({});
  const [previewImageUrl, setPreviewImageUrl] = useState(null);

  useEffect(() => {
    // Obtener los datos del perfil desde la API
    async function fetchProfileData() {
      try {
        const response = await fetch(`https://tecno-museo-default-rtdb.firebaseio.com/seminary/back-data/${user.uid}.json?auth=${user.accessToken}`);
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }

    fetchProfileData();
  }, [user.uid, user.accessToken]);

  useEffect(() => {
    // Obtener los datos del perfil desde la API
    async function fetchProfileData() {
      try {
        const response = await fetch(`https://tecno-museo-default-rtdb.firebaseio.com/seminary/back-data/${user.uid}.json?auth=${user.accessToken}`);
        const data = await response.json();
        setProfileData(data);
        setEditedProfileData(data); // Inicializar los datos editados con los datos actuales
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }

    fetchProfileData();
  }, [user.uid, user.accessToken]);

  useEffect(() => {
    // Obtener la URL de descarga de la imagen de perfil desde el almacenamiento
    async function fetchProfileImageUrl() {
      if (profileData && profileData.profile && typeof profileData.profile === 'string') {
        const imageUrl = await getDownloadUrlForFile(profileData.profile);
        setProfileImageUrl(imageUrl);
      } else {
        const imageUrl = await getDownloadUrlForFile('/profile/generic.jpg');
        setProfileImageUrl(imageUrl);
      }
    }

    fetchProfileImageUrl();
  }, [profileData]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!profileData || profileImageUrl === null) {
    return <div className='loading'>Cargando perfil...</div>;
  }

  const handleEdit = () => {
    setIsEditing(true);
    console.log(isEditing)
  };

  const handleSave = async () => {
    try {
      // Hacer una solicitud para guardar los datos editados en la base de datos
      const response = await fetch(`https://tecno-museo-default-rtdb.firebaseio.com/seminary/back-data/${user.uid}.json?auth=${user.accessToken}`, {
        method: 'PATCH', // Puedes usar PATCH para actualizar solo los campos modificados
        body: JSON.stringify(editedProfileData),
      });

      if (response.ok) {
        setProfileData(editedProfileData); // Actualizar los datos principales con los datos editados
        setIsEditing(false);
      } else {
        console.error('Error saving profile data:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };

  const handleFieldChange = (field, value) => {
    setEditedProfileData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setEditedProfileData((prevData) => ({
      ...prevData,
      profile: `/profile/${user.uid}`,
    }));
    const reader = new FileReader();

    reader.onload = (event) => {
      setPreviewImageUrl(event.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreviewImageUrl(null);
    }
    try {
      const downloadUrl = await uploadFile(file, `/profile/${user.uid}`);
      console.log('se envia');
      setProfileImageUrl(downloadUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
      // Manejar el error de carga aquí, por ejemplo, mostrar un mensaje al usuario
    }
  };

  return (
    <div className='profile-page'>
      <div className='profile-container'>
        <h3 className='centered-text'>Mi cuenta</h3>
        <div className='profile-info'>
          <div className='profile-image-container centered'>
            <img src={profileImageUrl} alt='Profile' className='profile-image' />
            {isEditing ? (
              <div className='file-input-container'>
                <input type='file' onChange={handleFileChange} accept='image/*' />
                {previewImageUrl && (
                  <img src={previewImageUrl} alt='Preview' className='preview-image' />
                )}
              </div>
            ) : null}
          </div>
          <div className='user-details'>
            <h4 className='email'>{profileData.email}</h4>
            <p className='full-name'>
              {isEditing ? (
                <input
                  type='text'
                  value={editedProfileData.full_name}
                  onChange={e => handleFieldChange('full_name', e.target.value)}
                />
              ) : (
                profileData.full_name
              )}
            </p>
            <p className='birth-date'>
              {isEditing ? (
                <input
                  type='text'
                  value={editedProfileData['birth-date']}
                  onChange={e => handleFieldChange('birth-date', e.target.value)}
                />
              ) : (
                profileData['birth-date']
              )}
            </p>
            <p className='user'>
              <span className='at-symbol'>@</span>
              {profileData['user']}
            </p>
            {isEditing ? (
              <div className='button-container'>
                <button className='save-button' onClick={handleSave}>
                  Guardar
                </button>
                <button className='cancel-button' onClick={() => setIsEditing(false)}>
                  Cancelar
                </button>
              </div>
            ) : (
              <div className='button-container'>
                <button className='edit-button' onClick={handleEdit}>
                  Editar
                </button>
                {profileData.admin && (
                  <a href='/admin' className='admin-button'>
                    PANEL DE ADMINISTRADOR
                  </a>
                )}
              </div>
            )}
            <button className='logout-button' onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}