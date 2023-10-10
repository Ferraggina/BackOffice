import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerHoteles,
  deleteHotel,
  editHotel,
} from "../../redux/actions/actions";

export default function AbmHotel() {
  const dispatch = useDispatch();
  const hoteles = useSelector((state) => state.hoteles);
  const [showModal, setShowModal] = useState(false);

  const [editingHotel, setEditingHotel] = useState({
    nombre: "",
    direccion: "",
    fotos: [],
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
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveEdits = () => {
    if (editingHotel) {
      const hotelId = editingHotel.id;
      const hotelActualizado = {
        nombre: editingHotel.nombre,
        direccion: editingHotel.direccion,
        fotos: editingHotel.fotos,
        videos: editingHotel.videos,
      };

      dispatch(editHotel(hotelId, hotelActualizado));
      setShowModal(false);
      alert("Cambios guardados con éxito");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingHotel({
      ...editingHotel,
      [name]: value,
    });
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    if (files && files.length > 0) {
      setEditingHotel({
        ...editingHotel,
        fotos: files,
      });
    }
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
            {/* <label>Añadir Fotos</label>
            <br />
            <input
              type="file"
              className="form-control-file"
              multiple
              onChange={handleFileInputChange}
            />
          </div>
         
          <div className="selected-files">
            <h4>Fotos Seleccionadas:</h4>
            <ul>
              {editingHotel.fotos.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul> */}
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
