import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { crearHotel, uploadImage } from "../../redux/actions/actions";
import "../../sass/_formularioHoteles.scss";
import { reuleaux } from "ldrs";

export default function FormularioHoteles() {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [fotos, setFotos] = useState([]);
  const [videos, setVideos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [alert, setAlert] = useState(null); // Estado para la alerta
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Obtener la función de navegación
  const [isLoading, setIsLoading] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fotos = JSON.stringify(selectedImages);

    const nuevoHotel = {
      nombre: nombre,
      direccion: direccion,
      fotos: fotos,
      videos: videos,
      telefono: telefono,
    };

    try {
      // Llamar a la acción para crear el itinerario
      await dispatch(crearHotel(nuevoHotel));

      // Limpiar los campos del formulario
      setNombre("");
      setDireccion("");
      setFotos("");
      setVideos("");
      setSelectedImages([]);
      setTelefono("");

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
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false); // Cambia el estado a false después de un tiempo (simulación de carga)
    }, 1500); // Cambia el número a la cantidad de tiempo que desees simular

    return () => clearTimeout(timeout);
  }, [dispatch]);

  const handleImageUpload = async (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);

      try {
        const response = await dispatch(uploadImage(formData));

        if (response) {
          setSelectedImages([...selectedImages, response]);
        }
      } catch (error) {
        console.error("Error al cargar la imagen en el servidor:", error);
      }
    }
  };
  const removeSelectedImage = (index) => {
    const newSelectedImages = [...selectedImages];
    newSelectedImages.splice(index, 1);
    setSelectedImages(newSelectedImages);
  };

  return (
    <div className="card-body">
      {isLoading ? (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <div className="spinner">
            {/* Contenido del spinner */}

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
        <form
          className="form-sample"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <br />
          <br />
          <br />
          <h4 className="text-center card-tittle tituloForm">
            Agregar un nuevo Hotel
          </h4>
          <div className="row justify-content-center form-group contenedorFormularioHoteles">
            <div className="col-md-6">
              {/* Alerta condicional */}
              {alert && (
                <div className={`alert alert-${alert.type}`} role="alert">
                  {alert.message}
                </div>
              )}

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
                <label className="estilosLabels">Direccion</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Direccion"
                  value={direccion}
                  required
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="estilosLabels">Telefono</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="+54 1111-1111"
                  value={telefono}
                  required
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="estilosLabels">Añadir Fotos</label>
                <br />

                <div className="custom-file-upload">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    id="file-upload"
                    className="file-input"
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="file-upload" className="custom-label">
                    Selecciona archivos
                  </label>
                </div>

                {selectedImages &&
                  selectedImages.map((image, index) => (
                    <div key={index} className="selected-image-item">
                      <img
                        src={image}
                        alt={`Selected ${index}`}
                        className="selected-image"
                        style={{ width: "200px", height: "200px" }}
                      />
                      <br />
                      <button
                        className="btn btn-danger remove-image"
                        onClick={() => removeSelectedImage(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
              </div>

              <div className="form-group">
                <label className="estilosLabels">Añadir enlace de Video</label>
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
              <button type="submit" className="btn btn-primary estiloBotones">
                Añadir Hotel
              </button>

              {/* Botón de redirección */}
              {alert && alert.type === "success" && (
                <button
                  type="button"
                  className="btn btn-primary ml-2 estiloBotones"
                  onClick={() => navigate("/home")}
                >
                  Volver a administracion
                </button>
              )}
              <Link
                to="/FormularioViaje"
                className="btn btn-primary estiloBotones"
              >
                Creacion de Viaje
              </Link>
              <Link
                to="/ListadoHoteles"
                className="btn btn-primary estiloBotones"
              >
                Volver al listado Hoteles
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
