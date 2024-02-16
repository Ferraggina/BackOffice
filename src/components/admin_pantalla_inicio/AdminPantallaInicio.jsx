import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../sass/_adminViaje.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  markAllMessagesAsRead,
  addNewContact,
} from "../../redux/actions/actions";
export function AdminPantallaInicio() {
  const dispatch = useDispatch();
  const [newMessagesCount, setNewMessagesCount] = useState(0);
  const nuevosContactos = useSelector((state) => state.nuevosContactos);
  const landingDataForm = useSelector((state) => state.landingDataForm);
  const unreadMessagesCount = landingDataForm.filter(
    (contacto) => !contacto.leido
  ).length;
  // useEffect(() => {
  //   // dispatch(getLandingForm());
  //   const unreadMessages = landingDataForm.filter(
  //     (contact) => contact.leido === false
  //   );
  //   console.log("UNREADmESSAGGES", unreadMessages);
  //   setNewMessagesCount(unreadMessages.length);
  // }, [dispatch]);
  // useEffect(() => {
  //   // Cuando llega un nuevo mensaje, despacha la acción para agregarlo al estado global de Redux
  //   if (nuevoMensaje) {
  //     dispatch(addNewContact(nuevoMensaje));
  //   }
  // }, [nuevoMensaje, dispatch]);
  const handleContactosClick = () => {
    dispatch(markAllMessagesAsRead()); // Esta acción debería marcar todos los mensajes como leídos

    // Establecer el contador de nuevos mensajes en 0
  };
  useEffect(() => {
    // Actualizar el contador de notificaciones cuando llegue un nuevo contacto
    if (nuevosContactos.length > 0) {
      setNewMessagesCount((prevCount) => prevCount + 1);
    }
  }, [nuevosContactos]);
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
                    <Link
                      to="/gestion/Contactos"
                      className="enlacesAdmin"
                      onClick={handleContactosClick}
                    >
                      CONTACTOS
                      <span className="notificacion">
                        {unreadMessagesCount}
                      </span>
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
