import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLanding,
  addLanding,
  updateLanding,
  deleteLanding,
} from "../../redux/actions/actions";
import { Modal, Button } from "react-bootstrap";
export default function AbmImagenesLandin() {
  const dispatch = useDispatch();
  const landingData = useSelector((state) => state.landingData);
  const [showModal, setShowModal] = useState(false);
  // Estados locales para gestionar formularios y ediciones
  const [formData, setFormData] = useState({
    imagen: "",
    folleto: "",
    activo: true,
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Cargar datos de la landing al cargar el componente
    console.log("aca landing ! ", getLanding());
    dispatch(getLanding());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Actualizar imagen existente
      dispatch(updateLanding(editingId, formData));
      setEditingId(null);
    } else {
      // Agregar nueva imagen
      dispatch(addLanding(formData));
    }
    // Limpiar el formulario
    setFormData({
      imagen: "",
      folleto: "",
      activo: true,
    });
  };

  const handleEdit = (id) => {
    // Preparar los datos para la edición
    const editingImage = landingData.find((image) => image.id === id);
    setFormData({
      imagen: editingImage.imagen,
      folleto: editingImage.folleto,
      activo: editingImage.activo,
    });
    setEditingId(id);
  };
  const handleEditClick = (id) => {
    setEditingId(id);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteLanding(id));
  };

  return (
    <div>
      <h2>Administrar Imágenes de Landing</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Imagen URL"
          value={formData.imagen}
          onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
        />
        <input
          type="text"
          placeholder="Folleto URL"
          value={formData.folleto}
          onChange={(e) =>
            setFormData({ ...formData, folleto: e.target.value })
          }
        />
        <button type="submit">Guardar</button>
      </form>
      <ul>
        {landingData.map((image) => (
          <li key={image.id}>
            <div className="col-6 col-md-4">
              {" "}
              {/* Ajusta las clases de Bootstrap según tus necesidades */}
              <img src={image.imagen} alt={image.id} className="img-fluid" />
            </div>
            <button onClick={() => handleEdit(image.id)}>Editar</button>
            <button onClick={() => handleDelete(image.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
