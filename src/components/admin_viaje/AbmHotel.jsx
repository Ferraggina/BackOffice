import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  obtenerHoteles,
  deleteHotel,
  editHotel,
  uploadImage,
} from "../../redux/actions/actions";
import Pagination from "../../components/home/Pagination.jsx";
import { reuleaux } from "ldrs";
import "../../sass/_abmHotel.scss";
export default function AbmHotel() {
  const dispatch = useDispatch();
  const hoteles = useSelector((state) => state.hoteles);
  const [showModal, setShowModal] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [editingHotel, setEditingHotel] = useState({
    nombre: "",
    direccion: "",
    fotos: "",
    videos: "",
  });
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingHotel, setViewingHotel] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(obtenerHoteles());
    const timeout = setTimeout(() => {
      setIsLoading(true); // Cambia el estado a false después de un tiempo (simulación de carga)
    }, 1500); // Cambia el número a la cantidad de tiempo que desees simular

    return () => clearTimeout(timeout);
  }, [dispatch]);

  const handleEditClick = (hotel) => {
    setEditingHotel(hotel);
    setShowModal(true);
  };

  const handleDeleteClick = (hotelId) => {
    setHotelToDelete(hotelId);
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleConfirmDelete = () => {
    if (hotelToDelete) {
      dispatch(deleteHotel(hotelToDelete.id));
      setShowConfirmationModal(false);
      setHotelToDelete(null);
      alert("El hotel se eliminó con éxito");
      window.location.reload();
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingHotel({
      ...editingHotel,
      [name]: value,
    });
  };

  const handleSaveEdits = () => {
    if (editingHotel) {
      const hotelId = editingHotel.id;

      // Crear una copia de las fotos existentes y agregar las nuevas seleccionadas
      const fotosExistente = JSON.parse(editingHotel.fotos);
      const fotosNuevas = selectedImages;
      const fotosActualizadas = [...fotosExistente, ...fotosNuevas];

      const hotelActualizado = {
        nombre: editingHotel.nombre,
        direccion: editingHotel.direccion,
        fotos: JSON.stringify(fotosActualizadas), // Convertir a JSON antes de guardar
        videos: editingHotel.videos,
      };

      dispatch(editHotel(hotelId, hotelActualizado));
      setShowModal(false);
      alert("Cambios guardados con éxito");

      // Limpiar las URLs de imágenes después de guardar
      setImageUrls([]);
      window.location.reload();
    }
  };
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

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

  const handleRemoveExistingImage = (index) => {
    const currentFotos = JSON.parse(editingHotel.fotos);

    if (Array.isArray(currentFotos)) {
      const updatedImages = currentFotos.filter((_, i) => i !== index);

      setEditingHotel({
        ...editingHotel,
        fotos: JSON.stringify(updatedImages),
      });
    } else {
      // Manejo si no es un arreglo de imágenes, podría ser una URL individual
      setEditingHotel({
        ...editingHotel,
        fotos: null, // O cualquier otro valor que consideres adecuado en este caso
      });
    }
  };
  const handleViewClick = (hotel) => {
    setViewingHotel(hotel);
    setShowViewModal(true);
  };

  const filterHoteles = (hoteles) => {
    const filteredHoteles = hoteles.filter((hotel) => {
      return hotel.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Calcular el índice del primer elemento y del último elemento en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Obtener los elementos de la página actual
    const currentItems = filteredHoteles.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    return currentItems;
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reiniciar a la primera página cuando cambie la cantidad de elementos por página
  };
  return (
    <div className="custom-container mt-8">
      <br />
      <br />
      <br />

      {!isLoading ? (
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
        <div className="cardViajes ">
          <br />
          <div className="search-field d-none d-md-block busquedaContenedor">
            <form
              className="d-flex align-items-center h-100 formularioSearch"
              action="#"
            >
              <div className="input-group">
                <div className="input-group-prepend bg-transparent">
                  <span className="input-group-text border-0">
                    <FontAwesomeIcon icon={faSearch} />
                  </span>
                </div>
                <input
                  type="search"
                  className="input-md  searchabar"
                  placeholder="Busque el nombre del hotel"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
              </div>
            </form>
          </div>
          <br />
          <div className="text-center encabezadoLista">Lista de Hoteles</div>
          <br />
          <div className="table-responsive">
            <table className="table table-bordered tablaViaje">
              <thead className="text-center cabecerasDeTabla">
                <tr>
                  <th>Nombre</th>
                  <th>Dirección</th>
                  <th>Telefono</th>
                  <th>Fotos</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="text-center cuerpoTabla">
                {hoteles.length ? (
                  filterHoteles(hoteles).map((hotel) => (
                    <tr key={hotel.id}>
                      <td>{hotel.nombre}</td>
                      <td>{hotel.direccion}</td>
                      <td>{hotel.telefono}</td>
                      <td>
                        <div className="images-container">
                          {hotel.fotos &&
                            JSON.parse(hotel.fotos).map((foto, index) => (
                              <img
                                key={index}
                                src={foto}
                                alt={`Imagen ${index}`}
                                className="hotel-image"
                                style={{ width: "40px", height: "40px" }}
                              />
                            ))}
                        </div>
                      </td>

                      <td>
                        <button
                          className="btn btn-primary botonEditar"
                          onClick={() => handleEditClick(hotel)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/zfzufhzk.json"
                            trigger="hover"
                            style={{ width: "15px", height: "15px" }}
                          ></lord-icon>
                        </button>
                        <button
                          className="btn btn-danger botonEliminar"
                          onClick={() => handleDeleteClick(hotel)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/xekbkxul.json"
                            trigger="hover"
                            style={{ width: "15px", height: "15px" }}
                          ></lord-icon>
                        </button>
                        <button
                          className="btn btn-info botonEditar"
                          onClick={() => handleViewClick(hotel)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/ascijbjj.json"
                            trigger="hover"
                            style={{ width: "15px", height: "15px" }}
                          ></lord-icon>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No hay hoteles disponibles.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="pagination  d-flex justify-content-center align-items-center">
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={hoteles.length}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
            <p className="mx-2 textoItemsViaje ">
              Cantidad de hoteles por pagina:
            </p>
            <form className="d-flex align-items-center h-100 " action="#">
              {/* Resto de tu código */}
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="form-select mx-1 seletItemsViajes"
              >
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Edición */}
      <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación de Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {hotelToDelete && (
            <p>
              ¿Está seguro que desea eliminar el hotel{" "}
              <strong>{hotelToDelete.nombre}</strong>?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmationModal}>
            No
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Sí
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="modal-lg"
      >
        <Modal.Header closeButton className="headerModal">
          <Modal.Title>Editar Hotel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label style={{ fontWeight: "bold" }}>Nombre:</label>
          <input
            className="form-control mb-3"
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={editingHotel ? editingHotel.nombre : ""}
            onChange={handleInputChange}
          />
          <label style={{ fontWeight: "bold" }}>Dirección:</label>
          <input
            className="form-control mb-3"
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={editingHotel ? editingHotel.direccion : ""}
            onChange={handleInputChange}
          />
          <div className="form-group">
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
                    style={{ width: "150px", height: "150px" }}
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

            <div className="selected-files">
              <h4>Fotos Seleccionadas:</h4>
              {editingHotel.fotos ? (
                JSON.parse(editingHotel.fotos).map((foto, index) => (
                  <div key={index} className="selected-image-item">
                    <br />
                    <img
                      src={foto}
                      alt={`Selected ${index}`}
                      className="selected-image"
                      style={{ width: "150px", height: "150px" }}
                    />

                    <button
                      className="btn btn-danger remove-image"
                      onClick={() => handleRemoveExistingImage(index)}
                    >
                      X
                    </button>
                  </div>
                ))
              ) : (
                <p>No hay fotos</p>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveEdits}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        dialogClassName="modal-lg"
      >
        <Modal.Header closeButton className="headerModal">
          <Modal.Title>Detalles del Hotel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewingHotel && (
            <div>
              <h3>Nombre:</h3>
              <h5>{viewingHotel.nombre}</h5>
              <h3>Direccion: </h3>
              <h5>{viewingHotel.direccion}</h5>
              <h3>Telefono: </h3>
              <h5>{viewingHotel.telefono}</h5>
              <h3>Fotos:</h3>
              <div className="text-center">
                {viewingHotel.fotos ? (
                  <div className="row">
                    {JSON.parse(viewingHotel.fotos).map((foto, index) => (
                      <div key={index}>
                        <br />
                        <img
                          src={foto}
                          alt={`Selected ${index}`}
                          className="selected-image img-fluid"
                          style={{ width: "550px", height: "350px" }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No hay fotos</p>
                )}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
