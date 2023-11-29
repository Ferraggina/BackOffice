import React, { useState } from "react";
import { Link } from "react-router-dom";

export function AdminPantallaInicio() {
  return (
    <div>
      <br />

      <div className="container mt-4 table-responsive esiloTablaAdViaje">
        <table className="table table-bordered  tablaContainer ">
          <thead>
            <tr>
              <th>
                <h2 className="text-center">
                  <Link to="/ImagenesLanding" className="decoracionTexto">
                    IMAGENES DE INICIO
                    <lord-icon
                      src="https://cdn.lordicon.com/dhbjyxqp.json"
                      trigger="hover"
                      style={{ width: "230px", height: "230px" }}
                    />
                  </Link>
                </h2>
              </th>
              <th>
                <h2 className="text-center">
                  <Link to="/textosLanding" className="decoracionTexto">
                    TEXTO DE INICIO
                    <lord-icon
                      src="https://cdn.lordicon.com/ncdtrewm.json"
                      trigger="hover"
                      style={{ width: "230px", height: "230px" }}
                    ></lord-icon>
                  </Link>
                </h2>
              </th>

              <th>
                <h2 className="text-center">
                  <Link to="/Contactos" className="decoracionTexto">
                    CONTACTOS
                    <lord-icon
                      src="https://cdn.lordicon.com/aycieyht.json"
                      trigger="hover"
                      style={{ width: "230px", height: "230px" }}
                    ></lord-icon>
                  </Link>
                </h2>
              </th>
              <th>
                <h2 className="text-center">
                  <Link to="/editUsuarios" className="decoracionTexto">
                    USUARIOS
                    <lord-icon
                      src="https://cdn.lordicon.com/bgebyztw.json"
                      trigger="hover"
                      style={{ width: "230px", height: "230px" }}
                    ></lord-icon>
                  </Link>
                </h2>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}
