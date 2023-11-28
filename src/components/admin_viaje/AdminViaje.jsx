import React, { useState } from "react";

import "../../sass/_adminViaje.scss";
export function AdminViaje() {
  return (
    <div>
      <div className="container mt-4 table-responsive esiloTablaAdViaje">
        <table className="table table-bordered  tablaContainer ">
          <thead>
            <tr>
              <th>
                <h2 className="text-center">
                  <a className="enlacesAdmin" href="/ViajesEdicion">
                    VIAJES
                    <lord-icon
                      src="https://cdn.lordicon.com/rdfmytjv.json"
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
                  <a className="enlacesAdmin" href="/CrearItinerario/">
                    CREAR ITINERARIO
                    <lord-icon
                      src="https://cdn.lordicon.com/qvyppzqz.json"
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
                      src="https://cdn.lordicon.com/fzoffrbp.json"
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
                      src="https://cdn.lordicon.com/lenjvibx.json"
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
