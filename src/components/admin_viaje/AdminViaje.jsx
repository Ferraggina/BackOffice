import React, { useState } from "react";
import FormularioViaje from "./FormularioViaje";
import "./formularioViaje.scss";
import Itinerario from "./Itinerario";
import Abm_Viaje from "./Abm_Viaje";
import FormularioHoteles from "./FormularioHoteles";
import AbmHotel from "./AbmHotel";

export function AdminViaje() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  return (
    <div>
      <button onClick={toggleFormulario} className="btn btn-primary">
        {mostrarFormulario
          ? "Cerrar Formulario"
          : "Desplegar administración de viajes"}
      </button>
      {mostrarFormulario && (
        <div className="container mt-4 table-responsive esiloTablaAdViaje">
          <table className="table table-bordered  tablaContainer ">
            <thead>
              <tr>
                <th>
                  <h2 className="text-center">
                    <a href="/ViajesEdicion">VIAJES</a>
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
                    <Abm_Viaje />
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
