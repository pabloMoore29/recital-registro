import { useState } from "react";
import { checkDuplicate, submitRegistration } from "../services/api";
import "./styles.css";

function RegistrationForm({onRegisterSuccess}) {
  const [form, setForm] = useState({
    tiempo: "",
    nombre: "",
    instrumento: "",
    pieza: "",
    compositor: "",
    maestro: "",
    notas: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      tiempo: "",
      nombre: "",
      instrumento: "",
      pieza: "",
      compositor: "",
      maestro: "",
      notas: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const exists = await checkDuplicate(form.nombre.trim());

      if (exists) {
        setMessage("❌ Este alumno ya está registrado.");
        setMessageType("error");
        setLoading(false);
        return;
      }

      const result = await submitRegistration(form);

      if (result.success) {
        setMessage("✅ ¡Registro exitoso!");
        setMessageType("success");
        resetForm();

        if(onRegisterSuccess){
            onRegisterSuccess();
        }
      } else {
        setMessage("⚠️ Ocurrió un error al registrar.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("❌ Error de conexión. Revisa tu internet o la API.");
      setMessageType("error");
    }
    setLoading(false);
  };

  return (
    <div className="form-wrapper">
      <div className="registration-form-container">
        <h2>Registro de Recital</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Tiempo</label>
            <input name="tiempo" value={form.tiempo} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Nombre del alumno</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre completo del Alumno"required />
          </div>
          <div className="form-field">
            <label>Instrumento</label>
            <input name="instrumento" value={form.instrumento} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Nombre de la pieza</label>
            <input name="pieza" value={form.pieza} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Compositor</label>
            <input name="compositor" value={form.compositor} onChange={handleChange} required/>
          </div>
          <div className="form-field">
            <label>Maestro</label>
            <input name="maestro" value={form.maestro} onChange={handleChange} required/>
          </div>
          <div className="form-field">
            <label>Notas</label>
            <textarea name="notas" value={form.notas} onChange={handleChange} rows={3} />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar Registro"}
          </button>
          {message && <div className={`message ${messageType}`}>{message}</div>}
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;

