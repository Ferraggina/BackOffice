import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { crearHotel, uploadImage } from "../../redux/actions/actions";
import "../../sass/_formularioHoteles.scss";
import { reuleaux } from "ldrs";

import GoogleMapReact from "google-map-react";

export default function FormularioHoteles() {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [fotos, setFotos] = useState([]);
  const [videos, setVideos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [otra_red, setOtra_red] = useState("");
  const [map, setMap] = useState(null);
  const [searchBox, setSearchBox] = useState(null);

  const [alert, setAlert] = useState(null); // Estado para la alerta
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Obtener la función de navegación
  const [isLoading, setIsLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const [mapApi, setMapApi] = useState(null);
  const [mapsApi, setMapsApi] = useState(null);
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const CustomMarker = ({ lat, lng }) => (
    <div
      style={{
        position: "absolute",
        transform: "translate(-50%, -50%)",
        width: "40px",
        height: "40px",
        backgroundImage: "url('src/assets/logo-cuyen-turismo-curvas.png')", // Ruta de tu imagen
        backgroundSize: "cover",
        borderRadius: "50%",
      }}
    />
  );
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fotos = JSON.stringify(selectedImages);

    const nuevoHotel = {
      nombre: nombre,
      direccion: direccion,
      fotos: fotos,
      videos: videos,
      telefono: telefono,
      otra_red: otra_red,
      latitud: latitud,
      longitud: longitud,
    };

    try {
      // Llamar a la acción para crear el itinerario
      await dispatch(crearHotel(nuevoHotel));

      setNombre("");
      setDireccion("");
      setFotos("");
      setVideos("");
      setSelectedImages([]);
      setTelefono("");
      setOtra_red("");

      setAlert({
        type: "success",
        message: "Su Hotel se agrego exitosamente.",
      });
    } catch (error) {
      // Mostrar una alerta de error
      setAlert({
        type: "danger",
        message: "Hubo un error al crear el Itinerario.",
      });
    }
    setTimeout(() => {
      navigate("/gestion/ListadoHoteles");
    }, 2000);
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [dispatch]);

  // useEffect(() => {
  //   viewMaps( map,maps);
  // }, []);
  // const viewMaps = (map, maps) => {
  //   setMapApi(map);
  //   setMapsApi(maps);

  //   const searchBox = new maps.places.SearchBox(
  //     document.getElementById("search-box")
  //   );
  //   searchBox.addListener("places_changed", () => {
  //     const places = searchBox.getPlaces();
  //     setPlaces(places);
  //     if (places.length === 0) {
  //       return;
  //     }
  //     // Zoom in on searched place
  //     map.fitBounds(places[0].geometry.viewport);
  //     const locations = places.map((place) => ({
  //       lat: place.geometry.location.lat(),
  //       lng: place.geometry.location.lng(),
  //     }));

  //     console.log("Ubicaciones encontradas:", locations);
  //   });
  // };
  const viewMaps = (map, maps) => {
    setMapApi(map);
    setMapsApi(maps);

    const searchBox = new maps.places.SearchBox(
      document.getElementById("search-box")
    );
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }

      // Obtener la ubicación del primer lugar encontrado
      const location = places[0].geometry.location;

      // Actualizar el estado con la nueva ubicación (latitud y longitud)
      setLatitud(location.lat().toString());
      setLongitud(location.lng().toString());

      if (places.length === 0) {
        return;
      }

      map.fitBounds(places[0].geometry.viewport);
      const locations = places.map((place) => ({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      }));

      console.log("Ubicaciones encontradas:", locations);
    });
  };

  // const handleDireccionChange = (e) => {
  //   setDireccion(e.target.value);
  //   // llamar a la API de geocodificación de Google Maps
  //
  // };

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
              <br />
              <div
                style={{ height: "400px", width: "100%" }}
                className="map-container"
              >
                <input
                  id="search-box"
                  type="text"
                  placeholder="Busca la direccion en el mapa"
                  style={{ height: "10%", width: "50%" }}
                />
                <br />

                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: "AIzaSyDaRaAfkiPUT0U9oNnMHjbtnI-8zG5c0z4",
                    libraries: ["places"],
                  }}
                  defaultCenter={{ lat: -34.61315, lng: -58.37723 }}
                  defaultZoom={11}
                  yesIWantToUseGoogleMapApiInternals
                  onGoogleApiLoaded={({ map, maps }) => viewMaps(map, maps)}
                >
                  {latitud && longitud && (
                    <CustomMarker
                      lat={parseFloat(latitud)}
                      lng={parseFloat(longitud)}
                    />
                  )}
                </GoogleMapReact>
              </div>
              <br />
              <br />

              <div className="form-group">
                <label className="estilosLabels">Telefono</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="+54 1111-1111"
                  value={telefono}
                  required
                  onChange={(e) => setTelefono(e.target.value)}
                  maxLength={30}
                />
              </div>
              <div className="form-group">
                <label className="estilosLabels">Pagina web del Hotel</label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="www.hotel.com"
                  value={otra_red}
                  required
                  onChange={(e) => setOtra_red(e.target.value)}
                  maxLength={30}
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
              <button
                type="submit"
                className="btn btn-primary estiloBotones"
                title="Añadir Hotel"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/smwmetfi.json"
                  trigger="hover"
                  style={{ width: "30px", height: "30px" }}
                  colors="primary:#ffffff,secondary:#1b1091"
                ></lord-icon>
              </button>
              {/* Botón de redirección */}
              {alert && alert.type === "success" && (
                <button
                  type="button"
                  className="btn btn-primary ml-2 estiloBotones"
                  onClick={() => navigate("/gestion/home")}
                >
                  Volver a administracion
                </button>
              )}
              <Link
                to="/gestion/FormularioViaje"
                className="btn btn-primary estiloBotones"
                title="Creacion de Viaje"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/ppyvfomi.json"
                  trigger="hover"
                  style={{ width: "30px", height: "30px" }}
                  colors="primary:#ffffff,secondary:#1b1091"
                ></lord-icon>
              </Link>
              {/* <Link
                to="/gestion/ListadoHoteles"
                className="btn btn-primary estiloBotones"
              >
                Volver al listado Hoteles
              </Link> */}
              <Link
                to="/gestion/ListadoHoteles"
                className="btn btn-primary estiloBotones"
                title="Listado de hoteles"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/zyzoecaw.json"
                  trigger="hover"
                  style={{ width: "30px", height: "30px" }}
                  colors="primary:#ffffff,secondary:#1b1091"
                ></lord-icon>
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
