// import "../../app.scss";

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../redux/actions/actions";

// export function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const dispatch = useDispatch();

//   const user = useSelector((state) => state.user);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Valida los datos
//     if (username === "") {
//       setError("El nombre de usuario no puede estar vacío.");
//       return;
//     }

//     if (password === "") {
//       setError("La contraseña no puede estar vacía.");
//       return;
//     }

//     // Envia la solicitud de login al backend
//     // ...
//     dispatch(login(username, password))
//       .then((res) => {
//         // Redirige al usuario a otra página
//         // console.log('SOY LO Q HAY', res.payload.status)
//         if (res.payload.status === 200) {
//           return navigate("/home");
//         }
//       })
//       .catch((error) => {
//         // Manejo los errores que puedan ocurrir en la acción loginAuth
//         console.error("Error, datos Incorrectos", error);
//       });
//     // Verifica si el login es correcto

//     if (!user) {
//       setError("El login no es correcto.");
//       console.log("aca no  fue");
//       alert("no se encontro el usuario");
//       return;
//     }
//   };

//   useEffect(() => {
//     // Limpia el error cuando se cambia el nombre de usuario o la contraseña
//     if (username !== "" || password !== "") {
//       setError("");
//     }
//   }, [username, password]);

//   return (
//     <div className="container">
//       <form className="form-container" onSubmit={handleSubmit}>
//         <div className="input-log">
//           <label htmlFor="">Usuario</label>
//           <input
//             type="text"
//             value={username}
//             required
//             onChange={(e) => setUsername(e.target.value)}
//             className="input-style"
//             placeholder="Ingrese su Usuario"
//           />
//         </div>
//         <div className="input-log">
//           <label htmlFor="">Contraseña</label>
//           <input
//             type="password"
//             value={password}
//             required
//             onChange={(e) => setPassword(e.target.value)}
//             className="input-style"
//             placeholder="Ingrese su contraseña"
//           />
//         </div>
//         {error && <div className="error-message">{error}</div>}
//         <div className="container-btn">
//           <input type="submit" value="Ingresar" className="btn-style" />
//         </div>
//       </form>
//     </div>
//   );
// }
import "../../app.scss";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/actions";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Valida los datos
    if (username === "") {
      setError("El nombre de usuario no puede estar vacío.");
      return;
    }

    if (password === "") {
      setError("La contraseña no puede estar vacía.");
      return;
    }

    // Envia la solicitud de login al backend
    // ...
    dispatch(login(username, password))
      .then((res) => {
        // Redirige al usuario a otra página
        // console.log('SOY LO Q HAY', res.payload.status)
        if (res.payload.status === 200) {
          return navigate("/home");
        }
      })
      .catch((error) => {
        // Manejo los errores que puedan ocurrir en la acción loginAuth
        console.error("Error, datos Incorrectos", error);
      });
    // Verifica si el login es correcto

    if (!user) {
      setError("El login no es correcto.");
      console.log("aca no  fue");
      alert("no se encontro el usuario");
      return;
    }
  };

  useEffect(() => {
    // Limpia el error cuando se cambia el nombre de usuario o la contraseña
    if (username !== "" || password !== "") {
      setError("");
    }
  }, [username, password]);

  return (
    <div className="container">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="input-log">
          <label htmlFor="">Usuario</label>
          <input
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="input-style"
            placeholder="Ingrese su Usuario"
          />
        </div>
        <div className="input-log">
          <label htmlFor="">Contraseña</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="input-style"
            placeholder="Ingrese su contraseña"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="container-btn">
          <input type="submit" value="Ingresar" className="btn-style" />
        </div>
        <div className="container-btn">
          <button onClick={() => navigate("/ForgotPass")} className="btn-style">
            Olvidé mi contraseña
          </button>
        </div>
      </form>

      {/* Botón para olvidar la contraseña */}
    </div>
  );
}
