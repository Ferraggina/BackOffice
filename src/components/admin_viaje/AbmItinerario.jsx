import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerItinerario,
  editItinerario,
  eliminarItinerario,
  obtenerPasajero,
} from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import "../../sass/_itinerario.scss";
import { reuleaux } from "ldrs";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../components/home/Pagination.jsx";
export default function ItinerarioVisualizacion() {
  const dispatch = useDispatch();
  const itinerarios = useSelector((state) => state.itinerarios);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [camposExtras, setCamposExtras] = useState([
    { titulo: "", descripcion: "" },
  ]);
  const [viewingItinerario, setViewingItinerario] = useState(null);
  // const [editingItinerario, setEditingItinerario] = useState({
  //   nombre: "",
  //   texto_gral: JSON.stringify(camposExtras),
  // });
  const [editingItinerario, setEditingItinerario] = useState({
    nombre: "",
    texto_gral: JSON.stringify([{ titulo: "", descripcion: [""] }]),
  });
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [itinerarioToDelete, setItinerarioToDelete] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  useEffect(() => {
    dispatch(obtenerItinerario());
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [dispatch]);
  const filterItinerarios = (itinerarios) => {
    const filteredItinerarios = itinerarios.filter((itinerario) => {
      return itinerario.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = filteredItinerarios.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    return currentItems;
  };
  const handleSaveEdits = () => {
    if (editingItinerario) {
      const itinerarioId = editingItinerario.id;

      const itinerarioActualizado = {
        nombre: editingItinerario.nombre,
        texto_gral: editingItinerario.texto_gral,
      };
      dispatch(editItinerario(itinerarioId, itinerarioActualizado));
      setShowModal(false);
      alert("Cambios guardados con éxito");
      window.location.reload();
    }
  };
  const handleEditClick = (itinerario) => {
    setEditingItinerario(itinerario);
    setShowModal(true);
    console.log("ACA EDIT", editingItinerario.texto_gral);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingItinerario({
      ...editingItinerario,
      [name]: value,
    });
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleViewClick = (itinerario) => {
    setViewingItinerario(itinerario);
    setShowViewModal(true);
  };
  const handleDeleteClick = (itinerarioId) => {
    setItinerarioToDelete(itinerarioId);
    setShowConfirmationModal(true);
  };
  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleConfirmDelete = () => {
    if (itinerarioToDelete) {
      dispatch(eliminarItinerario(itinerarioToDelete.id));
      setShowConfirmationModal(false);
      setItinerarioToDelete(null);
      alert("Su viaje se eliminó con éxito");
      window.location.reload();
    }
  };

  const handleEditCampoExtraChange = (index, field, value) => {
    const newCamposExtras = JSON.parse(editingItinerario.texto_gral); // Parseas la cadena JSON a un objeto
    newCamposExtras[index][field] = value; // Modificas el objeto
    const updatedJSON = JSON.stringify(newCamposExtras);
    setEditingItinerario({
      ...editingItinerario,
      texto_gral: updatedJSON,
    });
    console.log("edicion", editItinerario);
  };
  // const handleEditCampoExtraChange = (index, field, value) => {
  //   setEditingItinerario((prevEditingItinerario) => {
  //     const newDescripciones = [...prevEditingItinerario.descripciones];
  //     newDescripciones[index][field] = value;

  //     return {
  //       ...prevEditingItinerario,
  //       descripciones: newDescripciones,
  //     };
  //   });
  // };
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };
  return (
    <div className="custom-container mt-8">
      <br />

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
        <div className="cardViajes">
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
                  placeholder="Busque el nombre del Itinerario"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
              </div>
            </form>
          </div>
          <br />
          <br />
          <h1 className="text-center encabezadoLista">
            Visualización de Itinerarios
          </h1>
          <div className="botonCrear">
            <Link
              to="/gestion/CrearItinerario"
              className="btn btn-primary botonCrearLink"
              title="Agregar Itinerario"
            >
              <lord-icon
                src="https://cdn.lordicon.com/ftndcppj.json"
                trigger="hover"
                colors="primary:#1b1091,secondary:#e4e4e4"
                style={{ width: "1.5rem", height: "1.5rem" }}
              ></lord-icon>
            </Link>
          </div>

          <div className="row justify-content-center   ">
            <div className="table-responsive">
              {/* Tabla de visualización */}

              <table className="table  table-bordered  tablaViaje">
                <thead className="text-center cabecerasDeTabla">
                  <tr>
                    <th>Nombre</th>
                    <th>Id Itinerario</th>
                    <th>Texto General</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody className="text-center cuerpoTabla">
                  {filterItinerarios(itinerarios).map((itinerario) => (
                    <tr key={itinerario.id}>
                      {/* <td>{JSON.stringify(itinerario.nombre)}</td>
                      <td>{JSON.stringify(itinerario.texto_gral)}</td> */}
                      <td>{itinerario.nombre}</td>
                      <td>{itinerario.id}</td>
                      <td>
                        {JSON.parse(itinerario.texto_gral)[0] && (
                          <div>
                            <p>
                              Titulo:{" "}
                              {JSON.parse(itinerario.texto_gral)[0].titulo}
                            </p>
                            <p>
                              Descripción:{" "}
                              {JSON.parse(itinerario.texto_gral)[0]
                                .descripcion &&
                                JSON.parse(
                                  itinerario.texto_gral
                                )[0].descripcion.slice(0, 15)}
                              ...
                            </p>
                          </div>
                        )}
                      </td>
                      <td className="txtGral">
                        <button
                          className="btn btn-primary botonEditar"
                          onClick={() => handleEditClick(itinerario)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/zfzufhzk.json"
                            trigger="hover"
                            style={{ width: "15px", height: "15px" }}
                          ></lord-icon>
                        </button>
                        <button
                          className="btn btn-danger botonEliminar"
                          onClick={() => handleDeleteClick(itinerario)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/xekbkxul.json"
                            trigger="hover"
                            style={{ width: "15px", height: "15px" }}
                          ></lord-icon>
                        </button>
                        <button
                          className="btn btn-info botonEditar"
                          onClick={() => handleViewClick(itinerario)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/ascijbjj.json"
                            trigger="hover"
                            style={{ width: "15px", height: "15px" }}
                          ></lord-icon>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="pagination  d-flex justify-content-center align-items-center">
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={itinerarios.length}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
            <p className="mx-2 textoItemsViaje ">
              Cantidad de itinerarios por pagina:
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
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="modal-xl"
      >
        <Modal.Header closeButton className="modealHeaderViaje">
          <Modal.Title>Editar Itinerario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5>Nombre:</h5>
            <input
              className="form-control mb-3"
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={editingItinerario ? editingItinerario.nombre : ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <h5>Texto General:</h5>
            {JSON.parse(editingItinerario.texto_gral).map((campo, index) => (
              <div key={index}>
                <label>Titulo de la actividad {index + 1}</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ejemplo: Desayuno buffet"
                  value={campo.titulo}
                  onChange={(e) =>
                    handleEditCampoExtraChange(index, "titulo", e.target.value)
                  }
                />
                <br />
                <label>Descripcion de la actividad {index + 1}</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="De 9:45 hs a 12:00 hs"
                  value={campo.descripcion}
                  onChange={(e) =>
                    handleEditCampoExtraChange(
                      index,
                      "descripcion",
                      e.target.value
                    )
                  }
                />
                <br />
              </div>
            ))}
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
        dialogClassName="modal-xl"
      >
        <Modal.Header closeButton className="modealHeaderViaje">
          <Modal.Title>Detalles del Itinerario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewingItinerario && (
            <div>
              <h6>
                {itinerarios.find(
                  (itinerario) => itinerario.id === viewingItinerario.id
                )?.nombre || "Itinerario Desconocido"}{" "}
                <br />
                {itinerarios.find(
                  (itinerario) => itinerario.id === viewingItinerario.id
                )?.texto_gral ? (
                  <span>
                    {JSON.parse(
                      itinerarios.find(
                        (itinerario) => itinerario.id === viewingItinerario.id
                      )?.texto_gral
                    ).map((comentario, index) => (
                      <span key={index}>
                        <br />
                        <div className="modalLetrasItinerario">
                          {" "}
                          <br />
                          {comentario.titulo}{" "}
                        </div>
                        <p className="modalLetrasItinerario">Descripcion:</p>{" "}
                        {comentario.descripcion}
                      </span>
                    ))}
                  </span>
                ) : (
                  "Itinerario Desconocido"
                )}
              </h6>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Viaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {itinerarioToDelete && (
            <p>
              ¿Está seguro que desea eliminar el Itinerario{" "}
              <strong>{itinerarioToDelete.nombre}</strong>?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmationModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
