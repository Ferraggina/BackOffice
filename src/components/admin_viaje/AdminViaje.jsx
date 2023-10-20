import React, { useState } from "react";
import FormularioViaje from "./FormularioViaje";
// import "./formularioViaje.scss";
import Itinerario from "./Itinerario";
import Abm_Viaje from "./Abm_Viaje";
import FormularioHoteles from "./FormularioHoteles";
import AbmHotel from "./AbmHotel";
import "../../sass/_adminViaje.scss";
export function AdminViaje() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  return (
    <div>
      {/* <button onClick={toggleFormulario} className="btn btn-primary">
        {mostrarFormulario
          ? "Cerrar Formulario"
          : "Desplegar administración de viajes"}
      </button> */}
      {/* <div className="text-center contenedorIconoViaje">
       
        <div className="icon-container">
          <lord-icon
            src="https://cdn.lordicon.com/clvhcjvo.json"
            trigger="hover"
            style={{
              width: "250px",
              height: "250px",
              cursor: "pointer", // Cambia el cursor al pasar el mouse
            }}
            onClick={toggleFormulario} // Agrega el evento onClick para mostrar/ocultar el formulario
          ></lord-icon>
          <h3 className="tituloViajeAdm">Viajes</h3>
        </div>
      </div> */}

      <div className="container mt-4 table-responsive esiloTablaAdViaje">
        <h2 className="text-center">Administracion de viajes</h2>
        <table className="table table-bordered  tablaContainer ">
          <thead>
            <tr>
              <th>
                <h2 className="text-center">
                  <a className="enlacesAdmin" href="/ViajesEdicion">
                    VIAJES
                    <lord-icon
                      src="https://cdn.lordicon.com/pwgndsvz.json"
                      trigger="hover"
                      style={{
                        width: "250px",
                        height: "250px",
                        cursor: "pointer",
                      }}
                    ></lord-icon>
                  </a>
                </h2>
              </th>
              {/* <th>
                <h2 className="text-center tipoLetraViaje">
                  <a className="enlacesAdmin" href="/FormularioViaje/">
                    CREAR VIAJE
                    <lord-icon
                      src="https://cdn.lordicon.com/vczdmdkt.json"
                      trigger="hover"
                      style={{
                        width: "250px",
                        height: "250px",
                        cursor: "pointer",
                      }}
                    ></lord-icon>
                  </a>
                </h2>
              </th> */}
              <th>
                <h2 className="text-center">
                  <a className="enlacesAdmin" href="/CrearItinerario/">
                    CREAR ITINERARIO
                    <lord-icon
                      src="https://cdn.lordicon.com/inlmkmqf.json"
                      trigger="hover"
                      style={{
                        width: "250px",
                        height: "250px",
                        cursor: "pointer",
                      }}
                    ></lord-icon>
                  </a>
                </h2>
              </th>
              <th>
                <h2 className="text-center">
                  <a className="enlacesAdmin" href="/AgregarHoteles">
                    AGREGAR HOTEL
                    <lord-icon
                      src="https://cdn.lordicon.com/tsnmmdby.json"
                      trigger="hover"
                      style={{
                        width: "250px",
                        height: "250px",
                        cursor: "pointer",
                      }}
                    ></lord-icon>
                  </a>
                </h2>
              </th>
              <th>
                <h2 className="text-center">
                  <a className="enlacesAdmin" href="/ListadoHoteles">
                    LISTADO HOTELES
                    <lord-icon
                      src="https://cdn.lordicon.com/xqukarvl.json"
                      trigger="hover"
                      style={{
                        width: "250px",
                        height: "250px",
                        cursor: "pointer",
                      }}
                    ></lord-icon>
                  </a>
                </h2>
              </th>
            </tr>
          </thead>
        </table>
      </div>

      <br />
    </div>
  );
}
