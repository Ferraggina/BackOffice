import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerHoteles,
  deleteHotel,
  editHotel,
  uploadImage,
} from "../../redux/actions/actions";

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

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState(null);

  useEffect(() => {
    dispatch(obtenerHoteles());
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

  // const handleSaveEdits = () => {
  //   if (editingHotel) {
  //     const hotelId = editingHotel.id;
  //     const hotelActualizado = {
  //       nombre: editingHotel.nombre,
  //       direccion: editingHotel.direccion,
  //       fotos: editingHotel.fotos,
  //       videos: editingHotel.videos,
  //     };

  //     dispatch(editHotel(hotelId, hotelActualizado));
  //     setShowModal(false);
  //     alert("Cambios guardados con éxito");
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingHotel({
      ...editingHotel,
      [name]: value,
    });
  };
  // const handleRemoveImage = (index) => {
  //   const updatedImageUrls = [...imageUrls];
  //   updatedImageUrls.splice(index, 1);
  //   setImageUrls(updatedImageUrls);

  //   const updatedImages = [...editingHotel.fotos];
  //   updatedImages.splice(index, 1);

  //   setEditingHotel({
  //     ...editingHotel,
  //     fotos: updatedImages,
  //   });
  // };
  const handleSaveEdits = () => {
    // if (editingHotel) {
    //   const hotelId = editingHotel.id;
    //   const fotosEnvio = JSON.stringify(selectedImages);
    //   // Enviar imágenes al backend (implementa esto)
    //   // Tu API debe esperar un array de imágenes (puedes usar FormData)

    //   const hotelActualizado = {
    //     nombre: editingHotel.nombre,
    //     direccion: editingHotel.direccion,
    //     fotos: fotosEnvio, // Debería ser una matriz de archivos de imagen
    //     videos: editingHotel.videos,
    //   };

    //   dispatch(editHotel(hotelId, hotelActualizado));
    //   setShowModal(false);
    //   alert("Cambios guardados con éxito");

    //   // Limpiar las URLs de imágenes después de guardar
    //   setImageUrls([]);
    // }
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

  // const handleFileInputChange = (e) => {
  //   const files = Array.from(e.target.files);

  //   if (files.length > 0) {
  //     const urls = files.map((file) => URL.createObjectURL(file));
  //     setImageUrls(urls);

  //     setEditingHotel({
  //       ...editingHotel,
  //       fotos: files,
  //     });
  //   }
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
  const handleRemoveExistingImage = (index) => {
    const currentFotos = JSON.parse(editingHotel.fotos);
    currentFotos.splice(index, 1);

    setEditingHotel({
      ...editingHotel,
      fotos: JSON.stringify(currentFotos), // Convertir de nuevo a cadena JSON
    });
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Hoteles</h2>

      <br />
      {hoteles.length ? (
        hoteles.map((hotel) => (
          <div key={hotel.id} className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Nombre</h5>
              <p className="card-text">{hotel.nombre}</p>
              <h5 className="card-title">Dirección</h5>
              <p className="card-text">{hotel.direccion}</p>
              {/* Agregar visualización de fotos y videos si es necesario */}
              <p>Fotos</p>
              {console.log("ACA HOTELES", hotel)}
              <div className="images-container">
                {JSON.parse(hotel.fotos)?.map((foto, index) => (
                  <img
                    key={index}
                    src={foto}
                    alt={`Imagen ${index}`}
                    className="hotel-image"
                  />
                ))}
              </div>

              <button
                className="btn btn-primary"
                onClick={() => handleEditClick(hotel)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteClick(hotel)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No hay hoteles disponibles.</p>
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

      {/* Modal de Edición */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Hotel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Campos de edición */}
          Nombre:
          <input
            className="form-control mb-3"
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={editingHotel ? editingHotel.nombre : ""}
            onChange={handleInputChange}
          />
          Dirección:
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
                  />
                  <button
                    className="btn btn-danger remove-image"
                    onClick={() => removeSelectedImage(index)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}

            <div className="selected-files">
              <h4>Fotos Seleccionadas:</h4>
              {editingHotel.fotos ? (
                JSON.parse(editingHotel.fotos).map((foto, index) => (
                  <div key={index} className="selected-image-item">
                    <img
                      src={foto}
                      alt={`Selected ${index}`}
                      className="selected-image"
                    />
                    <button
                      className="btn btn-danger remove-image"
                      onClick={() => handleRemoveExistingImage(index)}
                    >
                      Eliminar
                    </button>
                  </div>
                ))
              ) : (
                <p>No hay fotos</p>
              )}
              {console.log("editing fotos", editingHotel.fotos)}
            </div>
          </div>
          {/* Agregar visualización de videos si es necesario */}
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
    </div>
  );
}
