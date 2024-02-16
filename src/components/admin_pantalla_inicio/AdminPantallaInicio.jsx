import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../sass/_adminViaje.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  markAllMessagesAsRead,
  getLandingForm,
} from "../../redux/actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
export function AdminPantallaInicio() {
  const dispatch = useDispatch();
  const [newMessagesCount, setNewMessagesCount] = useState(false);

  const landingDataForm = useSelector((state) => state.landingDataForm);
  const unreadMessagesCount = landingDataForm.filter(
    (contacto) => !contacto.leido
  ).length;
  useEffect(() => {
    dispatch(getLandingForm());
    console.log("mensajes", newMessagesCount);
  }, [newMessagesCount]);
  const handleContactosClick = () => {
    dispatch(markAllMessagesAsRead()); // Esta acción debería marcar todos los mensajes como leídos

    // Establecer el contador de nuevos mensajes en 0
    setNewMessagesCount(true);
  };

  return (
    <div>
      <br />

      <div className="container mt-4 table-responsive ">
        <table className="table   tablaTransparente">
          <thead>
            <tr>
              <th>
                <div className="bordeBotonHome">
                  <h2 className="text-center">
                    <Link
                      to="/gestion/ImagenesLanding"
                      className="enlacesAdmin"
                    >
                      IMAGENES DE INICIO
                      <lord-icon
                        src="https://cdn.lordicon.com/dhbjyxqp.json"
                        trigger="hover"
                        style={{ width: "120px", height: "120px" }}
                        colors="primary:#ffffff,secondary:#1b1091"
                      />
                    </Link>
                  </h2>
                </div>
              </th>
              <th>
                <div className="bordeBotonHome">
                  <h2 className="text-center">
                    <Link
                      to="/gestion/promocionLanding"
                      className="enlacesAdmin"
                    >
                      TEXTO DE INICIO
                      <lord-icon
                        src="https://cdn.lordicon.com/ncdtrewm.json"
                        trigger="hover"
                        style={{ width: "120px", height: "120px" }}
                        colors="primary:#ffffff,secondary:#1b1091"
                      ></lord-icon>
                    </Link>
                  </h2>
                </div>
              </th>

              <th>
                <div className="bordeBotonHome">
                  <h2 className="text-center">
                    {/* <span className="notificacion">
                      <FontAwesomeIcon icon={faBell} />
                      
                      {unreadMessagesCount}
                    </span> */}
                    {unreadMessagesCount !== 0 && (
                      <span className="notificacion">
                        <FontAwesomeIcon icon={faBell} />
                        {unreadMessagesCount}
                      </span>
                    )}

                    <Link
                      to="/gestion/Contactos"
                      className="enlacesAdmin"
                      onClick={handleContactosClick}
                    >
                      CONTACTOS
                      <lord-icon
                        src="https://cdn.lordicon.com/aycieyht.json"
                        trigger="hover"
                        style={{ width: "120px", height: "120px" }}
                        colors="primary:#ffffff,secondary:#1b1091"
                      ></lord-icon>
                    </Link>
                  </h2>
                </div>
              </th>
              <th>
                <div className="bordeBotonHome">
                  <h2 className="text-center">
                    <Link to="/gestion/editUsuarios" className="enlacesAdmin">
                      USUARIOS
                      <lord-icon
                        src="https://cdn.lordicon.com/bgebyztw.json"
                        trigger="hover"
                        style={{ width: "120px", height: "120px" }}
                        colors="primary:#ffffff,secondary:#1b1091"
                      ></lord-icon>
                    </Link>
                  </h2>
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}
