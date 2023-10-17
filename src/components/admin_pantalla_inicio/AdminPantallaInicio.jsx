import React, { useState } from "react";

import FormularioHoteles from "../admin_viaje/FormularioHoteles";
import FormularioViaje from "../admin_viaje/FormularioViaje";
import Itinerario from "../admin_viaje/Itinerario";
import Abm_Viaje from "../admin_viaje/Abm_Viaje";
import AbmHotel from "../admin_viaje/AbmHotel";
import AbmImagenesLandin from "./AbmImagenesLandin";

export function AdminPantallaInicio() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  return (
    <div>
      <br />
      <div className="text-center">
        <lord-icon
          src="https://cdn.lordicon.com/xirobkro.json"
          trigger="hover"
          style={{
            width: "250px",
            height: "250px",
            cursor: "pointer", // Cambia el cursor al pasar el mouse
          }}
          onClick={toggleFormulario} // Agrega el evento onClick para mostrar/ocultar el formulario
        ></lord-icon>
        <div>
          <h3 className="tituloAdmLanding">Administracion de Landing</h3>
        </div>
      </div>

      {mostrarFormulario && (
        <div className="container mt-4 table-responsive esiloTablaAdViaje">
          <table className="table table-bordered  tablaContainer ">
            <thead>
              <tr>
                <th>
                  <h2 className="text-center">
                    <a href="/ImagenesLanding">Imagenes de landing</a>
                  </h2>
                </th>
                <th>
                  <h2 className="text-center tipoLetraViaje">
                    <a href="/FormularioViaje/">CREAR VIAJE</a>
                  </h2>
                </th>
                <th>
                  <h2 className="text-center">
                    {" "}
                    <a href="/CrearItinerario/">CREAR ITINERARIO</a>
                  </h2>
                </th>
                <th>
                  <h2 className="text-center">
                    <a href="/AgregarHoteles">AGREGAR HOTEL</a>
                  </h2>
                </th>
                <th>
                  <h2 className="text-center">
                    <a href="/ListadoHoteles">LISTADO HOTELES</a>
                  </h2>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>
                    <AbmImagenesLandin />
                  </div>
                </td>
                <td>
                  <div>
                    <FormularioViaje />
                  </div>
                </td>
                <td>
                  <div>
                    <Itinerario />
                  </div>
                </td>
                <td>
                  <div>
                    <FormularioHoteles />
                  </div>
                </td>
                <td>
                  <div>
                    <AbmHotel />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
