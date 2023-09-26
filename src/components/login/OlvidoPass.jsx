import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import "../login/login.scss";
export function OlvidoPass() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector((state) => state.isLoading);
  const success = useSelector((state) => state.success);
  const error = useSelector((state) => state.error);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPassword(username)).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="container container-fluid d-flex align-items-center justify-content-center vh-100">
      <form
        onSubmit={handleSubmit}
        className="form-container containerColorOlvidoPass"
      >
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Por favor, ingrese su Usuario
          </label>
          <input
            type="text"
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            placeholder="Ingrese su Usuario"
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </div>

        {isLoading && <div>Cargando...</div>}
        {success && (
          <div className="alert alert-success" role="alert">
            Por favor, revise su correo electrónico. Le enviamos un enlace para
            restablecer su contraseña.
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            Error: {error}
          </div>
        )}
        <button onClick={() => navigate("/")} className="btn btn-link">
          Volver al inicio
        </button>
      </form>
    </div>
  );
}

export default OlvidoPass;
