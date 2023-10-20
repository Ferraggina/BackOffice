import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  obtenerHoteles,
  obtenerItinerario,
  obtenerViajes,
  eliminarViaje,
  editarViaje,
  obtenerContratos,
} from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import "../../sass/_abm_Viaje.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function Abm_Viaje() {
  const dispatch = useDispatch();
  const viajes = useSelector((state) => state.viajes);
  const hoteles = useSelector((state) => state.hoteles);
  const itinerarios = useSelector((state) => state.itinerarios);
  const contratos = useSelector((state) => state.contratos);
  const [showModal, setShowModal] = useState(false);

  const [editingViaje, setEditingViaje] = useState({
    // Inicializa todas las propiedades con valores iniciales
    destino: "",
    contratos: [],
    salida: "",
    regreso: "",
    hotelId: "", // Agrega el campo para el ID del hotel
    scheduleId: "",
    // Agrega más propiedades según los campos del viaje
  });

  const [nuevoContratoData, setNuevoContratoData] = useState([]);
  const [contratosSeleccionados, setContratosSeleccionados] = useState([]);
  console.log("Valor inicial de contratos:", editingViaje.contratos);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [viajeToDelete, setViajeToDelete] = useState(null);
  // Use useEffect para cargar los viajes al montar el componente
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar los viajes basados en el término de búsqueda
  const filteredViajes = viajes.filter((viaje) =>
    viaje.destino.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Función para manejar el cambio en el input de búsqueda
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    dispatch(obtenerViajes());
    dispatch(obtenerHoteles());
    dispatch(obtenerItinerario());
    dispatch(obtenerContratos());
  }, [dispatch]);

  // Función para abrir el modal de edición
  const handleEditClick = (viaje) => {
    setEditingViaje(viaje);
    setShowModal(true);
  };
  //Función para abrir el modal de confirmación de eliminación
  const handleDeleteClick = (viajeId) => {
    // Llama a la acción para eliminar un viaje
    setViajeToDelete(viajeId);
    setShowConfirmationModal(true);
  };
  // Función para cerrar el modal de confirmación
  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  // Función para confirmar la eliminación de un viaje
  const handleConfirmDelete = () => {
    if (viajeToDelete) {
      // Llama a la acción para eliminar el viaje
      dispatch(eliminarViaje(viajeToDelete.id));

      // Cierra el modal de confirmación
      setShowConfirmationModal(false);

      // Limpia el viajeToDelete
      setViajeToDelete(null);

      // Puedes mostrar un mensaje de éxito al usuario aquí
      alert("Su viaje se eliminó con éxito");
    }
  };

  // Función para cerrar el modal de edición
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Función para guardar las ediciones
  const handleSaveEdits = () => {
    if (editingViaje) {
      const viajeId = editingViaje.id;
      const contratosFormateados = contratosSeleccionados.join(",");

      // Agrega corchetes alrededor de la cadena
      const contratosFinal = `[${contratosFormateados}]`;
      const viajeActualizado = {
        destino: editingViaje.destino,
        contratos: contratosFinal,
        salida: editingViaje.salida,
        regreso: editingViaje.regreso,
        hotelId: editingViaje.hotelId, // Agrega el campo para el ID del hotel
        scheduleId: editingViaje.scheduleId,
        // Agrega más propiedades según los campos del viaje
      };
      console.log("Aca editing viaje contratos", editingViaje.contratos);
      dispatch(editarViaje(viajeId, viajeActualizado));
      setShowModal(false);
      alert("Cambios guardados con éxito");
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
      // Si ya está seleccionado, quítalo de la lista de contratos seleccionados
      setContratosSeleccionados((prevSelected) =>
        prevSelected.filter((num) => num !== contractNum)
      );
    } else {
      // Si no está seleccionado, agrégalo a la lista de contratos seleccionados
      setContratosSeleccionados((prevSelected) => [
        ...prevSelected,
        contractNum,
      ]);
    }
  };
  const getContractNameById = (contractNum) => {
    const selectedContract = contratos.find(
      (contract) => contract.num === contractNum
    );
    return selectedContract
      ? selectedContract.num
      : "Nombre de Contrato Desconocido";
  };
  return (
    <div className="container mt-4 ">
      <br />
      <br />
      <br />
      {/* <div className="form-group">
        <label>Buscar Viajes</label>
        <input
        type="text"
        className="form-control"
        placeholder="Buscar Viajes"
        value={searchTerm}
        onChange={handleSearchInputChange}
        />
      </div> */}
      <div className="search-field d-none d-md-block">
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
              placeholder="Buscar Viajes"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </div>
        </form>
      </div>
      <br />
      <h2 className="text-center encabezadoLista">Lista de Viajes</h2>
      <div>
        <Link to="/FormularioViaje" className="btn btn-primary botonEditar">
          Crear Viaje
        </Link>
      </div>

      {filteredViajes.length ? (
        filteredViajes.map((viaje) => (
          <div key={viaje.id} className="card mb-4 cardViajes">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>Destino</th>
                      <td>{viaje.destino}</td>
                      <th>Salida</th>
                      <td>{viaje.salida}</td>
                      <th>Hotel</th>
                      <td>
                        {hoteles.map((hotel) => {
                          if (hotel.id === viaje.hotelId) {
                            return (
                              <div key={hotel.id}>
                                <p>Nombre: {hotel.nombre}</p>
                                <p>Dirección: {hotel.direccion}</p>
                                {/* Agrega más detalles del hotel si es necesario */}
                              </div>
                            );
                          }
                          return null;
                        })}
                      </td>
                    </tr>
                    <tr>
                      <th>Contratos</th>
                      <td>{viaje.contratos}</td>
                      <th>Regreso</th>
                      <td>{viaje.regreso}</td>
                      <th>Itinerario</th>
                      <td>
                        {itinerarios.map((itinerario) => {
                          if (itinerario.id === viaje.scheduleId) {
                            const textoGral = itinerario.texto_gral;
                            if (textoGral) {
                              const items = JSON.parse(textoGral);
                              return (
                                <div key={itinerario.id}>
                                  <p>Nombre: {itinerario.nombre}</p>
                                  <p>Descripción:</p>
                                  {items.map((item, index) => (
                                    <div key={index}>
                                      <p>{`Título: ${item.titulo}`}</p>
                                      <p>{`Descripción: ${item.descripcion}`}</p>
                                    </div>
                                  ))}
                                </div>
                              );
                            }
                          }
                          return null;
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <button
                className="btn btn-primary botonEditar"
                onClick={() => handleEditClick(viaje)}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/zfzufhzk.json"
                  trigger="hover"
                  style={{ width: "40px", height: "40px" }}
                ></lord-icon>
              </button>
              <button
                className="btn btn-danger botonEliminar"
                onClick={() => handleDeleteClick(viaje)}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/xekbkxul.json"
                  trigger="hover"
                  style={{ width: "40px", height: "40px" }}
                ></lord-icon>
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No hay viajes disponibles.</p>
      )}

      {/* Modal de Edición */}
      <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cuidado queriendo eliminar un viaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viajeToDelete && (
            <p>
              ¿Está seguro que desea eliminar el viaje
              <strong>{viajeToDelete.nombre}</strong>?
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
          <Modal.Title>Editar Viaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Campos de edición */}
          Destino:
          <input
            className="form-control mb-3"
            type="text"
            name="destino"
            placeholder="Destino"
            value={editingViaje ? editingViaje.destino : ""}
            onChange={handleInputChange}
          />
          Salida:
          <input
            className="form-control mb-3"
            type="date"
            name="regreso"
            placeholder="AAAA-MM-DD"
            value={editingViaje ? editingViaje.regreso : ""}
            onChange={handleInputChange}
          />
          Regreso:
          <input
            className="form-control mb-3"
            type="date"
            name="salida"
            placeholder="AAAA-MM-DD"
            value={editingViaje ? editingViaje.salida : ""}
            onChange={handleInputChange}
          />
          <div>
            <label className="form-label">Selecciona un Hotel:</label>
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
            <label>Selecciona un Itinerario:</label>
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
            <label>Selecciona Contratos:</label>
            <select
              className="form-control"
              id="contrato"
              name="contratos" // Cambia el nombre a "contratos"
              value={nuevoContratoData} // Debe ser un array
              // Maneja el cambio en los contratos seleccionados
              required
              multiple // Permite múltiples selecciones
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
            <div>
              <label>Contratos Seleccionados</label>
              <ul>
                {contratosSeleccionados.map(
                  (contractNum) => (
                    console.log("ACA LOS CONTRATOS", contratosSeleccionados),
                    (
                      <li key={contractNum}>
                        {/* Usa la función getContractNameById para obtener el nombre del contrato */}
                        {getContractNameById(contractNum)}
                      </li>
                    )
                  )
                )}
              </ul>
            </div>
          </div>
          {/* Agrega más campos de edición según tus necesidades */}
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
// import React, { useEffect, useState } from "react";
// import { Modal, Button } from "react-bootstrap";
// import {
//   obtenerHoteles,
//   obtenerItinerario,
//   obtenerViajes,
//   eliminarViaje,
//   editarViaje,
//   obtenerContratos,
// } from "../../redux/actions/actions";
// import { useDispatch, useSelector } from "react-redux";
// import "../../sass/_abm_Viaje.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";

// export default function Abm_Viaje() {
//   const dispatch = useDispatch();
//   const viajes = useSelector((state) => state.viajes);
//   const hoteles = useSelector((state) => state.hoteles);
//   const itinerarios = useSelector((state) => state.itinerarios);
//   const contratos = useSelector((state) => state.contratos);
//   const [showModal, setShowModal] = useState(false);
//   const [editingViaje, setEditingViaje] = useState({
//     destino: "",
//     contratos: [],
//     salida: "",
//     regreso: "",
//     hotelId: "",
//     scheduleId: "",
//   });
//   const [nuevoContratoData, setNuevoContratoData] = useState([]);
//   const [contratosSeleccionados, setContratosSeleccionados] = useState([]);
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   const [viajeToDelete, setViajeToDelete] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearchInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   useEffect(() => {
//     dispatch(obtenerViajes());
//     dispatch(obtenerHoteles());
//     dispatch(obtenerItinerario());
//     dispatch(obtenerContratos());
//   }, [dispatch]);

//   const handleEditClick = (viaje) => {
//     setEditingViaje(viaje);
//     setShowModal(true);
//   };

//   const handleDeleteClick = (viajeId) => {
//     setViajeToDelete(viajeId);
//     setShowConfirmationModal(true);
//   };

//   const handleCloseConfirmationModal = () => {
//     setShowConfirmationModal(false);
//   };

//   const handleConfirmDelete = () => {
//     if (viajeToDelete) {
//       dispatch(eliminarViaje(viajeToDelete.id));
//       setShowConfirmationModal(false);
//       setViajeToDelete(null);
//       alert("Su viaje se eliminó con éxito");
//     }
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleSaveEdits = () => {
//     if (editingViaje) {
//       const viajeId = editingViaje.id;
//       const contratosFormateados = contratosSeleccionados.join(",");
//       const contratosFinal = `[${contratosFormateados}]`;
//       const viajeActualizado = {
//         destino: editingViaje.destino,
//         contratos: contratosFinal,
//         salida: editingViaje.salida,
//         regreso: editingViaje.regreso,
//         hotelId: editingViaje.hotelId,
//         scheduleId: editingViaje.scheduleId,
//       };
//       dispatch(editarViaje(viajeId, viajeActualizado));
//       setShowModal(false);
//       alert("Cambios guardados con éxito");
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditingViaje({
//       ...editingViaje,
//       [name]: value,
//     });
//   };

//   const toggleContractSelection = (contractNum) => {
//     if (contratosSeleccionados.includes(contractNum)) {
//       setContratosSeleccionados((prevSelected) =>
//         prevSelected.filter((num) => num !== contractNum)
//       );
//     } else {
//       setContratosSeleccionados((prevSelected) => [
//         ...prevSelected,
//         contractNum,
//       ]);
//     }
//   };

//   const getContractNameById = (contractNum) => {
//     const selectedContract = contratos.find(
//       (contract) => contract.num === contractNum
//     );
//     return selectedContract
//       ? selectedContract.num
//       : "Nombre de Contrato Desconocido";
//   };

//   return (
//     <div className="container mt-4">
//       <div className="search-field d-none d-md-block">
//         <form
//           className="d-flex align-items-center h-100 formularioSearch"
//           action="#"
//         >
//           <div className="input-group">
//             <div className="input-group-prepend bg-transparent">
//               <span className="input-group-text border-0">
//                 <FontAwesomeIcon icon={faSearch} />
//               </span>
//             </div>
//             <input
//               type="search"
//               className="input-md bg-transparent searchabar"
//               placeholder="Buscar Viajes"
//               value={searchTerm}
//               onChange={handleSearchInputChange}
//             />
//           </div>
//         </form>
//       </div>
//       <div>
//         <Link to="/FormularioViaje" className="btn btn-primary">
//           Crear Viaje
//         </Link>
//       </div>
//       <h2 className="text-center encabezadoLista">Lista de Viajes</h2>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>Destino</th>
//             <th>Salida</th>
//             <th>Hotel</th>
//             <th>Contratos</th>
//             <th>Regreso</th>
//             <th>Itinerario</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {viajes.map((viaje) => (
//             <tr key={viaje.id}>
//               <td>{viaje.destino}</td>
//               <td>{viaje.salida}</td>
//               <td>
//                 {hoteles.map((hotel) =>
//                   hotel.id === viaje.hotelId ? (
//                     <div key={hotel.id}>
//                       <p>Nombre: {hotel.nombre}</p>
//                       <p>Dirección: {hotel.direccion}</p>
//                     </div>
//                   ) : null
//                 )}
//               </td>
//               <td>{viaje.contratos}</td>
//               <td>{viaje.regreso}</td>
//               <td>
//                 {itinerarios.map((itinerario) =>
//                   itinerario.id === viaje.scheduleId ? (
//                     <div key={itinerario.id}>
//                       <p>Nombre: {itinerario.nombre}</p>
//                       <p>Descripción:</p>
//                       {itinerario.texto_gral
//                         ? JSON.parse(itinerario.texto_gral).map(
//                             (item, index) => (
//                               <div key={index}>
//                                 <p>{`Título: ${item.titulo}`}</p>
//                                 <p>{`Descripción: ${item.descripcion}`}</p>
//                               </div>
//                             )
//                           )
//                         : null}
//                     </div>
//                   ) : null
//                 )}
//               </td>
//               <td>
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => handleEditClick(viaje)}
//                 >
//                   Editar
//                 </button>
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => handleDeleteClick(viaje)}
//                 >
//                   Eliminar
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Eliminar Viaje</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {viajeToDelete && (
//             <p>
//               ¿Está seguro que desea eliminar el viaje{" "}
//               <strong>{viajeToDelete.nombre}</strong>?
//             </p>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseConfirmationModal}>
//             Cancelar
//           </Button>
//           <Button variant="danger" onClick={handleConfirmDelete}>
//             Eliminar
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Editar Viaje</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div>
//             Destino:
//             <input
//               className="form-control mb-3"
//               type="text"
//               name="destino"
//               placeholder="Destino"
//               value={editingViaje ? editingViaje.destino : ""}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             Salida:
//             <input
//               className="form-control mb-3"
//               type="date"
//               name="salida"
//               placeholder="AAAA-MM-DD"
//               value={editingViaje ? editingViaje.salida : ""}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             Regreso:
//             <input
//               className="form-control mb-3"
//               type="date"
//               name="regreso"
//               placeholder="AAAA-MM-DD"
//               value={editingViaje ? editingViaje.regreso : ""}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label>Selecciona un Hotel:</label>
//             <select
//               className="form-select mb-3"
//               name="hotelId"
//               value={editingViaje ? editingViaje.hotelId : ""}
//               onChange={handleInputChange}
//             >
//               <option value="">-- Selecciona una opción --</option>
//               {hoteles.map((hotel) => (
//                 <option key={hotel.id} value={hotel.id}>
//                   {hotel.nombre} {hotel.direccion}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label>Selecciona un Itinerario:</label>
//             <select
//               className="form-select mb-3"
//               name="scheduleId"
//               value={editingViaje ? editingViaje.scheduleId : ""}
//               onChange={handleInputChange}
//             >
//               <option value="">-- Selecciona una opción --</option>
//               {itinerarios.map((itinerario) => (
//                 <option key={itinerario.id} value={itinerario.id}>
//                   {itinerario.nombre}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label>Selecciona Contratos:</label>
//             <select
//               className="form-control"
//               id="contrato"
//               name="contratos"
//               value={nuevoContratoData}
//               required
//               multiple
//               onChange={(e) =>
//                 setNuevoContratoData(
//                   Array.from(e.target.selectedOptions, (option) => option.value)
//                 )
//               }
//             >
//               <option value="">Elije los contratos:</option>
//               {contratos.map((contrato) => (
//                 <option
//                   key={contrato.id}
//                   value={contrato.num}
//                   onClick={() => toggleContractSelection(contrato.num)}
//                   className={
//                     contratosSeleccionados.includes(contrato.num)
//                       ? "selected"
//                       : ""
//                   }
//                 >
//                   - Contrato {contrato.num}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label>Contratos Seleccionados</label>
//             <ul>
//               {contratosSeleccionados.map((contractNum) => (
//                 <li key={contractNum}>{getContractNameById(contractNum)}</li>
//               ))}
//             </ul>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Cancelar
//           </Button>
//           <Button variant="primary" onClick={handleSaveEdits}>
//             Guardar Cambios
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }
