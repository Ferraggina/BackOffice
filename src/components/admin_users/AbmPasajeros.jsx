import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerPasajero } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import "../../sass/_itinerario.scss";
import { reuleaux } from "ldrs";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../components/home/Pagination.jsx";

export default function AbmPasajeros() {
  const dispatch = useDispatch();
  const pasajeros = useSelector((state) => state.pasajeros);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);

  const [viewingPasajero, setViewingPasajero] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    dispatch(obtenerPasajero());
    console.log(pasajeros);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  // const filterPasajeros = (pasajeros) => {
  //   const filteredPasajero = pasajeros.filter((pasajero) => {
  //     return (
  //       pasajero.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       pasajero.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       pasajero.dni.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   });

  //   // Calcular el índice del primer elemento y del último elemento en la página actual
  //   const indexOfLastItem = currentPage * itemsPerPage;
  //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  //   // Obtener los elementos de la página actual
  //   const currentItems = filteredPasajero.slice(
  //     indexOfFirstItem,
  //     indexOfLastItem
  //   );

  //   return currentItems;
  // };

  const filterPasajeros = (pasajeros) => {
    const filteredPasajero = pasajeros.filter((pasajero) => {
      const nombre = pasajero.nombre ? pasajero.nombre.toLowerCase() : "";
      const apellido = pasajero.apellido ? pasajero.apellido.toLowerCase() : "";
      const dni = pasajero.dni ? pasajero.dni.toLowerCase() : "";
      const contrato = pasajero.contratos
        ? pasajero.contratos.toString().toLowerCase()
        : "";
      console.log("contrato", contrato);

      return (
        nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contrato.includes(searchTerm) ||
        dni.includes(searchTerm)
      );
    });

    // Calcular el índice del primer elemento y del último elemento en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Obtener los elementos de la página actual
    const currentItems = filteredPasajero.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    return currentItems;
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleViewClick = (pasajero) => {
    setViewingPasajero(pasajero);
    setShowViewModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

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
                  placeholder="Busque el nombre del pasajero"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
              </div>
            </form>
          </div>
          <br />
          <br />
          <h1 className="text-center encabezadoLista">
            Visualización de Pasajeros
          </h1>

          <div className="row justify-content-center   ">
            <div className="table-responsive">
              {/* Tabla de visualización */}

              <table className="table  table-bordered  tablaViaje">
                <thead className="text-center cabecerasDeTabla">
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>DNI</th>
                    <th>contratos</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody className="text-center cuerpoTabla">
                  {filterPasajeros(pasajeros).map((pasajero) => (
                    <tr key={pasajero.id}>
                      {console.log(pasajero)}
                      <td>{pasajero.nombre}</td>
                      <td>{pasajero.apellido}</td>
                      <td>{pasajero.dni}</td>
                      <td>{pasajero.contratos}</td>

                      <td className="txtGral">
                        <button
                          className="btn btn-info botonEditar"
                          onClick={() => handleViewClick(pasajero)}
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
              totalItems={pasajeros.length}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
            <p className="mx-2 textoItemsViaje ">
              Cantidad de pasajeros por pagina:
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
                <option value="100">100</option>
                <option value="150">150</option>
              </select>
            </form>
          </div>
        </div>
      )}

      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        dialogClassName="modal-xl"
      >
        <Modal.Header closeButton className="modealHeaderViaje">
          <Modal.Title>Detalles del pasajero</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewingPasajero && (
            <div>
              <div className="form-control d-flex flex-wrap">
                <div className="d-flex flex-column col-md-4">
                  <h5>Nombre:</h5>
                  <h6>
                    {pasajeros.find(
                      (itinerario) => itinerario.id === viewingPasajero.id
                    )?.nombre || "Itinerario Desconocido"}{" "}
                  </h6>
                  <h5>Apellido:</h5>
                  <h6>
                    {pasajeros.find(
                      (itinerario) => itinerario.id === viewingPasajero.id
                    )?.apellido || "Itinerario Desconocido"}{" "}
                  </h6>
                  <h5>DNI:</h5>
                  <h6>
                    {pasajeros.find(
                      (itinerario) => itinerario.id === viewingPasajero.id
                    )?.dni || "Itinerario Desconocido"}{" "}
                  </h6>
                  <h5>Identificador de usuario:</h5>
                  <h6>
                    {pasajeros.find(
                      (itinerario) => itinerario.id === viewingPasajero.id
                    )?.id || "Itinerario Desconocido"}{" "}
                  </h6>
                </div>
                <div className="d-flex flex-column col-md-4">
                  <h5>Contratos:</h5>
                  <h6>
                    {pasajeros.find(
                      (itinerario) => itinerario.id === viewingPasajero.id
                    )?.contratos || "Itinerario Desconocido"}{" "}
                  </h6>
                  <h5>Fecha de nacimiento:</h5>
                  <h6>
                    {pasajeros.find(
                      (itinerario) => itinerario.id === viewingPasajero.id
                    )?.fechaNac
                      ? new Date(
                          pasajeros.find(
                            (itinerario) => itinerario.id === viewingPasajero.id
                          )?.fechaNac
                        ).toLocaleDateString("es-ES")
                      : "Itinerario Desconocido"}
                  </h6>
                  <h5>Cuotas:</h5>
                  <h6>
                    {pasajeros.find(
                      (itinerario) => itinerario.id === viewingPasajero.id
                    )?.cuotas || "Itinerario Desconocido"}{" "}
                  </h6>
                </div>
                <div className="d-flex flex-column col-md-4">
                  <h5>Telefono:</h5>
                  <h6>
                    {pasajeros.find(
                      (itinerario) => itinerario.id === viewingPasajero.id
                    )?.telef || "Itinerario Desconocido"}{" "}
                  </h6>
                  <h5>Localidad:</h5>
                  <h6>
                    {pasajeros.find(
                      (itinerario) => itinerario.id === viewingPasajero.id
                    )?.localidad || "Itinerario Desconocido"}{" "}
                  </h6>
                  <h5>Codigo Postal:</h5>
                  <h6>
                    {pasajeros.find(
                      (itinerario) => itinerario.id === viewingPasajero.id
                    )?.codPos || "Itinerario Desconocido"}{" "}
                  </h6>
                </div>
                <div className="d-flex flex-column col-md-4">
                  <h5>Direccion:</h5>
                  <h6>
                    {pasajeros.find(
                      (itinerario) => itinerario.id === viewingPasajero.id
                    )?.direccion || "Itinerario Desconocido"}{" "}
                  </h6>
                  <h5>Importe:</h5>
                  <h6>
                    {pasajeros.find(
                      (itinerario) => itinerario.id === viewingPasajero.id
                    )?.importe || "Itinerario Desconocido"}{" "}
                  </h6>
                  <h5>Responsable:</h5>
                  <h6>
                    {pasajeros.find(
                      (itinerario) => itinerario.id === viewingPasajero.id
                    )?.resp || "Itinerario Desconocido"}{" "}
                  </h6>
                </div>

                <div className="d-flex flex-column col-md-4">
                  {" "}
                  <h5>Edad:</h5>
                  <h6>
                    {pasajeros.find(
                      (itinerario) => itinerario.id === viewingPasajero.id
                    )?.edad || "Itinerario Desconocido"}{" "}
                  </h6>
                  <h5>Vencimiento de la cuota:</h5>
                  <h6>
                    {pasajeros.find(
                      (itinerario) => itinerario.id === viewingPasajero.id
                    )?.venCuo
                      ? new Date(
                          pasajeros.find(
                            (itinerario) => itinerario.id === viewingPasajero.id
                          )?.venCuo
                        ).toLocaleDateString("es-ES")
                      : "Itinerario Desconocido"}
                  </h6>
                </div>
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
