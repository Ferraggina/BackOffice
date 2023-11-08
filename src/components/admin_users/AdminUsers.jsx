import React, { useState } from "react";
export function AdminUsers() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  return (
    <div>
      <br />

      <div className="container mt-4 table-responsive esiloTablaAdViaje">
        {/* <h2 className="text-center">Administracion Usuarios</h2>
        <table className="table table-bordered  tablaContainer ">
          <thead>
            <tr>
              <th>
                <h2 className="text-center">
                  <a href="/editUsuarios">
                    USUARIOS
                    <lord-icon
                      src="https://cdn.lordicon.com/dhbjyxqp.json"
                      trigger="hover"
                      style={{ width: "230px", height: "230px" }}
                    />
                  </a>
                 
                </h2>
              </th>
            </tr>
          </thead>
        </table> */}
      </div>
    </div>
  );
}
