import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  obtenerHoteles,
  obtenerItinerario,
  obtenerViajes,
  eliminarViaje,
  editarViaje,
  obtenerContratos,
  obtenerCoordinador,
  getUsers,
  editarUsuario,
} from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import "../../sass/_abm_Viaje.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Pagination from "../home/Pagination";
import { reuleaux } from "ldrs";
export default function AbmViaje() {
  const dispatch = useDispatch();
  const viajes = useSelector((state) => state.viajes);
  const hoteles = useSelector((state) => state.hoteles);
  const itinerarios = useSelector((state) => state.itinerarios);
  const contratos = useSelector((state) => state.contratos);
  const coordinadores = useSelector((state) => state.coordinadores);
  const users = useSelector((state) => state.users);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingViaje, setViewingViaje] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingViaje, setEditingViaje] = useState({
    destino: "",
    contratos: [],
    salida: "",
    regreso: "",
    hotelId: "",
    scheduleId: "",
  });
  const [nuevoContratoData, setNuevoContratoData] = useState([]);
  const [contratosSeleccionados, setContratosSeleccionados] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [viajeToDelete, setViajeToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const [selectedCoordinatorId, setSelectedCoordinatorId] = useState(null);
  // const [selectedViajeContrato, setSelectedViajeContrato] = useState(null);
  const [selectedViajeContrato, setSelectedViajeContrato] = useState([]);
  useEffect(() => {
    dispatch(obtenerViajes());
    dispatch(obtenerHoteles());
    dispatch(obtenerItinerario());
    dispatch(obtenerContratos());
    dispatch(obtenerCoordinador());
    dispatch(getUsers());
    // dispatch(editarUsuario());
    console.log("coordinador", coordinadores);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [dispatch]);

  const handleEditClick = (viaje) => {
    setEditingViaje(viaje);
    setShowModal(true);
  };

  const handleDeleteClick = (viajeId) => {
    setViajeToDelete(viajeId);
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleConfirmDelete = () => {
    if (viajeToDelete) {
      dispatch(eliminarViaje(viajeToDelete.id));
      setShowConfirmationModal(false);
      setViajeToDelete(null);
      alert("Su viaje se eliminó con éxito");
    }
  };
  const handleViewClick = (viaje) => {
    setViewingViaje(viaje);
    setShowViewModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveEdits = () => {
    if (editingViaje) {
      const viajeId = editingViaje.id;
      const contratosFormateados = contratosSeleccionados.join(",");
      console.log("contratosFormateados", contratosSeleccionados.length);

      let contratosFinal = `[${contratosFormateados}]`;
      console.log("contratos", contratosFormateados.length);
      if (contratosSeleccionados.length > 0) {
        // Si hay contratos nuevos seleccionados, formatea
        const contratosFormateados = contratosSeleccionados.join(",");
        contratosFinal = `[${contratosFormateados}]`;
      } else {
        // Si no hay contratos nuevos seleccionados, enviar los contratos existentes del viaje
        contratosFinal = editingViaje.contratos;
      }

      const viajeActualizado = {
        destino: editingViaje.destino,
        contratos: contratosFinal,
        salida: editingViaje.salida,
        regreso: editingViaje.regreso,
        hotelId: editingViaje.hotelId,
        scheduleId: editingViaje.scheduleId,
      };
      dispatch(editarViaje(viajeId, viajeActualizado));
      console.log("ediciosn de viajes", viajeActualizado);
      setShowModal(false);
      alert("Cambios guardados con éxito");
      window.location.reload();
    }
  };

  const handleSaveEditsCoordinador = () => {
    if (selectedCoordinatorId) {
      console.log("usuarios", users);
      const selectedCoordinator = users.find(
        (user) => user.id.toString() === selectedCoordinatorId
      );
      console.log("selectedCoordinator:", selectedCoordinator);
      if (selectedCoordinator) {
        const updatedContracts = selectedCoordinator.contrato.concat(formatContratos(selectedViajeContrato).split(',').map((a) => { return a.replace(/^\s+|\s+$/gm,'')}));
        const updateContractsSinRepeticiones = [...new Set(updatedContracts)];
        const updatedCoordinator = {
          ...selectedCoordinator,
          contrato: updateContractsSinRepeticiones,
        };
        dispatch(editarUsuario(selectedCoordinatorId, updatedCoordinator));
        setShowUserModal(false);
        alert("Contrato agregado con éxito al coordinador");
        window.location.reload();
      }
      console.log("selectedCoordinatorId:", selectedCoordinatorId);
      console.log("selectedCoordinator:", selectedCoordinator.contrato);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditingViaje({
      ...editingViaje,
      [name]: value,
    });
  };

  const toggleContractSelection = (contractNum) => {
    if (contratosSeleccionados.includes(contractNum)) {
      setContratosSeleccionados((prevSelected) =>
        prevSelected.filter((num) => num !== contractNum)
      );
    } else {
      setContratosSeleccionados((prevSelected) => [
        ...prevSelected,
        contractNum,
      ]);
    }
  };
  const formatContratos = (contratos) => {
    // Si los contratos son un array, conviérte en una cadena con comas
    if (Array.isArray(contratos)) {
      return contratos.join(", ");
    }
    // Si los contratos son una cadena entre corchetes, elimina los corchetes
    if (
      typeof contratos === "string" &&
      contratos.startsWith("[") &&
      contratos.endsWith("]")
    ) {
      const contratoString = contratos.substring(1, contratos.length - 1);
      // Separa los contratos en un array y los úne con comas
      const contratoArray = contratoString
        .split(",")
        .map((contractNum) => contractNum.trim());
      return contratoArray.join(", ");
    }

    return "Contratos Desconocidos";
  };
  const getContractNameById = (contractNum) => {
    const selectedContract = contratos.find(
      (contract) => contract.num === contractNum
    );
    return selectedContract
      ? selectedContract.num
      : "Nombre de Contrato Desconocido";
  };

  // const filterViajes = (viajes) => {
  //   return viajes.filter((viaje) => {
  //     return viaje.destino.toLowerCase().includes(searchTerm.toLowerCase());
  //   });
  // };
  // const filterViajes = (viajes) => {
  //   const filteredViajes = viajes.filter((viaje) => {
  //     return viaje.destino.toLowerCase().includes(searchTerm.toLowerCase());
  //   });

  //   // Calcular el índice del primer elemento y del último elemento en la página actual
  //   const indexOfLastItem = currentPage * itemsPerPage;
  //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  //   // Obtener los elementos de la página actual
  //   const currentItems = filteredViajes.slice(
  //     indexOfFirstItem,
  //     indexOfLastItem
  //   );

  //   return currentItems;
  // };

  const filterViajes = (viajes) => {
    const filteredViajes = viajes.filter((viaje) => {
      const destino = viaje.destino ? viaje.destino.toLowerCase() : "";

      const contrato = viaje.contratos
        ? viaje.contratos.toString().toLowerCase()
        : "";
      console.log("contrato", contrato);

      return (
        destino.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contrato.includes(searchTerm)
      );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = filteredViajes.slice(
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
    setCurrentPage(1);
  };
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "es-ES",
      options
    );
    return formattedDate;
  };

  // const handleUserModalOpen = (viaje) => {
  //   setSelectedViajeContrato(viaje.contratos);
  //   setShowUserModal(true);
  //   setSelectedCoordinatorId(viaje.coordinadorId);
  // };
  const handleUserModalOpen = (viaje) => {
    setSelectedViajeContrato(viaje.contratos || []); // Asegurar que si viaje.contratos es null, se establezca como un array vacío
    setShowUserModal(true);
    setSelectedCoordinatorId(viaje.coordinadorId);
  };

  const handleCloseUserModal = () => {
    setShowUserModal(false);
  };
  return (
    <div className="custom-container mt-8">
      <br />

      {isLoading ? (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <div className="spinner">
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
                  placeholder="Busque el destino del viaje"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
              </div>
            </form>
          </div>
          <br />
          <br />
          <br />
          <h2 className="text-center encabezadoLista">Lista de Viajes</h2>
          <div className="botonCrear">
            <Link
              to="/gestion/FormularioViaje"
              className="btn btn-primary botonCrearLink"
              title="Agregar Viaje"
            >
              <lord-icon
                src="https://cdn.lordicon.com/ftndcppj.json"
                trigger="hover"
                colors="primary:#1b1091,secondary:#e4e4e4"
                style={{ width: "1.5rem", height: "1.5rem" }}
              ></lord-icon>
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered  tablaViaje">
              <thead className="text-center cabecerasDeTabla">
                <tr>
                  <th>Destino</th>
                  <th>Salida</th>
                  <th>Regreso</th>
                  <th>Estado del viaje</th>
                  <th>Hotel</th>
                  <th>Contratos</th>
                  <th>Itinerario</th>
                  <th>Coordinador</th>

                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody className="text-center cuerpoTabla">
                {filterViajes(viajes).map((viaje) => (
                  <tr key={viaje.id}>
                    <td>{viaje.destino}</td>
                    <td>{formatDate(viaje.salida)}</td>
                    <td>{formatDate(viaje.regreso)}</td>
                    <td>
                      {viaje.inicioViaje === false
                        ? "No comenzo el viaje"
                        : viaje.finViaje === false
                        ? "En progreso"
                        : "Viaje terminado"}
                    </td>
                    <td>
                      {hoteles.map((hotel) =>
                        hotel.id === viaje.hotelId ? (
                          <div key={hotel.id}>
                            <p>{hotel.nombre}</p>
                            {/* <p>Dirección: {hotel.direccion}</p> */}
                          </div>
                        ) : null
                      )}
                    </td>
                    <td>{formatContratos(viaje.contratos)}</td>
                    <td>
                      {itinerarios.map((itinerario) =>
                        itinerario.id === viaje.scheduleId ? (
                          <div key={itinerario.id}>
                            <p> {itinerario.nombre}</p>
                          </div>
                        ) : null
                      )}
                    </td>
                    {/* <td>
                      {coordinadores?.map((cordinador) => cordinador.contrato)}
                      {coordinadores
                        .filter(
                          (coordinador) =>
                            formatContratos(coordinador.contrato) ===
                            formatContratos(viaje.contratos)
                        )
                        ?.map((coordinador) => coordinador.nombre)
                        .join(", ")}
                    </td> */}
                    <td>
                      {coordinadores
                        .filter((coordinador) =>
                          coordinador.contrato.some((contract) =>
                            viaje.contratos.includes(contract)
                          )
                        )
                        .map((coordinador) => coordinador.nombre)
                        .join(", ")}
                    </td>
                    <td>
                      <button
                        className="btn btn-primary botonEditar"
                        onClick={() => handleEditClick(viaje)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/zfzufhzk.json"
                          trigger="hover"
                          style={{ width: "15px", height: "15px" }}
                        ></lord-icon>
                      </button>
                      <button
                        className="btn btn-danger botonEliminar"
                        onClick={() => handleDeleteClick(viaje)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/xekbkxul.json"
                          trigger="hover"
                          style={{ width: "15px", height: "15px" }}
                        ></lord-icon>
                      </button>
                      <button
                        className="btn btn-info botonEditar"
                        onClick={() => handleViewClick(viaje)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/ascijbjj.json"
                          trigger="hover"
                          style={{ width: "15px", height: "15px" }}
                        ></lord-icon>
                      </button>

                      <Button
                        onClick={() => {
                          handleUserModalOpen(viaje);
                          // Guardar el contrato seleccionado al abrir el modal
                        }}
                      >
                        Seleccionar Coordinador
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br />
          <div className="pagination  d-flex justify-content-center align-items-center">
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={viajes.length}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
            <p className="mx-2 textoItemsViaje ">
              Cantidad de viajes por pagina:
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
      <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Viaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viajeToDelete && (
            <p>
              ¿Está seguro que desea eliminar el viaje{" "}
              <strong>{viajeToDelete.nombre}</strong>?
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
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="modal-xl"
      >
        <Modal.Header closeButton className="modealHeaderViaje">
          <Modal.Title>Editar Viaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5>Destino:</h5>
            <input
              className="form-control mb-3"
              type="text"
              name="destino"
              placeholder="Destino"
              value={editingViaje ? editingViaje.destino : ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <h5>Salida:</h5>
            <input
              className="form-control mb-3"
              type="date"
              name="salida"
              placeholder="AAAA-MM-DD"
              value={editingViaje ? editingViaje.salida : ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <h5>Regreso:</h5>
            <input
              className="form-control mb-3"
              type="date"
              name="regreso"
              placeholder="AAAA-MM-DD"
              value={editingViaje ? editingViaje.regreso : ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <h5>Selecciona un Hotel:</h5>
            <select
              className="form-select mb-3"
              name="hotelId"
              value={editingViaje ? editingViaje.hotelId : ""}
              onChange={handleInputChange}
            >
              <option value="">-- Selecciona una opción --</option>
              {hoteles.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.nombre} {hotel.direccion}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h5>Selecciona un Itinerario:</h5>
            <select
              className="form-select mb-3"
              name="scheduleId"
              value={editingViaje ? editingViaje.scheduleId : ""}
              onChange={handleInputChange}
            >
              <option value="">-- Selecciona una opción --</option>
              {itinerarios.map((itinerario) => (
                <option key={itinerario.id} value={itinerario.id}>
                  {itinerario.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h5>Selecciona Contratos:</h5>
            <select
              className="form-control"
              id="contrato"
              name="contratos"
              value={nuevoContratoData}
              required
              multiple
              onChange={(e) =>
                setNuevoContratoData(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
            >
              <option value="">Elije los contratos:</option>
              {contratos.map((contrato) => (
                <option
                  key={contrato.id}
                  value={contrato.num}
                  onClick={() => toggleContractSelection(contrato.num)}
                  className={
                    contratosSeleccionados.includes(contrato.num)
                      ? "selected"
                      : ""
                  }
                >
                  - Contrato {contrato.num}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h5>Contratos Seleccionados</h5>
            <ul>
              {contratosSeleccionados.map((contractNum) => (
                <li key={contractNum}>{getContractNameById(contractNum)}</li>
              ))}
            </ul>

            {/* <h5>{formatContratos(viewingViaje.contratos)}</h5> */}
            <h5>{formatContratos(editingViaje.contratos)}</h5>
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
          <Modal.Title>Detalles del Viaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewingViaje && (
            <div>
              <h3>Destino: </h3>
              <h5>{viewingViaje.destino}</h5>
              <h3>Salida: </h3>
              <h5>{viewingViaje.salida}</h5>
              <h3>Regreso: </h3>
              <h5>{viewingViaje.regreso}</h5>
              <h3>Hotel: </h3>
              <h5>
                {" "}
                {hoteles.find((hotel) => hotel.id === viewingViaje.hotelId)
                  ?.nombre || "Hotel Desconocido"}
              </h5>
              <h3> Itinerario:</h3>
              <h6>
                {itinerarios.find(
                  (itinerario) => itinerario.id === viewingViaje.scheduleId
                )?.nombre || "Itinerario Desconocido"}{" "}
                <br />
                {itinerarios.find(
                  (itinerario) => itinerario.id === viewingViaje.scheduleId
                )?.texto_gral ? (
                  <span>
                    {JSON.parse(
                      itinerarios.find(
                        (itinerario) =>
                          itinerario.id === viewingViaje.scheduleId
                      )?.texto_gral
                    ).map((comentario, index) => (
                      <span key={index}>
                        Titulo: {comentario.titulo} <br /> Descripcion:{" "}
                        {comentario.descripcion} <br />
                      </span>
                    ))}
                  </span>
                ) : (
                  "Itinerario Desconocido"
                )}
              </h6>

              <h3>Contratos: </h3>
              <h5>{formatContratos(viewingViaje.contratos)}</h5>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        {/* Botón para abrir el modal */}

        {/* Modal para seleccionar usuario */}
        <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Seleccionar Usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Select para mostrar usuarios */}
            <select
              className="form-select"
              onChange={(e) => setSelectedCoordinatorId(e.target.value)}
            >
              <option value="">-- Seleccione un Coordinador --</option>
              {console.log("selectedCoordinatorId:", selectedCoordinatorId)}

              {users
                .filter((user) => user.rol === "Coordinador")
                .map((user) => (
                  <option key={user.id} value={user.id}>
                    {`${user.nombre} ${user.contrato
                      .join(", ")
                      .replace(/\[|\]/g, "")}`}
                  </option>
                ))}
              {/* {users
                .filter((user) => user.rol === "Coordinador")
                .map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.nombre + " " + " " + user.contrato}
                  </option>
                ))} */}
              {/* {coordinadores.map((coordinador) => (
                <option key={coordinador.id} value={coordinador.id}>
                  {coordinador.nombre + " " + coordinador.contrato}
                </option>
              ))} */}
            </select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUserModal}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleSaveEditsCoordinador}>
              Seleccionar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
