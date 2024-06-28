import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerMedioDePago,
  editMedioDePago,
  eliminarMedioDePago,
  obtenerPasajero,
} from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import "../../sass/_itinerario.scss";
import { reuleaux } from "ldrs";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../components/home/Pagination.jsx";
export default function MedioDePagoVisualizacion() {
  const dispatch = useDispatch();
  const mediosDePago = useSelector((state) => state.mediosDePago);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewingMedioDePago, setViewingMedioDePago] = useState(null);
  const [editingMedioDePago, setEditingMedioDePago] = useState({
    id: 0,
    nombre:"",
    texto_gral: [{"medio_de_pago":"","cuotas":"","importe":0,"disponible":true}],
  });
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [medioDePagoToDelete, setMedioDePagoToDelete] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  useEffect(() => {
    dispatch(obtenerMedioDePago());
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [dispatch]);
  const filterMediosDePago = (mediosDePago) => {
    const filteredMediosDePago = mediosDePago.filter((medioDePago) => {
      return medioDePago.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Calcular el índice del primer elemento y del último elemento en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Obtener los elementos de la página actual
    const currentItems = filteredMediosDePago.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    return currentItems;
  };
  const handleSaveEdits = () => {
    if (editingMedioDePago) {
      const medioDePagoId = editingMedioDePago.id;

      const medioDePagoActualizado = {
        nombre: editingMedioDePago.nombre,
        texto_gral: editingMedioDePago.texto_gral,
      };
      dispatch(editMedioDePago(medioDePagoId, medioDePagoActualizado));
      setShowModal(false);
      alert("Cambios guardados con éxito");
      window.location.reload();
    }
  };
  const handleEditClick = (medioDePago) => {
    setEditingMedioDePago(medioDePago);
    setShowModal(true);
    console.log("ACA EDIT", editingMedioDePago.texto_gral);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingMedioDePago({
      ...editingMedioDePago,
      [name]: value,
    });
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleViewClick = (medioDePago) => {
    setViewingMedioDePago(medioDePago);
    setShowViewModal(true);
  };
  const handleDeleteClick = (medioDePagoId) => {
    setMedioDePagoToDelete(medioDePagoId);
    setShowConfirmationModal(true);
  };
  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleConfirmDelete = () => {
    if (medioDePagoToDelete) {
      dispatch(eliminarMedioDePago(medioDePagoToDelete.id));
      setShowConfirmationModal(false);
      setMedioDePagoToDelete(null);
      alert("Su medio de pago se eliminó con éxito");
      window.location.reload();
    }
  };

  const handleEditCampoExtraChange = (index, field, value) => {
    if (field === "medio_de_pago" && index > 2) {
      editingMedioDePago.texto_gral[index][field] = value;
    } else if (field === "cuotas" && index > 2) {
      if (value >= 0) {
        editingMedioDePago.texto_gral[index][field] = Number(value);
      } else if ( value === "*") {
        editingMedioDePago.texto_gral[index][field] = value;
      }
    } else if (field === "importe") {
      if (value >= 0) {
        editingMedioDePago.texto_gral[index][field] = Number(value);
      }
    } else if (field === "disponible") { // para este no uso el value, si no que me fijo si esta checkeado o no
      editingMedioDePago.texto_gral[index][field] = (document.getElementById('checkbox-mdp').checked);
    }
    setEditingMedioDePago({
      ...editingMedioDePago,
    });
    console.log("edicion", editMedioDePago);
  };
  // const handleEditCampoExtraChange = (index, field, value) => {
  //   setEditingMedioDePago((prevEditingMedioDePago) => {
  //     const newDescripciones = [...prevEditingMedioDePago.descripciones];
  //     newDescripciones[index][field] = value;

  //     return {
  //       ...prevEditingMedioDePago,
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
    setCurrentPage(1); // Reiniciar a la primera página cuando cambie la cantidad de elementos por página
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
                  placeholder="Busque el nombre del Medio de Pago"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
              </div>
            </form>
          </div>
          <br />
          <br />
          <h1 className="text-center encabezadoLista">
            Visualización de Medios de Pago
          </h1>
          <div className="botonCrear">
            <Link
              to="/gestion/CrearMedioDePago"
              className="btn btn-primary botonCrearLink"
              title="Agregar Medio de Pago"
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
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Texto General</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody className="text-center cuerpoTabla">
                  {filterMediosDePago(mediosDePago).map((medioDePago) => (
                    <tr key={medioDePago.id}>
                      <td>{medioDePago.id}</td>
                      <td>{medioDePago.nombre}</td>
                      <td>
                        {medioDePago.texto_gral[0] && (
                          <div>
                            <p>
                              Medio de pago:{" "}
                              {medioDePago.texto_gral[0].medio_de_pago}
                            </p>
                            <p>
                              Importe:{" "}
                              {medioDePago.texto_gral[0].importe}
                            </p>
                          </div>
                        )}
                      </td>
                      <td className="txtGral">
                        <button
                          className="btn btn-primary botonEditar"
                          onClick={() => handleEditClick(medioDePago)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/zfzufhzk.json"
                            trigger="hover"
                            style={{ width: "15px", height: "15px" }}
                          ></lord-icon>
                        </button>
                        <button
                          className="btn btn-danger botonEliminar"
                          onClick={() => handleDeleteClick(medioDePago)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/xekbkxul.json"
                            trigger="hover"
                            style={{ width: "15px", height: "15px" }}
                          ></lord-icon>
                        </button>
                        <button
                          className="btn btn-info botonEditar"
                          onClick={() => handleViewClick(medioDePago)}
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
              totalItems={mediosDePago.length}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
            <p className="mx-2 textoItemsViaje ">
              Cantidad de Medios de Pago por pagina:
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
          <Modal.Title>Editar Medio de Pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5>Nombre:</h5>
            <input
              className="form-control mb-3"
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={editingMedioDePago ? editingMedioDePago.nombre : ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <h5>Texto General:</h5>
            {(editingMedioDePago.texto_gral).map((campo, index) => (
              <div key={index}>
                <h6> Datos del Medio de Pago {index + 1}: </h6>
                <br/>
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ejemplo: Contado"
                  value={campo.medio_de_pago}
                  onChange={(e) =>
                    handleEditCampoExtraChange(index, "medio_de_pago", e.target.value)
                  }
                />
                <br />
                <label>Cuotas</label>
                <select
                  className="form-control"
                  value={campo.cuotas}
                  onChange={(e) =>
                    handleEditCampoExtraChange(
                      index,
                      "cuotas",
                      e.target.value
                    )
                  }
                  min="0"
                >
                  <option value="*">Todas</option>
                  <option value="1">1</option>
                  <option value="3">3</option>
                  <option value="6">6</option>
                  <option value="9">9</option>
                  <option value="12">12</option>
                </select>
                <br />
                <label>Importe</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="De 9:45 hs a 12:00 hs"
                  value={campo.importe}
                  onChange={(e) =>
                    handleEditCampoExtraChange(
                      index,
                      "importe",
                      e.target.value
                    )
                  }
                />
                <br />
                <label>Disponibilidad</label>
                <br/>
                <input
                  type="checkbox"
                  className="form-checkbox"
                  value={campo.disponible}
                  onChange={(e) =>
                    handleEditCampoExtraChange(
                      index,
                      "disponible",
                      e.target.value
                    )
                  }
                />
                <br />
                <hr/>
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
          <Modal.Title>Detalles del Medio de Pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewingMedioDePago && (
            <div>
              <h6>
                {mediosDePago.find((medioDePago) => medioDePago.id === viewingMedioDePago.id)?.nombre || "Medio de Pago Desconocido"}{" "}
                <br />
                {mediosDePago.find(
                  (medioDePago) => medioDePago.id === viewingMedioDePago.id
                )?.texto_gral ? (
                  <span>
                    <hr/>
                    <h5>Datos de la Financiacion:</h5>
                    <table className="table  table-bordered">
                      <thead className="text-center">
                        <tr>
                          <th>Medio de Pago</th>
                          <th>Cuotas</th>
                          <th>Importe</th>
                          <th>Disponibilidad</th>
                        </tr>
                      </thead>
                      <tbody className="text-center cuerpoTabla">

                        {mediosDePago.find((medioDePago) => medioDePago.id === viewingMedioDePago.id)?.texto_gral.map((mdp, index) => (
                          <tr key={index}>
                            <td>{mdp.medio_de_pago}</td>
                            <td>{mdp.cuotas ? mdp.cuotas : " - "}</td>
                            <td>${mdp.importe}</td>
                            <td>{mdp.disponible ? "Activo" : "Inactivo"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </span>
                ) : (
                  "Medio de Pago Desconocido"
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
          <Modal.Title>Eliminar Medio de Pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {medioDePagoToDelete && (
            <p>
              ¿Está seguro que desea eliminar el Medio de Pago{" "}
              <strong>{medioDePagoToDelete.nombre}</strong>?
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
