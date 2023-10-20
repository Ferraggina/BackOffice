// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import "../../sass/_itinerario.scss";
// import { crearItinerario } from "../../redux/actions/actions";
// export default function Itinerario() {
//   const [nombre, setNombre] = useState("");
//   const [textoGral, setTextoGral] = useState("");
//   const [camposExtras, setCamposExtras] = useState([
//     { titulo: "", descripcion: "" },
//   ]);
//   const dispatch = useDispatch();

//   const handleCampoExtraChange = (index, field, value) => {
//     const newCamposExtras = [...camposExtras];
//     newCamposExtras[index][field] = value;
//     setCamposExtras(newCamposExtras);
//   };

//   const handleAgregarCampoExtra = () => {
//     setCamposExtras([...camposExtras, { titulo: "", descripcion: "" }]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Mapea los camposExtras en un formato adecuado
//     const camposExtrasFormateados = camposExtras.map((campo) => ({
//       titulo: campo.titulo,
//       descripcion: campo.descripcion,
//     }));

//     const nuevoItinerario = {
//       nombre: nombre,
//       texto_gral: JSON.stringify(camposExtrasFormateados), // Convierte a JSON
//     };

//     try {
//       // Llamar a la acción para crear el itinerario
//       await dispatch(crearItinerario(nuevoItinerario));

//       // Limpiar los campos del formulario
//       setNombre("");
//       setTextoGral("");
//       setCamposExtras([{ titulo: "", descripcion: "" }]);
//       // Resto de tu código para mostrar una alerta, etc.
//     } catch (error) {
//       // Manejar errores
//     }
//   };

//   return (
//     <div className="card-tittle">
//       <br />
//       <br />
//       <br />
//       <h1 className="text-center tituloForm">Crear Itinerario</h1>
//       <form className="form-sample " onSubmit={handleSubmit}>
//         {/* ...otros campos */}
//         <div className="form-group">
//           <label className="estilosLabels">Nombre</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Nombre"
//             value={nombre}
//             onChange={(e) => setNombre(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label className="estilosLabels">Texto General</label>
//           {camposExtras.map((campo, index) => (
//             <div key={index}>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Título"
//                 value={campo.titulo}
//                 onChange={(e) =>
//                   handleCampoExtraChange(index, "titulo", e.target.value)
//                 }
//               />
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Descripción"
//                 value={campo.descripcion}
//                 onChange={(e) =>
//                   handleCampoExtraChange(index, "descripcion", e.target.value)
//                 }
//               />
//             </div>
//           ))}
//           <button type="button" onClick={handleAgregarCampoExtra}>
//             Agregar Campo Extra
//           </button>
//         </div>
//         {/* ...otros campos */}
//         <button
//           type="submit"
//           className="btn btn-primary estiloBotones"
//           onClick={handleSubmit}
//         >
//           Agregar Itinerario
//         </button>
//         {/* ...botón de redirección */}
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../../sass/_itinerario.scss";
import { crearItinerario } from "../../redux/actions/actions";

export default function Itinerario() {
  const [nombre, setNombre] = useState("");
  const [textoGral, setTextoGral] = useState("");
  const [camposExtras, setCamposExtras] = useState([
    { titulo: "", descripcion: "" },
  ]);
  const [alert, setAlert] = useState(null); // Estado para la alerta
  const dispatch = useDispatch();

  const handleCampoExtraChange = (index, field, value) => {
    const newCamposExtras = [...camposExtras];
    newCamposExtras[index][field] = value;
    setCamposExtras(newCamposExtras);
  };

  const handleAgregarCampoExtra = () => {
    setCamposExtras([...camposExtras, { titulo: "", descripcion: "" }]);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Mapea los camposExtras en un formato adecuado
  //   const camposExtrasFormateados = camposExtras.map((campo) => ({
  //     titulo: campo.titulo,
  //     descripcion: campo.descripcion,
  //   }));

  //   const nuevoItinerario = {
  //     nombre: nombre,
  //     texto_gral: JSON.stringify(camposExtrasFormateados), // Convierte a JSON
  //   };

  //   try {
  //     // Llamar a la acción para crear el itinerario
  //     await dispatch(crearItinerario(nuevoItinerario));

  //     // Limpiar los campos del formulario
  //     setNombre("");
  //     setTextoGral("");
  //     setCamposExtras([{ titulo: "", descripcion: "" }]);

  //     // Mostrar una alerta de éxito
  //     setAlert({
  //       type: "success",
  //       message: "Su Itinerario se creó exitosamente.",
  //     });

  //     // Resto de tu código para redirigir al usuario, etc.
  //   } catch (error) {
  //     // Mostrar una alerta de error
  //     setAlert({
  //       type: "danger",
  //       message: "Hubo un error al crear el Itinerario.",
  //     });
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica que al menos un campo extra tenga título o descripción
    if (
      camposExtras.every(
        (campo) => campo.titulo === "" && campo.descripcion === ""
      )
    ) {
      // Muestra una alerta de error si todos los campos están vacíos
      setAlert({
        type: "danger",
        message:
          "Debe agregar al menos un campo extra con título o descripción.",
      });
    } else {
      // Mapea los camposExtras en un formato adecuado
      const camposExtrasFormateados = camposExtras
        .filter((campo) => campo.titulo !== "" || campo.descripcion !== "") // Filtra los campos no vacíos
        .map((campo) => ({
          titulo: campo.titulo,
          descripcion: campo.descripcion,
        }));

      const nuevoItinerario = {
        nombre: nombre,
        texto_gral: JSON.stringify(camposExtrasFormateados), // Convierte a JSON
      };

      try {
        // Llamar a la acción para crear el itinerario
        await dispatch(crearItinerario(nuevoItinerario));

        // Limpiar los campos del formulario
        setNombre("");
        setTextoGral("");
        setCamposExtras([{ titulo: "", descripcion: "" }]);

        // Mostrar una alerta de éxito
        setAlert({
          type: "success",
          message: "Su Itinerario se creó exitosamente.",
        });
      } catch (error) {
        // Mostrar una alerta de error
        setAlert({
          type: "danger",
          message: "Hubo un error al crear el Itinerario.",
        });
      }
    }
  };

  return (
    <div className="card-tittle">
      <br />
      <br />
      <br />
      <h1 className="text-center tituloForm">Crear Itinerario</h1>

      <form className="form-sample " onSubmit={handleSubmit}>
        <div className="row justify-content-center formularioItinerarioContenedor">
          <div>
            {alert && (
              <div className={`alert alert-${alert.type}`} role="alert">
                {alert.message}
              </div>
            )}
          </div>
          <div className="col-md-6">
            {/* ...otros campos */}
            <div className="form-group">
              <label className="estilosLabels">Nombre</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={nombre}
                required
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="estilosLabels">Texto General</label>
              {camposExtras.map((campo, index) => (
                <div key={index}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Título"
                    value={campo.titulo}
                    onChange={(e) =>
                      handleCampoExtraChange(index, "titulo", e.target.value)
                    }
                  />
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Descripción"
                    value={campo.descripcion}
                    onChange={(e) =>
                      handleCampoExtraChange(
                        index,
                        "descripcion",
                        e.target.value
                      )
                    }
                  />
                  <br />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAgregarCampoExtra}
                className="btn btn-primary estiloBotones"
              >
                Agregar Campo Extra
              </button>
            </div>
            {/* ...otros campos */}
            <button
              type="submit"
              className="btn btn-primary estiloBotones"
              onClick={handleSubmit}
            >
              Agregar Itinerario
            </button>
            {/* ...botón de redirección */}
          </div>
        </div>
      </form>
      {/* Alerta condicional */}
    </div>
  );
}
