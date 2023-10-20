import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLandingText,
  addLandingText,
  updateLandingText,
  deleteLandingText,
} from "../../redux/actions/actions";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../../sass/_abm_Viaje.scss";

export default function AbmTexto() {
  const dispatch = useDispatch();
  const landingDataText = useSelector((state) => state.landingDataText);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    texto: "",
    activo: true,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(getLandingText());
  }, [dispatch]);

  const handleEditText = (id) => {
    const editingText = landingDataText.find((text) => text.id === id);
    setFormData({
      texto: editingText.texto,
      activo: editingText.activo,
    });
    setEditingId(id);
    setShowModal(true);
  };

  const handleSaveEdits = () => {
    if (editingId) {
      dispatch(updateLandingText(editingId, formData));
      setEditingId(null);
      setShowModal(false);
      alert("Cambios guardados con éxito");
    }
    window.location.reload();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleDeleteText = (id) => {
    dispatch(deleteLandingText(id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      handleSaveEdits();
    } else {
      if (formData.texto.trim() !== "") {
        dispatch(
          addLandingText({
            ...formData,
            texto: formData.texto,
            activo: formData.activo,
          })
        );
        setFormData({
          texto: "",
          activo: true,
        });
        setShowModal(false);
      } else {
        alert("El campo de texto no puede estar vacío.");
      }
    }
    console.log("ESTOY FUNCIONANDO");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center encabezadoLista">Administrar Textos</h2>
      {/* <div className="search-field d-none d-md-block">
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
              className="input-md bg-transparent searchabar"
              placeholder="Buscar Textos"
            />
          </div>
        </form>
      </div> */}{" "}
      <br />
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-primary botonEditar"
          onClick={() => {
            setFormData({ texto: "", activo: true });
            setShowModal(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} /> Agregar Texto
        </button>
      </div>
      <ul className="list-unstyled">
        {landingDataText.map((text) => (
          <li key={text.id} className="card mb-4 cardTextos">
            <div className="card-body">
              <p>{text.texto}</p>
              <p>{text.activo ? "Activo" : "Inactivo"}</p>
              <button
                className="btn btn-primary botonEditar"
                onClick={() => handleEditText(text.id)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger botonEliminar"
                onClick={() => handleDeleteText(text.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingId ? "Editar Texto" : "Crear Texto"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label>Texto:</label>
              <textarea
                className="form-control"
                placeholder="Texto"
                value={formData.texto}
                onChange={(e) =>
                  setFormData({ ...formData, texto: e.target.value })
                }
                required
                maxLength={50}
              />
            </div>
            <div className="mb-3">
              <label>Activo:</label>
              <input
                type="checkbox"
                checked={formData.activo}
                onChange={(e) =>
                  setFormData({ ...formData, activo: e.target.checked })
                }
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Cerrar
          </button>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            {editingId ? "Guardar Cambios" : "Crear Texto"}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
