// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHWru9Uze-5bDDT7n6Pr4bmr7vGIFqbpY",
  authDomain: "tecno-museo.firebaseapp.com",
  projectId: "tecno-museo",
  storageBucket: "tecno-museo.appspot.com",
  messagingSenderId: "967723366637",
  appId: "1:967723366637:web:519c7c98ae3825acbf74e4"
};
// Obtener una referencia al servicio de almacenamiento


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

function uploadFile(file, path = ""){ 
  const storageRef =  ref(storage, path)
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log(snapshot);
  });
}

// Función para obtener la URL de descarga de un archivo
const getDownloadUrlForFile = async (filePath) => {
  const fileRef = ref(storage, filePath);

  try {
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.error('Error al obtener la URL de descarga:', error);
    return null;
  }
};
export { app, auth, storage, uploadFile, getDownloadUrlForFile };