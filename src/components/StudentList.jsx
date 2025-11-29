import { useEffect, useState } from "react";
import { fetchStudents, deleteStudent } from "../services/api";
import "./styles.css";

function StudentList({ refresh }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (err) {
        console.error(err);
        setError("Error loading students");
      }
      setLoading(false);
    }

    load();
  }, [refresh]);

  if (loading) return <p className="loading">Cargando alumnos...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="student-list-container">
      <h2>Lista de Alumnos Registrados</h2>

      {students.length === 0 ? (
        <p className="no-students">No hay alumnos registrados todavía.</p>
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Instrumento</th>
              <th>Pieza</th>
              <th>Eliminar</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s, index) => (
              <tr key={index}>
                <td>{s.nombre}</td>
                <td>{s.instrumento}</td>
                <td>{s.pieza}</td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={async () => {
                         // 1. Ask admin password
                        const adminPassword = prompt("Introduce la contraseña de administrador");

                        if(!adminPassword) return alert("Eliminación Cancelada");
                        if(adminPassword !== "RecitalMus-025") {
                            return alert("❌ Contraseña incorrecta. No tienes permiso para eliminar.");
                        }
                          // 2. Confirm deletion 

                        if(!confirm(`¿Eliminar a ${s.nombre}?`)) return

                         // 3. Delete Student

                         const result = await deleteStudent(s.nombre);

                        if (result.success) {
                            alert("Alumno eliminado correctamente.")
                          // reload the list
                          refresh();
                        } else {
                          alert("Error al eliminar el registro.");
                        }
                      
                    }}
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentList;
