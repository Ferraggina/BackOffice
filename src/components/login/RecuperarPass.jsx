import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { updatePassword } from "../../redux/actions/actions";

export function RecuperarPass() {
  const searchParams = new URLSearchParams(window.location.search);

  const token = searchParams.get("token");
  const idUsuario = searchParams.get("idUsuario");
  console.log("SOY IDUSER DE RECPASS", idUsuario, token);

  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("");
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  console.log(window.location.search);
  const handlePasswordReset = () => {
    if (!newPassword) {
      setUpdateError("Todos los campos son obligatorios.");
      return;
    }
    dispatch(updatePassword(token, idUsuario, newPassword))
      .then(() => {
        // Actualización de contraseña exitosa.
        setPasswordUpdated(true);
        setUpdateError(null);
        // console.log("soy lo que buscas", token, idUsuario);
      })
      .catch((error) => {
        // Manejo de errores de actualización de contraseña.
        setPasswordUpdated(false);
        setUpdateError(
          "Error al actualizar la contraseña. Inténtalo de nuevo."
        );
      });
  };

  return (
    <div className="container  container-fluid d-flex align-items-center justify-content-center vh-100">
      {passwordUpdated ? (
        <div className="alert alert-success">
          Contraseña actualizada con éxito.
        </div>
      ) : (
        <div>
          <br />
          <h2>Restablecer Contraseña</h2>
          {updateError && (
            <div className="alert alert-danger">{updateError}</div>
          )}
          <div className="form-group">
            <label>Nueva Contraseña:</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <br />
          <button onClick={handlePasswordReset} className="btn btn-primary">
            Restablecer Contraseña
          </button>
        </div>
      )}
    </div>
  );
}
