import { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./FilesCss/materias.css"
import { getDownloadUrlForFile } from "../firebase";

export default function App() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(
          `https://tecno-museo-default-rtdb.firebaseio.com/seminary/back-data/${user.uid}.json?auth=${user.accessToken}`
        );
        const data = await response.json();
        
        if (data.user) {
          try {
            const coursesResponse = await fetch(
              `https://tecno-museo-default-rtdb.firebaseio.com/seminary/access/${data.user}.json?auth=${user.accessToken}`
            );
            const coursesData = await coursesResponse.json();
            setCourses(coursesData.courses);
          } catch (coursesError) {
            console.error('Error fetching user courses:', coursesError);
          }
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    // Llamar a la función para obtener los cursos
    fetchCourses();
  }, [user]);

  useEffect(() => {
    async function fetchCourseImages() {
      const coursesWithImages = await Promise.all(
        courses.map(async (course) => {
          const imageUrl = await getDownloadUrlForFile(course.link);
          return { ...course, imageUrl };
        })
      );
      setCourses(coursesWithImages);
    }

    // Llamar a la función para cargar imágenes de cursos
    fetchCourseImages();
  }, [courses]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="whitebox">
      <div className="whitebox">
        <h2>Mis Cursos</h2>
        <div className="bigbox">
          <ul className="courses-list">
            {courses.map((course) => (
              <li key={course.id}>
                <a href={`/${course.key}`} className="course-box">
                  <img className="course-img" src={course.imageUrl} alt="Course Cover" />
                  <h2 className="course-title">{course.title}</h2>
                  <p className="course-description">{course.description}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}