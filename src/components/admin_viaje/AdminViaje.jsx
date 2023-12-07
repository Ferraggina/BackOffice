import React, { useState } from "react";

import "../../sass/_adminViaje.scss";
import { Link } from "react-router-dom";
export function AdminViaje() {
  return (
    <div>
      <br />
      <br />
      <div className="container mt-4 table-responsive ">
        <table className="table   tablaTransparente ">
          <thead>
            <tr>
              <th>
                <div className="bordeBotonHome">
                  <h2 className="text-center">
                    <Link className="enlacesAdmin" to="/ViajesEdicion">
                      VIAJES
                      <lord-icon
                        src="https://cdn.lordicon.com/rdfmytjv.json"
                        trigger="hover"
                        colors="primary:#ffffff,secondary:#1b1091"
                        style={{
                          width: "120px",
                          height: "120px",
                          cursor: "pointer",
                        }}
                      ></lord-icon>
                    </Link>
                  </h2>
                </div>
              </th>

              <th>
                <div className="bordeBotonHome">
                  <h2 className="text-center ">
                    <Link className="enlacesAdmin" to="/CrearItinerario/">
                      CREAR ITINERARIO
                      <lord-icon
                        src="https://cdn.lordicon.com/qvyppzqz.json"
                        trigger="hover"
                        colors="primary:#ffffff,secondary:#1b1091"
                        style={{
                          width: "120px",
                          height: "120px",
                          cursor: "pointer",
                        }}
                      ></lord-icon>
                    </Link>
                  </h2>
                </div>
              </th>
              <th>
                <div className="bordeBotonHome">
                  <h2 className="text-center">
                    <Link className="enlacesAdmin" to="/AgregarHoteles">
                      AGREGAR HOTEL
                      <lord-icon
                        src="https://cdn.lordicon.com/fzoffrbp.json"
                        trigger="hover"
                        colors="primary:#ffffff,secondary:#1b1091"
                        style={{
                          width: "120px",
                          height: "120px",
                          cursor: "pointer",
                        }}
                      ></lord-icon>
                    </Link>
                  </h2>
                </div>
              </th>
              <th>
                <div className="bordeBotonHome">
                  <h2 className="text-center">
                    <Link className="enlacesAdmin" to="/ListadoHoteles">
                      LISTADO HOTELES
                      <lord-icon
                        src="https://cdn.lordicon.com/lenjvibx.json"
                        trigger="hover"
                        colors="primary:#ffffff,secondary:#1b1091"
                        style={{
                          width: "120px",
                          height: "120px",
                          cursor: "pointer",
                        }}
                      ></lord-icon>
                    </Link>
                  </h2>
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>

      <br />
    </div>
  );
}
