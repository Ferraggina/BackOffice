import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../sass/_adminViaje.scss";
export function AdminPantallaInicio() {
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
                    <Link to="/ImagenesLanding" className="enlacesAdmin">
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
                    <Link to="/textosLanding" className="enlacesAdmin">
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
                    <Link to="/Contactos" className="enlacesAdmin">
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
                    <Link to="/editUsuarios" className="enlacesAdmin">
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
