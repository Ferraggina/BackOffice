import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "../../sass/_itinerario.scss";
import { crearItinerario } from "../../redux/actions/actions";
import { reuleaux } from "ldrs";
import { Link, useNavigate } from "react-router-dom";

export default function Itinerario() {
  const [nombre, setNombre] = useState("");
  const [textoGral, setTextoGral] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [camposExtras, setCamposExtras] = useState([
    { titulo: "", descripcion: [""] },
  ]);
  const [alert, setAlert] = useState(null); // Estado para la alerta
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false); // Cambia el estado a false después de un tiempo (simulación de carga)
    }, 1500); // Cambia el número a la cantidad de tiempo que desees simular

    return () => clearTimeout(timeout);
  }, [dispatch]);
  // const handleCampoExtraChange = (index, field, value) => {
  //   const newCamposExtras = [...camposExtras];
  //   newCamposExtras[index][field] = value;
  //   setCamposExtras(newCamposExtras);
  // };
  const handleCampoExtraChange = (index, field, value) => {
    const newCamposExtras = [...camposExtras];
    if (field === "titulo") {
      newCamposExtras[index][field] = value;
    } else if (field === "descripcion") {
      // Verifica si ya existe la descripción o si es un nuevo campo de descripción
      const descripcionIndex = parseInt(value.split("_")[1], 10);
      if (isNaN(descripcionIndex)) {
        newCamposExtras[index].descripcion.push(value);
      } else {
        newCamposExtras[index].descripcion[descripcionIndex] =
          value.split("_")[0];
      }
    }
    setCamposExtras(newCamposExtras);
  };
  const handleAgregarDescripcion = (index) => {
    const newCamposExtras = [...camposExtras];
    newCamposExtras[index].descripcion.push(""); // Agrega una nueva descripción vacía al campo extra seleccionado
    setCamposExtras(newCamposExtras);
  };
  const handleAgregarCampoExtra = () => {
    setCamposExtras([...camposExtras, { titulo: "", descripcion: [""] }]);
  };

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
    setTimeout(() => {
      navigate("/gestion/listaItinerarios/");
    }, 2000);
  };

  return (
    <div className="card-tittle">
      <br />
      <br />
      <br />
      {isLoading ? (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <div className="spinner">
            {reuleaux.register()}
            <l-reuleaux
              size="120"
              stroke="7"
              stroke-length="0.15"
              bg-opacity="0.40"
              speed="1.2"
              color="#244AE0"
            ></l-reuleaux>
          </div>
          <p className="text-center mt-3">Cargando...</p>
        </div>
      ) : (
        <div>
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
                      <label>Titulo de la actividad {index + 1}</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ejemplo:Desayuno buffet"
                        value={campo.titulo}
                        onChange={(e) =>
                          handleCampoExtraChange(
                            index,
                            "titulo",
                            e.target.value
                          )
                        }
                      />
                      <br />
                      {/* <label>Descripcion de la actividad {index + 1}</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="De 9:45 hs a 12:00 hs"
                        value={campo.descripcion}
                        onChange={(e) =>
                          handleCampoExtraChange(
                            index,
                            "descripcion",
                            e.target.value
                          )
                        }
                      /> */}
                      {campo.descripcion &&
                        Array.isArray(campo.descripcion) &&
                        campo.descripcion.map((descripcion, i) => (
                          <div key={i}>
                            <label>
                              Descripcion {i + 1} del campo extra {index + 1}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={`Descripción ${i + 1}`}
                              value={descripcion}
                              maxLength={150}
                              onChange={(e) =>
                                handleCampoExtraChange(
                                  index,
                                  "descripcion",
                                  e.target.value + `_${i}`
                                )
                              }
                            />
                            <br />
                          </div>
                        ))}
                      <button
                        type="button"
                        onClick={() => handleAgregarDescripcion(index)}
                        className="btn btn-secondary"
                        title="Agrega una descripcion"
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/ghhwiltn.json"
                          trigger="hover"
                          colors="primary:#1b1091,secondary:#e4e4e4"
                          style={{ width: "40px", height: "40px" }}
                        ></lord-icon>
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={handleAgregarCampoExtra}
                    className="btn btn-primary estiloBotones"
                    title="Agregar Campo "
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/xljvqlng.json"
                      trigger="hover"
                      colors="primary:#e4e4e4"
                      style={{ width: "40px", height: "40px" }}
                    ></lord-icon>
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary estiloBotones"
                    onClick={handleSubmit}
                    title="Aagregar Itinerario"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/smwmetfi.json"
                      trigger="hover"
                      style={{ width: "40px", height: "40px" }}
                      colors="primary:#ffffff,secondary:#1b1091"
                    ></lord-icon>
                  </button>
                  <Link
                    to="/gestion/FormularioViaje"
                    className="btn btn-primary estiloBotones"
                    title="Formulario Viaje"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/ppyvfomi.json"
                      trigger="hover"
                      style={{ width: "40px", height: "40px" }}
                      colors="primary:#ffffff,secondary:#1b1091"
                    ></lord-icon>
                  </Link>
                  <Link
                    to="/gestion/listaItinerarios"
                    className="btn btn-primary estiloBotones"
                    title="Lista de Itinerarios"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/zyzoecaw.json"
                      trigger="hover"
                      style={{ width: "40px", height: "40px" }}
                      colors="primary:#ffffff,secondary:#1b1091"
                    ></lord-icon>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
