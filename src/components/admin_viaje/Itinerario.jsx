// import React, { useState } from "react";
// import { crearItinerario } from "../../redux/actions/actions";

// import { useDispatch } from "react-redux";
// export default function Itinerario() {
//   const [nombre, setNombre] = useState("");
//   const [textoGral, setTextoGral] = useState("");
//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Crear un objeto con los datos del formulario
//     const nuevoItinerario = {
//       nombre: nombre,
//       texto_gral: textoGral,
//     };

//     // Llamar a la acción para crear el itinerario

//     dispatch(crearItinerario(nuevoItinerario)).then(() => {});

//     // Limpiar los campos del formulario
//     setNombre("");
//     setTextoGral("");
//   };

//   return (
//     <form className="container " onSubmit={handleSubmit}>
//       <br />
//       <br />
//       <br />
//       <div className="row justify-content-center formularioViajeContenedor">
//         <h1 className="text-center tipoLetraViaje">Crear Itinerario</h1>
//         <div className="col-md-6">
//           <div className="form-group">
//             <label>Nombre</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Nombre"
//               value={nombre}
//               onChange={(e) => setNombre(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label>Texto General</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Texto General"
//               value={textoGral}
//               onChange={(e) => setTextoGral(e.target.value)}
//             />
//           </div>

//           <div className="form-group"></div>
//           <br />
//           <button type="submit" className="btn btn-primary">
//             Agregar Itinerario
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { crearItinerario } from "../../redux/actions/actions";

export default function Itinerario() {
  const [nombre, setNombre] = useState("");
  const [textoGral, setTextoGral] = useState("");
  const [alert, setAlert] = useState(null); // Estado para la alerta
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Obtener la función de navegación

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoItinerario = {
      nombre: nombre,
      texto_gral: textoGral,
    };

    try {
      // Llamar a la acción para crear el itinerario
      await dispatch(crearItinerario(nuevoItinerario));

      // Limpiar los campos del formulario
      setNombre("");
      setTextoGral("");

      // Mostrar una alerta de éxito
      setAlert({
        type: "success",
        message: "Su Itinerario se creó exitosamente.",
      });

      // Redirigir al usuario a la página de inicio después de 2 segundos

      // Cambia "/" al URL de la página de inicio que desees
      // 2000 ms (2 segundos)
    } catch (error) {
      // Mostrar una alerta de error
      setAlert({
        type: "danger",
        message: "Hubo un error al crear el Itinerario.",
      });
    }
  };

  return (
    <form className="container " onSubmit={handleSubmit}>
      <br />
      <br />
      <br />
      <div className="row justify-content-center formularioViajeContenedor">
        <h1 className="text-center tipoLetraViaje">Crear Itinerario</h1>
        <div className="col-md-6">
          {/* Alerta condicional */}
          {alert && (
            <div className={`alert alert-${alert.type}`} role="alert">
              {alert.message}
            </div>
          )}

          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Texto General</label>
            <input
              type="text"
              className="form-control"
              placeholder="Texto General"
              value={textoGral}
              onChange={(e) => setTextoGral(e.target.value)}
            />
          </div>

          <div className="form-group"></div>
          <br />
          <button type="submit" className="btn btn-primary">
            Agregar Itinerario
          </button>

          {/* Botón de redirección */}
          {alert && alert.type === "success" && (
            <button
              type="button"
              className="btn btn-primary ml-2"
              onClick={() => navigate("/home")}
            >
              Volver a administracion
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
