import React, { useState } from "react";

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
                  <a href="/ImagenesLanding" className="decoracionTexto">
                    IMAGENES DE INICIO
                    <lord-icon
                      src="https://cdn.lordicon.com/dhbjyxqp.json"
                      trigger="hover"
                      style={{ width: "230px", height: "230px" }}
                    />
                  </a>
                  {/* Agrega el icono dentro del componente */}
                </h2>
              </th>
              <th>
                <h2 className="text-center">
                  <a href="/textoLanding" className="decoracionTexto">
                    TEXTO DE INICIO
                    <lord-icon
                      src="https://cdn.lordicon.com/ncdtrewm.json"
                      trigger="hover"
                      style={{ width: "230px", height: "230px" }}
                    ></lord-icon>
                  </a>
                  {/* Agrega el icono dentro del componente */}
                </h2>
              </th>

              <th>
                <h2 className="text-center">
                  <a href="/Contactos" className="decoracionTexto">
                    CONTACTOS
                    <lord-icon
                      src="https://cdn.lordicon.com/aycieyht.json"
                      trigger="hover"
                      style={{ width: "230px", height: "230px" }}
                    ></lord-icon>
                  </a>
                  {/* Agrega el icono dentro del componente */}
                </h2>
              </th>
              <th>
                <h2 className="text-center">
                  <a href="/editUsuarios" className="decoracionTexto">
                    USUARIOS
                    <lord-icon
                      src="https://cdn.lordicon.com/bgebyztw.json"
                      trigger="hover"
                      style={{ width: "230px", height: "230px" }}
                    ></lord-icon>
                  </a>
                  {/* Agrega el icono dentro del componente */}
                </h2>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}
