import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerContratos,
  obtenerMedioDePago,
  obtenerFinanciacionContrato,
  agregarFinanciacionContrato,
  eliminarFinanciacionDeContrato,
} from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import "../../sass/_itinerario.scss";
import { reuleaux } from "ldrs";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../components/home/Pagination.jsx";
export default function AgregarFinanciacionContrato() {
  const dispatch = useDispatch();
  //const contratos = useSelector((state) => state.contratos);
  const contratos = [{"id":1,"num":"1064","fecha":"2022-12-29T00:00:00.000Z","curso":"5TO ","division":" ","turno":" ","colegio":"STELLA MARIS","pasajeros":"27 ","mes":"SEPTIEMBRE","año":"2023 ","periodo":" ","destino":"ENTRE RIOS","impTot":"77000","valor_dolares":"","valor_contado":"","cuo_sin_int":"","cuo_fija_ipc":"","saldo_ipc":"","canc":"NO","realiz":"NO","hotel":"LOS PÁJAROS","duracion":"3 DÍAS 2 NOCHES","fechaFirma":"","fechaViaje":"","ImpTotAct":"","fechaActu":"","usuarioLog":"","fechaLog":"","id_sucursal":null,"id_periodo":null,"id_cotizacion":null,"createdAt":"2024-06-24T12:54:21.231Z","updatedAt":"2024-06-24T18:21:57.966Z","travelId":null,"financingId":1}];
  const mediosDePago = useSelector((state) => state.mediosDePago);
  // const mediosDePago = [{"id":1,"nombre":"todas cuotas 2024","texto_gral":[{"medio_de_pago":"contado","cuotas":"","importe":430000,"disponible":true},{"medio_de_pago":"dolares","cuotas":"","importe":430,"disponible":true},{"medio_de_pago":"3_cuotas","cuotas":3,"importe":500000,"disponible":true},{"medio_de_pago":"6_cuotas","cuotas":6,"importe":530000,"dispobible":true},{"medio_de_pago":"9_cuotas","cuotas":9,"importe":560000,"disponible":false}],"activo":true,"createdAt":"2024-06-19T13:20:38.246Z","updatedAt":"2024-06-19T13:20:38.246Z"},{"id":2,"nombre":"todas cuotas 2025","texto_gral":[{"medio_de_pago":"contado","cuotas":"","importe":850000,"disponible":true},{"medio_de_pago":"dolares","cuotas":"","importe":450,"disponible":true},{"medio_de_pago":"3_cuotas","cuotas":3,"importe":600000,"disponible":true},{"medio_de_pago":"6_cuotas","cuotas":6,"importe":630000,"dispobible":true},{"medio_de_pago":"9_cuotas","cuotas":9,"importe":660000,"disponible":false}],"activo":true,"createdAt":"2024-06-19T13:45:53.973Z","updatedAt":"2024-06-19T13:45:53.973Z"}];
  const medioDePago = useSelector((state) => state.financiacionContratoView);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMdp, setIsLoadingMdp] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewingFinanciacionDelContrato, setViewingFinanciacionDelContrato] = useState(null);
  const [editingFinanciacionDelContrato, setEditingFinanciacionDelContrato] = useState(null);
  const [editingNroContrato, setEditingNroContrato] = useState(null);
  const [financiacionAgregarContrato, setFinanciacionAgregarContrato] = useState(null);
  const [contratoAgregar, setContratoAgregar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAgregarModal, setShowAgregarModal] = useState(false);
  const [financiacionToDelete, setFinanciacionToDelete] = useState(null);
  const [nroContratoToDeleteFinanciacion, setNroContratoToDeleteFinanciacion] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  useEffect(() => {
    dispatch(obtenerContratos());
    dispatch(obtenerMedioDePago());
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [dispatch]);
  const filterContratos = (contratos) => {
    const filteredContratos = contratos.filter((contrato) => {
      return contrato.num.includes(searchTerm) || contrato.colegio.toLowerCase().includes(searchTerm);
    });

    // Calcular el índice del primer elemento y del último elemento en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Obtener los elementos de la página actual
    const currentItems = filteredContratos.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    return currentItems;
  };
  function getNombreFinanciacionContrato(id) {
    let resp = "";
    if(id){ // si no tiene este dato es xq el no tiene financiacion el contrato
      const financiacionDelContrato = mediosDePago
      .filter((mdp) => mdp.id == id)[0]; // en 0 xq esto deberia siempre devolver un unico valor
      resp = financiacionDelContrato.nombre;
    }
    return resp;
  };
  function getFinanciacionContrato(id) {
    return mediosDePago.filter((mdp) => mdp.id == id)[0];
  };
  const handleSaveEdits = () => {
    if (editingFinanciacionDelContrato && editingNroContrato) {
      const contratoId = editingFinanciacionDelContrato.id;

      dispatch(agregarFinanciacionContrato(editingNroContrato, contratoId));
      setShowModal(false);
      alert("Cambios guardados con éxito");
      window.location.reload();
    }
  };
  const handleEditClick = (nroContrato, financiacion) => {
    console.log(financiacion);
    setEditingNroContrato(nroContrato);
    setEditingFinanciacionDelContrato(financiacion);
    setShowModal(true);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingContrato({
      ...editingContrato,
      [name]: value,
    });
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleViewClick = (mdp) => {
    setViewingFinanciacionDelContrato(mdp);
    setShowViewModal(true);
  };
  const handleDeleteClick = (contratoId, nroContrato) => {
    setFinanciacionToDelete(contratoId);
    setNroContratoToDeleteFinanciacion(nroContrato);
    setShowConfirmationModal(true);
  };
  const handleAgregarClick = (contrato) => {
    setShowAgregarModal(true);
    setContratoAgregar(contrato);
  };
  const handleConfirmDelete = () => {
    if (financiacionToDelete && nroContratoToDeleteFinanciacion){
      console.log(financiacionToDelete);
      dispatch(eliminarFinanciacionDeContrato(nroContratoToDeleteFinanciacion));
      setShowConfirmationModal(false);
      setFinanciacionToDelete(null);
      setNroContratoToDeleteFinanciacion(null);
      alert("Se elimino la financiacion del viaje correctamente.");
      window.location.reload();
    }
  };
  const handleConfirmAgregar = () => {
    console.log(financiacionAgregarContrato + " | " + contratoAgregar);
    if (financiacionAgregarContrato && contratoAgregar){
      dispatch(agregarFinanciacionContrato(contratoAgregar.num, financiacionAgregarContrato.id));
      setShowAgregarModal(false);
      setFinanciacionAgregarContrato(null);
      setContratoAgregar(null);
      alert("Se agregó la financiación al contrato correctamente");
      window.location.reload();
    }
  };
  const handleSeleccionFinanciacionParaContrato = (e) => {
    const idFinanciacion = e.target.value;
    // esto es asi porque no me funcionaba bien con el objeto de una
    const financiacionElegida = mediosDePago.filter((mdp) => { return mdp.id == idFinanciacion})[0];
    setFinanciacionAgregarContrato(financiacionElegida);
  };
  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setShowAgregarModal(false); // como uno no molesta al otro
    setFinanciacionAgregarContrato(null);
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

  const handleMedioDePagoSeleccionadoChange = (e) => {
    const idFinanciacion = e.target.value;
    setEditingFinanciacionDelContrato(getFinanciacionContrato(idFinanciacion));
  };


  const filterMediosDePago = (mediosDePago) => {
    console.log(mediosDePago);
    const filteredMediosDePago = mediosDePago.filter((medioDePago) => {
      return medioDePago.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return currentItems;
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
                  placeholder="Busque el contrato / colegio"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
              </div>
            </form>
          </div>
          <br />
          <br />
          <h1 className="text-center encabezadoLista">
            Visualización de Contratos
          </h1>
          <br/>

          <div className="row justify-content-center   ">
            <div className="table-responsive">
              {/* Tabla de visualización */}

              <table className="table  table-bordered  tablaViaje">
                <thead className="text-center cabecerasDeTabla">
                  <tr>
                    <th>Nro Contrato</th>
                    <th>Colegio</th>
                    <th>Curso</th>
                    <th>Division</th>
                    <th>Turno</th>
                    <th>Destino</th>
                    <th>Periodo</th>
                    <th>Año</th>
                    <th>Medio de pago / Financiación</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody className="text-center cuerpoTabla">
                  {filterContratos(contratos).map((contrato) => (
                    <tr key={contrato.num}>
                      <td>{contrato.num}</td>
                      <td>{contrato.colegio}</td>
                      <td>{contrato.curso}</td>
                      <td>{contrato.division}</td>
                      <td>{contrato.turno}</td>
                      <td>{contrato.destino}</td>
                      <td>{contrato.periodo}</td>
                      <td>{contrato.año}</td>
                      <td>{getNombreFinanciacionContrato(contrato.financingId)}</td>
                      <td className="txtGral">
                        {(contrato.financingId) ?
                          <>
                            <button
                              className="btn btn-primary botonEditar"
                              onClick={() => handleEditClick(contrato.num, getFinanciacionContrato(contrato.financingId))}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/zfzufhzk.json"
                                trigger="hover"
                                style={{ width: "15px", height: "15px" }}
                              ></lord-icon>
                            </button>
                            
                            <button
                              className="btn btn-danger botonEliminar"
                              onClick={() => handleDeleteClick(getFinanciacionContrato(contrato.financingId), contrato.num)}
                            >
                            <lord-icon
                              src="https://cdn.lordicon.com/xekbkxul.json"
                              trigger="hover"
                              style={{ width: "15px", height: "15px" }}
                            ></lord-icon>
                            </button>

                            <button
                              className="btn btn-info botonEditar"
                              onClick={() => handleViewClick(getFinanciacionContrato(contrato.financingId))}
                            >
                            <lord-icon
                              src="https://cdn.lordicon.com/ascijbjj.json"
                              trigger="hover"
                              style={{ width: "15px", height: "15px" }}
                            ></lord-icon>
                            </button>
                          </>
                          :
                          <div className="botonCrear">
                            <button
                              className="btn btn-info botonEditar"
                              onClick={() => handleAgregarClick(contrato)}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/ftndcppj.json"
                                trigger="hover"
                                colors="primary:#1b1091,secondary:#e4e4e4"
                                style={{ width: "1.5rem", height: "1.5rem" }}
                              ></lord-icon>
                            </button>
                          </div>
                        }
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
              totalItems={contratos.length}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
            <p className="mx-2 textoItemsViaje ">
              Cantidad de contratos por página:
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
          <Modal.Title>Editar financiación asignada al contrato {editingNroContrato}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5>Financiación:</h5>
            <select
              onChange={handleMedioDePagoSeleccionadoChange}
              className="form-select mx-1 selectMediosDePago"
            >
                {mediosDePago.map((medioDePago) => (
                    <option value={medioDePago.id}>{medioDePago.nombre}</option>
                ))}    
            </select> 
          </div>
          <div>
            <h5>Métodos de pago:</h5>
            <table className="table  table-bordered">
              <thead className="text-center">
                <tr>
                  <th>Medio de Pago</th>
                  <th>Cuotas</th>
                  <th>Importe</th>
                  <th>Disponibilidad</th>
                </tr>
              </thead>
              {editingFinanciacionDelContrato ?
                <tbody className="text-center cuerpoTabla">
                  {editingFinanciacionDelContrato.texto_gral.map((financiacion, index) => (
                      <tr key={index}>
                        <td>{financiacion.medio_de_pago}</td>
                        <td>{financiacion.cuotas ? financiacion.cuotas : "1"}</td>
                        <td>${financiacion.importe}</td>
                        <td>{financiacion.disponible ? "Activo" : "Inactivo"}</td>
                      </tr>
                  ))}
                </tbody>
              : ""
              }
              
            </table>
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
          <Modal.Title>Detalles de la financiación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewingFinanciacionDelContrato ?
          <>
            <div>
              <h5>Financiación: <strong>{viewingFinanciacionDelContrato.nombre}</strong></h5>
            </div>
            <br/>
            <div>
              <h5>Métodos de pago:</h5>
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
                    {viewingFinanciacionDelContrato.texto_gral.map((financiacion, index) => (
                        <tr key={index}>
                          <td>{financiacion.medio_de_pago}</td>
                          <td>{financiacion.cuotas ? financiacion.cuotas : "1"}</td>
                          <td>${financiacion.importe}</td>
                          <td>{financiacion.disponible ? "Activo" : "Inactivo"}</td>
                        </tr>
                    ))}
                  </tbody>
              </table>
            </div>
          </>
          : <p>No se a seleccionado una financiación</p>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar financiación del contrato</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {financiacionToDelete && (
            <p>
              ¿Está seguro que desea eliminar la financiación {" "}
              <strong>"{financiacionToDelete.nombre}"</strong> {" "}
              del contrato nro. {" "}
              <strong>{nroContratoToDeleteFinanciacion}</strong>?
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

      <Modal show={showAgregarModal} onHide={handleCloseConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar financiación al contrato {contratoAgregar ? contratoAgregar.num : ""}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
              <h5>Financiación:</h5>
              <select
                onChange={handleSeleccionFinanciacionParaContrato}
                className="form-select mx-1 selectMediosDePago"
              >
                <option value={null}>Seleccione una opción</option>
                {mediosDePago.map((medioDePago) => (
                    <option value={medioDePago.id}>{medioDePago.nombre}</option>
                ))}    
              </select> 
            </div>
            {financiacionAgregarContrato ?
            <div>
              <h5>Métodos de pago:</h5>
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
                  
                    {financiacionAgregarContrato.texto_gral.map((financiacion, index) => (
                        <tr key={index}>
                          <td>{financiacion.medio_de_pago}</td>
                          <td>{financiacion.cuotas ? financiacion.cuotas : "1"}</td>
                          <td>${financiacion.importe}</td>
                          <td>{financiacion.disponible ? "Activo" : "Inactivo"}</td>
                        </tr>
                    ))}
                </tbody>
              </table>
            </div>
            : ""
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmationModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmAgregar}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}