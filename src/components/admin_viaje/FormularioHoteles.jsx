import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { crearHotel } from "../../redux/actions/actions";

export default function FormularioHoteles() {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");

  const [fotos, setFotos] = useState([]);
  const [videos, setVideos] = useState("");
  const [alert, setAlert] = useState(null); // Estado para la alerta
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Obtener la función de navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fotosBase64 = await Promise.all(
      fotos.map(async (file) => {
        const base64 = await convertFileToBase64(file);
        return base64;
      })
    );

    const nuevoHotel = {
      nombre: nombre,
      direccion: direccion,
      fotos: fotosBase64,
      videos: videos,
    };

    try {
      // Llamar a la acción para crear el itinerario
      await dispatch(crearHotel(nuevoHotel));

      // Limpiar los campos del formulario
      setNombre("");
      setDireccion("");
      setFotos([]);
      setVideos("");

      // Mostrar una alerta de éxito
      setAlert({
        type: "success",
        message: "Su Hotel se agrego exitosamente.",
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
  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    if (files && files.length > 0) {
      setFotos([...fotos, ...files]); // Agrega nuevos archivos al estado existente
    }
  };
  const handleRemoveFile = (index) => {
    const updatedFiles = [...fotos];
    updatedFiles.splice(index, 1);
    setFotos(updatedFiles);
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result.split(",")[1];
        console.log("Base64 de la imagen:", base64); // Agrega este console.log
        resolve(base64);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <form
      className="container "
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <br />
      <br />
      <br />
      <div className="row justify-content-center formularioViajeContenedor">
        <h1 className="text-center tipoLetraViaje">Agregar un nuevo Hotel</h1>
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
            <label>Direccion</label>
            <input
              type="text"
              className="form-control"
              placeholder="Direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Añadir Fotos</label>
            <br />
            <input
              type="file"
              className="form-control-file"
              multiple
              onChange={handleFileInputChange}
            />
          </div>
          {/* Área para mostrar archivos seleccionados */}
          {/* Área para mostrar archivos seleccionados */}
          <div className="selected-files">
            <h4>Archivos Seleccionados:</h4>
            <ul>
              {fotos.map((file, index) => (
                <li key={index}>
                  {file.name}
                  <button
                    type="button"
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => handleRemoveFile(index)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="form-group">
            <label>Añadir enlace de Video</label>
            <input
              type="text"
              className="form-control"
              placeholder="Videos"
              value={videos}
              onChange={(e) => setVideos(e.target.value)}
            />
          </div>

          <div className="form-group"></div>
          <br />
          <button type="submit" className="btn btn-primary">
            Añadir Hotel
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
