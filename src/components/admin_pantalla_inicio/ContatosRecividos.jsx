import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLandingForm } from "../../redux/actions/actions"; // Asegúrate de importar la acción adecuada
import "../../sass/_abm_Viaje.scss";

export default function ContactosRecibidos() {
  const dispatch = useDispatch();
  const landingDataForm = useSelector((state) => state.landingDataForm);

  useEffect(() => {
    dispatch(getLandingForm());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <br />
      <br />
      <h2 className="text-center encabezadoLista">Contactos Recibidos</h2>
      <ul className="list-unstyled">
        {landingDataForm.map((contact) => (
          <li key={contact.id} className="card mb-4 cardContactos">
            <div className="card-body">
              <h5>Nombre: {contact.nombre}</h5>
              <p>Correo Electrónico: {contact.mail}</p>
              <p>Teléfono: {contact.telefono}</p>
              <p>Comentario: {contact.comentario}</p>
              <p>Horario de Contacto: {contact.horario}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
