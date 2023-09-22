// import React from "react";

// export function RecuperarPass() {
//   return (
//     <div>
//       <h1>RECUPERAR PASS</h1>
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
// export function RecuperarPass() {
//   const { token } = useParams();
//   const [newPassword, setNewPassword] = useState("");
//   console.log(token);
//   // Resto de la lógica para restablecer la contraseña

//   return (
//     <Link
//     href={`//${token}`}

//   >
//      <div>
//       <h2>Restablecer Contraseña</h2>

//       {/* Esto es solo para verificar que el token se extrae correctamente */}
//       {/* Formulario para restablecer la contraseña */}
//     </div>
//   </Link>

//   );
// }
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function RecuperarPass() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  useEffect(() => {
    // Aquí puedes realizar la lógica de recuperación de contraseña con el token
    if (token) {
      // Lógica para recuperar contraseña con el token
    }
  }, [token]);

  // Resto del código...

  return (
    <div>
      <h2>Recuperación de Contraseña</h2>
      {/* Resto de la lógica para recuperación de contraseña */}
    </div>
  );
}
