import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  getUsers,
  eliminarUsuario,
  editarUsuario,
  obtenerContratos,
  getPadres,
} from "../../redux/actions/actions.js";
import { useDispatch, useSelector } from "react-redux";
// import "../../sass/_abm_Usuario.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Pagination from "../home/Pagination.jsx";
import { reuleaux } from "ldrs";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
export default function Abmusuario() {
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.users);
  const padre = useSelector((state) => state.padres);
  const loginId = padre.map((hijo) => hijo.Passenger_Login.loginId);
  const [showModal, setShowModal] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState({
    nombre: "",
    email: "",
  });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [usuarioToDelete, setUsuarioToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [nuevoContratoData, setNuevoContratoData] = useState([]);
  const contratos = useSelector((state) => state.contratos);
  const [contratosSeleccionados, setContratosSeleccionados] = useState([]);
  const [searchTermContratos, setSearchTermContratos] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [estado, setEstado] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const rolesOptions = ["Padre", "Coordinador", "Administrador"];
  // useEffect(() => {
  //   const padres = usuarios.filter((usuario) => usuario.rol === "Padre");
  //   const loginIdsPadres = padres.map((padre) => padre.id);
  //   dispatch(getUsers());
  //   dispatch(obtenerContratos()); // Asegúrate de que la acción obtenerUsuarios esté definida
  //   const timeout = setTimeout(() => {
  //     setIsLoading(false); // Cambia el estado a false después de un tiempo (simulación de carga)
  //   }, 4000); // Cambia el número a la cantidad de tiempo que desees simular

  //   dispatch(getPadres(loginIdsPadres));
  //   return () => clearTimeout(timeout);
  // }, [dispatch]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false); // Cambia el estado a false después de un tiempo (simulación de carga)
    }, 4000); // Cambia el número a la cantidad de tiempo que desees simular
    const padres = usuarios.filter((usuario) => usuario.rol === "Padre");
    const loginIdsPadres = padres.map((padre) => padre.id);

    dispatch(getPadres(loginIdsPadres)).then(() => {
      // Llamada a obtener usuarios y contratos después de obtener padres

      dispatch(getUsers());
      dispatch(obtenerContratos());
    });
    {
      console.log("hijo", padre);
    }

    return () => clearTimeout(timeout);
  }, [dispatch]);

  const handleEditClick = (usuario) => {
    setEditingUsuario(usuario);
    setShowModal(true);
    setContratosSeleccionados(usuario.contrato);
    setEstado(usuario.estado === "true");
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
  const getContractNameById = (contractNum) => {
    const selectedContract = contratos.find(
      (contract) => contract.num === contractNum
    );
    return selectedContract
      ? selectedContract.num
      : "Nombre de Contrato Desconocido";
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleConfirmDelete = () => {
    if (usuarioToDelete) {
      dispatch(eliminarUsuario(usuarioToDelete.id));
      setShowConfirmationModal(false);
      setUsuarioToDelete(null);
      alert("El usuario se eliminó con éxito");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveEdits = () => {
    if (editingUsuario) {
      const usuarioId = editingUsuario.id;
      // const contratosFinal = `[${contratosSeleccionados.join(",")}]`;
      // Crear un objeto usuarioActualizado con los campos editados
      const usuarioActualizado = {
        nombre: editingUsuario.nombre,
        email: editingUsuario.email,
        telefono: editingUsuario.telefono,
        password: editingUsuario.password,
        apellido: editingUsuario.apellido,
        rol: editingUsuario.rol,
        usuario: editingUsuario.usuario,
        contrato: contratosSeleccionados.map((contract) => contract.toString()),
        estado: editingUsuario.estado,
        id: editarUsuario.id,
      };
      dispatch(editarUsuario(usuarioId, usuarioActualizado));
      setShowModal(false);
      alert("Cambios guardados con éxito");
      window.location.reload();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUsuario({
      ...editingUsuario,
      [name]: value,
    });
  };

  const filterUsuarios = (usuarios) => {
    const filteredUsuarios = usuarios.filter((usuario) => {
      const nombre = usuario.nombre ? usuario.nombre.toLowerCase() : "";
      const apellido = usuario.apellido ? usuario.apellido.toLowerCase() : "";
      const contrato = usuario.contrato
        ? usuario.contrato.toString().toLowerCase()
        : "";
      console.log("contrato", contrato);

      const usuarioNombre = usuario.usuario
        ? usuario.usuario.toLowerCase()
        : "";

      return (
        nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuarioNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contrato.includes(searchTerm)
      );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = filteredUsuarios.slice(
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
  const filterContratos = (searchTermContratos) => {
    return contratos.filter((contrato) => {
      return contrato.num
        .toLowerCase()
        .includes(searchTermContratos.toLowerCase());
    });
  };
  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    if (selectedOptions.length > 0) {
      setNuevoContratoData(selectedOptions);
    }
  };
  const formatContratos = (contratos) => {
    // Si los contratos son un array, los transforma en una cadena con comas
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
      // Separa los contratos en un array y únelos con comas
      const contratoArray = contratoString
        .split(",")
        .map((contractNum) => contractNum.trim());
      return contratoArray.join(", ");
    }
    // Si los contratos no son ni un array ni una cadena con corchetes, muestra un mensaje
    return "Contratos Desconocidos";
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
                  className="input-md searchabar"
                  placeholder="Buscar Usuarios"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
              </div>
            </form>
          </div>
          <br />
          <br />
          <br />
          <h2 className="text-center encabezadoLista">Lista de Usuarios</h2>
          <div className="botonCrear">
            <Link
              to="/gestion/postUsuarios"
              className="btn btn-primary botonCrearLink"
              title="Agregar Usuario"
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
            <table className="table table-bordered tablaViaje">
              <thead className="text-center cabecerasDeTabla">
                <tr>
                  <th>Usuario</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Pasajeros</th>
                  <th>Email</th>
                  <th>Telefono</th>
                  <th>Contratos</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="text-center cuerpoTabla">
                {filterUsuarios(usuarios).map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.usuario}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.apellido}</td>

                    <td>
                      {usuario.rol === "Padre" && padre.length > 0 ? (
                        <div className="d-flex justify-content-center">
                          {padre
                            .filter(
                              (hijo) =>
                                hijo.Passenger_Login.loginId === usuario.id
                            )
                            .map((hijo) => (
                              <div
                                key={hijo.Passenger_Login.loginId}
                                className="me-3"
                              >
                                {hijo.nombre} {hijo.apellido} <br />
                                DNI {hijo.dni} <br />
                                Id Usuario {hijo.id} <br />
                                {hijo.dieta
                                  ? Object.keys(hijo.dieta).map((key) => (
                                      <span key={key}>
                                        {key}: {hijo.dieta[key] ? "Sí" : "No"}{" "}
                                        <br />
                                      </span>
                                    ))
                                  : "---"}
                              </div>
                            ))}
                        </div>
                      ) : (
                        "---"
                      )}
                    </td>

                    <td>{usuario.email}</td>
                    <td>{usuario.telefono}</td>
                    <td>{`${usuario.contrato
                      .join(", ")
                      .replace(/\[|\]/g, "")}`}</td>
                    <td>{usuario.rol}</td>
                    <td>
                      {usuario.estado === "true" ? "Activado" : "Desactivado"}
                    </td>

                    <td>
                      <button
                        className="btn btn-primary botonEditar"
                        onClick={() => handleEditClick(usuario)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/zfzufhzk.json"
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
          <div className="pagination  d-flex justify-content-center align-items-center">
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={usuarios.length}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
            <p className="mx-2 textoItemsViaje ">
              Cantidad de usuarios por pagina:
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
          <Modal.Title>Eliminar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {usuarioToDelete && (
            <p>
              ¿Está seguro que desea eliminar al usuario{" "}
              <strong>{usuarioToDelete.nombre}</strong>?
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
          <Modal.Title>Crear/Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Usuario:
            <input
              className="form-control mb-3"
              type="text"
              name="usuario"
              placeholder="Usuario"
              value={editingUsuario ? editingUsuario.usuario : ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            Identificador de Usuario:
            <input
              className="form-control mb-3"
              type="text"
              name="Identificador de usuario"
              placeholder="ID"
              value={editingUsuario ? editingUsuario.id : ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            Nombre:
            <input
              className="form-control mb-3"
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={editingUsuario ? editingUsuario.nombre : ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            Apellido:
            <input
              className="form-control mb-3"
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={editingUsuario ? editingUsuario.apellido : ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            Email:
            <input
              className="form-control mb-3"
              type="email"
              name="email"
              placeholder="Email"
              value={editingUsuario ? editingUsuario.email : ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            Rol:
            <select
              className="form-control mb-3"
              name="rol"
              value={editingUsuario ? editingUsuario.rol : ""}
              onChange={handleInputChange}
            >
              <option value="">Selecciona un rol:</option>
              {rolesOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            Telefono:
            <input
              className="form-control mb-3"
              type="text"
              name="telefono"
              placeholder="+54 11-1111-1111"
              value={editingUsuario ? editingUsuario.telefono : ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            Password:
            <input
              className="form-control mb-3"
              type={showPassword ? "password" : "text"}
              name="password"
              placeholder="Indique rol"
              value={editingUsuario ? editingUsuario.password : ""}
              onChange={handleInputChange}
            />
            <span
              className="password-toggle-icon ocultarPass3"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>

          <p className="me-3 seleccionestado">Seleccionar estado:</p>
          <div className="mb-3 d-flex align-items-center">
            <p className="me-5">Desactivado</p>
            <div className="form-check form-switch mb-4">
              <input
                className="form-check-input switchEstado "
                type="checkbox"
                id="flexSwitchCheckChecked"
                checked={estado}
                onChange={(e) => {
                  setEstado(e.target.checked);
                  setEditingUsuario({
                    ...editingUsuario,
                    estado: e.target.checked ? "true" : "false",
                  });
                }}
              />
            </div>
            <p className="me-2 activadoClase">Activado</p>
          </div>
          <div>
            <label>Buscar Contratos:</label>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Buscar Contratos"
              value={searchTermContratos} // Estado de término de búsqueda
              onChange={(e) => setSearchTermContratos(e.target.value)} // Actualizar término de búsqueda
            />
          </div>
          <div>
            <label>Selecciona Contratos:</label>
            <select
              className="form-control"
              id="contrato"
              name="contratos"
              value={nuevoContratoData}
              required
              multiple
              onChange={handleSelectChange}
            >
              <option value="">Elije los contratos:</option>
              {filterContratos(searchTermContratos).map((contrato) => (
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
            <label>Contratos Seleccionados</label>
            <ul>
              {contratosSeleccionados.map((contractNum) => (
                <li key={contractNum}>{getContractNameById(contractNum)}</li>
              ))}
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveEdits}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
