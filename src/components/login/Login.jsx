import "../login/login.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/actions";
import validator from "validator";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const validateUsername = (value) => {
    if (!validator.isNumeric(value)) {
      setError("El DNI debe contener solo números.");
      return false;
    }

    if (value.length !== 8) {
      setError("El DNI debe contener 8 dígitos.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateUsername(username)) {
      return;
    }

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

    dispatch(login(username, password))
      .then((res) => {
        // Redirige al usuario a la página de inicio si el inicio de sesión es exitoso
        if (res.payload.status === 200) {
          // No es necesario verificar el estado del usuario aquí
          navigate("/home");

          window.location.reload();
        } else {
          <Navigate to="/AccesoDenegado" />;
        }
      })
      .catch((error) => {
        // Manejo de errores para el inicio de sesión
        alert("Error, datos Incorrectos");
        console.error("Error, datos Incorrectos", error);
      });
  };

  useEffect(() => {
    // Limpia el error cuando se cambia el nombre de usuario o la contraseña
    if (username !== "" || password !== "") {
      setError("");
    }
  }, [username, password]);

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100 ">
      <form
        className="form-container  col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mx-auto my-5 containerColorLogin"
        onSubmit={handleSubmit}
      >
        <div className="input-log">
          <label htmlFor="">Usuario</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className={`input-style form-control ${
              error ? "is-invalid" : "El formato permitido es DNI"
            } texDecoinputlog`}
            placeholder="Ingrese su Usuario (DNI)"
          />
        </div>
        <div className="input-log">
          <label htmlFor="">Contraseña</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="input-style form-control"
            placeholder="Ingrese su contraseña"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <br />
        <div className="container-btn">
          <input
            type="submit"
            value="Ingresar"
            className="btn btn-outline-warning "
          />
          <button
            onClick={() => navigate("/ForgotPass")}
            className="btn-style btn btn-secondary"
            style={{ marginLeft: "10px" }}
          >
            Olvidé mi contraseña
          </button>
        </div>
        <br />
      </form>
    </div>
  );
}
