// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { forgotPassword } from "../../redux/actions/actions";
// import { useNavigate } from "react-router-dom";

// export function OlvidoPass() {
//   const [username, setUsername] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const isLoading = useSelector((state) => state.isLoading);

//   const success = useSelector((state) => state.success);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     dispatch(forgotPassword(username))
//       .then((res) => {
//         if (res.payload.status === 200) {
//           return navigate("/");
//         }
//       })
//       .catch((error) => {
//         // Manejo los errores que puedan ocurrir en la acción loginAuth
//         console.error("Error, datos Incorrectos", error);
//       });
//   };

//   //   useEffect(() => {
//   //     if (success) {
//   //       // Redirige al usuario al componente Login
//   //       dispatch(navigate("/"));
//   //     }
//   //   }, []);

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div className="input-log">
//           <label htmlFor="">Por favor ingrese su Usuario</label>
//           <input
//             type="text"
//             required
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="input-style"
//             placeholder="Ingrese su Usuario"
//           />
//         </div>
// //         {isLoading && <div>Cargando...</div>}
// //         {success && (
//           <div>
//             Se ha enviado un correo electrónico a su dirección de correo
//             electrónico con un enlace para restablecer su contraseña.
//           </div>
//         )}
//         <input type="submit" value="Enviar" className="btn-style" />
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import "../../app.scss";
export function OlvidoPass() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector((state) => state.isLoading);
  const success = useSelector((state) => state.success);
  const error = useSelector((state) => state.error);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPassword(username)).then((res) => {
      console.log(res);
    });
    // dispatch(forgotPassword(username))
    //   .then((res) => {
    //     // Redirige al usuario a otra página
    //     // console.log('SOY LO Q HAY', res.payload.status)
    //     if (res.payload.status === 200) {
    //       return "Se envio el correo";
    //     }
    //   })
    //   .catch((error) => {
    //     // Manejo los errores que puedan ocurrir en la acción loginAuth
    //     console.error("Error, datos Incorrectos", error);
    //   });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-container">
        <div className="input-log">
          <label htmlFor="">Por favor ingrese su Usuario</label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-style"
            placeholder="Ingrese su Usuario"
          />
        </div>
        <div className="container-btn">
          <input type="submit" value="Enviar" className="btn-style" />
        </div>
      </form>
      {isLoading && <div>Cargando...</div>}
      {success && (
        <div className="input-log">
          Por favor , revise su correo electronico ,le enviamos un enlace para
          restablecer su contraseña.
        </div>
      )}
      {error && <div>Error: {error}</div>}
      <button onClick={() => navigate("/")}>Volver al inicio</button>
    </div>
  );
}

export default OlvidoPass;
