import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  getUsers,
  eliminarUsuario,
  editarUsuario,
  obtenerContratos,
} from "../../redux/actions/actions.js"; // Asegúrate de tener las acciones adecuadas
import { useDispatch, useSelector } from "react-redux";
// import "../../sass/_abm_Usuario.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Pagination from "../home/Pagination.jsx";
import { reuleaux } from "ldrs";
export default function Abmusuario() {
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.users); // Asegúrate de que el estado de usuarios esté definido
  const [showModal, setShowModal] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState({
    nombre: "",
    email: "",
    // Otros campos de usuario aquí...
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

  const [isLoading, setIsLoading] = useState(true);
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const rolesOptions = ["Padre", "Coordinador", "Administrador"];
  useEffect(() => {
    dispatch(getUsers());
    dispatch(obtenerContratos()); // Asegúrate de que la acción obtenerUsuarios esté definida
    const timeout = setTimeout(() => {
      setIsLoading(false); // Cambia el estado a false después de un tiempo (simulación de carga)
    }, 1500); // Cambia el número a la cantidad de tiempo que desees simular

    return () => clearTimeout(timeout);
  }, [dispatch]);

  const handleEditClick = (usuario) => {
    setEditingUsuario(usuario);
    setShowModal(true);
    setContratosSeleccionados(usuario.contrato);
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

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleConfirmDelete = () => {
    if (usuarioToDelete) {
      dispatch(eliminarUsuario(usuarioToDelete.id)); // Asegúrate de que la acción eliminarUsuario esté definida
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

        // Otros campos editados aquí...
      };
      dispatch(editarUsuario(usuarioId, usuarioActualizado)); // Asegúrate de que la acción editarUsuario esté definida
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
      const usuarioNombre = usuario.usuario
        ? usuario.usuario.toLowerCase()
        : "";
      return (
        nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuarioNombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    // Calcular el índice del primer elemento y del último elemento en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Obtener los elementos de la página actual
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
    setCurrentPage(1); // Reiniciar a la primera página cuando cambie la cantidad de elementos por página
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
    // Si los contratos son un array, conviértelos en una cadena con comas
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
    // Si los contratos no son ni un array ni una cadena con corchetes, muestra un mensaje genérico
    return "Contratos Desconocidos";
  };
  return (
    <div className="custom-container mt-8">
      <br />
      <br />
      <br />
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
            <Link to="/postUsuarios" className="btn btn-primary botonCrearLink">
              Agregar Usuario
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered tablaViaje">
              <thead className="text-center cabecerasDeTabla">
                <tr>
                  <th>Usuario</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
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
                    <td>{usuario.email}</td>
                    <td>{usuario.telefono}</td>
                    <td>{formatContratos(usuario.contrato)}</td>
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
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
              type="text"
              name="password"
              placeholder="Indique rol"
              value={editingUsuario ? editingUsuario.password : ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <p>Seleccionar estado:</p>
            <input
              type="checkbox"
              checked={editingUsuario.estado === "true"}
              onChange={(e) =>
                setEditingUsuario({
                  ...editingUsuario,
                  estado: e.target.checked ? "true" : "false",
                })
              }
            />
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
