import { useState } from "react";
import "./styles.css";

function Login({ onLogin }){

    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();

    const correctPassword = "Recit@l2025";

    if(password === correctPassword){
        onLogin();
    } else {
        setError("Contraseña incorrecta.")
    }
};

return (
    <div className="login-page">
        <div className="login-container">
            <h2>Acceso</h2>

            <form onSubmit={handleSubmit}>
                <input
                type="password"
                placeholder="Ingresa contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                ></input>

                <button type="submit" className="login-button">Entrar</button>
                {error && <div className="message error">{error}</div>}
            </form>
        </div>
    </div>
);
}

export default Login;