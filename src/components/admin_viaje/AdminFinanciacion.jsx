import React, { useState } from "react";

import "../../sass/_adminViaje.scss";
import { Link } from "react-router-dom";
export function AdminFinanciacion() {
  return (
    <div>
      <br />
      {/* <div className="container mt-4 table-responsive "></div> */}
      <div className="container mt-4  ">
        <table className="table  tablaTransparente ">
          <thead>
            <tr>
              <th></th>
              <th>
                <div className="bordeBotonHome">
                  <h2 className="text-center">
                    <Link to="/gestion/mediosdepago" className="enlacesAdmin">
                      MEDIOS DE PAGO
                      <lord-icon
                        src="https://cdn.lordicon.com/wyqtxzeh.json"
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
                    <Link to="/gestion/mediosdepagoAcontratos" className="enlacesAdmin">
                      FINANCIACIONES DE CONTRATO
                      <lord-icon
                        src="https://cdn.lordicon.com/ghhwiltn.json"
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
      <br />
    </div>
  );
}
