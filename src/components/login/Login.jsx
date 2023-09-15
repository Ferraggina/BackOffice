import "../../app.scss";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/actions";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Valida los datos
    if (username === "") {
      setError("El nombre de usuario no puede estar vacío.");
      return;
    }

    if (password === "") {
      setError("La contraseña no puede estar vacía.");
      return;
    }

    // Envia la solicitud de login al backend
    // ...
    dispatch(login(username, password));

    // Verifica si el login es correcto

    if (!user) {
      setError("El login no es correcto.");
      return;
    }
    // Redirige al usuario a otra página
    if (user.password === password && user.usuario === username) {
      return navigate("/home");
    }
  };

  useEffect(() => {
    // Limpia el error cuando se cambia el nombre de usuario o la contraseña
    if (username !== "" || password !== "") {
      setError("");
    }
  }, [username, password]);

  return (
    <div className="container">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="input-log">
          <label htmlFor="">Email</label>
          <input
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="input-style"
            placeholder="Ingrese su email"
          />
        </div>
        <div className="input-log">
          <label htmlFor="">Contraseña</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="input-style"
            placeholder="Ingrese su contraseña"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="container-btn">
          <input type="submit" value="Ingresar" className="btn-style" />
        </div>
      </form>
    </div>
  );
}
