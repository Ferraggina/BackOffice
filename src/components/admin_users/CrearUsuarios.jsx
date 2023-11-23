import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { crearUsuario, obtenerContratos } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";

export default function CrearUsuarios() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contrato, setContrato] = useState([]); // Estado local para almacenar contratos seleccionados
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rol, setRol] = useState("");
  const [estado, setEstado] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Barra de búsqueda
  const [contratosSeleccionados, setContratosSeleccionados] = useState([]);
  const [nuevoContratoData, setNuevoContratoData] = useState([]);
  const [contratosFiltrados, setContratosFiltrados] = useState([]);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [usuarioCreado, setUsuarioCreado] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rolesOptions = ["Padre", "Coordinador", "Administrador"];

  const error = useSelector((state) => state.error);
  const contratos = useSelector((state) => state.contratos);

  useEffect(() => {
    dispatch(obtenerContratos());
  }, [dispatch]);

  // const toggleContractSelection = (contractNum) => {
  //   if (contratosSeleccionados.includes(contractNum)) {
  //     // Si ya está seleccionado, quítalo de la lista de contratos seleccionados
  //     setContratosSeleccionados((prevSelected) =>
  //       prevSelected.filter((num) => num !== contractNum)
  //     );
  //   } else {
  //     // Si no está seleccionado, agrégalo a la lista de contratos seleccionados
  //     setContratosSeleccionados((prevSelected) => [
  //       ...prevSelected,
  //       contractNum,
  //     ]);
  //   }
  // };
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

  const filteredContratos = contratos.filter((contract) =>
    contract.num.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const contratosFinal = `[${contratosSeleccionados.join(",")}]`;
    const nuevoUsuario = {
      nombre,
      apellido,
      usuario,
      email,
      telefono,
      contrato: contratosSeleccionados.map((contract) => contract.toString()),
      password,
      rol,
      estado: estado,
    };

    dispatch(crearUsuario(nuevoUsuario))
      .then(() => {
        // navigate("/home");
        console.log("contratosFinal", contratosFinal);
        setUsuarioCreado(true);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((err) => {
        console.error("Error al crear el usuario: ", err);
      });
  };
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Verificar si la contraseña coincide con la confirmación
    if (newPassword === confirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    // Verificar si la contraseña coincide con la confirmación
    if (password === newConfirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

  return (
    <div className="card-tittle">
      <form className="form-sample" onSubmit={handleSubmit}>
        <br />
        <br />
        <br />
        <h1 className="text-center tituloForm">
          Formulario para crear usuario
        </h1>
        <div className="row justify-content-center formularioViajeContenedor">
          <div className="col-md-6">
            <div className="form-group">
              <label className="estilosLabels">Nombre</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="estilosLabels">Apellido</label>
              <input
                type="text"
                className="form-control"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="estilosLabels">
                Usuario (obligatorio y único)
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Usuario debe ser un DNI sin puntos"
                value={usuario}
                onChange={(e) => {
                  // Limitar la longitud máxima a 8 caracteres
                  if (e.target.value.length <= 8) {
                    setUsuario(e.target.value);
                  }
                }}
                required
                maxLength="8"
              />
            </div>
            <div className="form-group">
              <label className="estilosLabels">Email (obligatorio)</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="estilosLabels">Telefono </label>
              <input
                type="text"
                className="form-control"
                placeholder="+54 11-1111-1111"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="estilosLabels">Contraseña (obligatorio)</label>
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="estilosLabels">
                Confirmar Contraseña (obligatorio)
              </label>
              <input
                type="password"
                className={`form-control ${!passwordMatch && "is-invalid"}`}
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              {!passwordMatch && (
                <div className="invalid-feedback">
                  Las contraseñas no coinciden.
                </div>
              )}
            </div>
            <div className="form-group">
              <label className="estilosLabels">Rol (obligatorio)</label>
              <select
                className="form-control"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                required
              >
                <option value="">Selecciona un rol:</option>
                {rolesOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <p>Seleccionar estado:</p>
              <input
                type="checkbox"
                checked={estado}
                onChange={(e) => setEstado(e.target.checked)}
              />
            </div>
            <div className="form-group">
              <label className="estilosLabels">Buscar Contratos</label>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar Contratos"
                onChange={(e) => {
                  const searchTerm = e.target.value.toLowerCase();
                  const filteredContracts = contratos.filter(
                    (contract) =>
                      contract.num.toLowerCase().includes(searchTerm) ||
                      contract.colegio.toLowerCase().includes(searchTerm)
                  );
                  setContratosFiltrados(filteredContracts);
                }}
              />
            </div>
            <div className="form-group">
              <label className="estilosLabels">Contratos</label>
              <select
                className="form-control"
                id="contrato"
                name="contrato"
                value={nuevoContratoData}
                onChange={(e) =>
                  setNuevoContratoData(
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
                required
                multiple // Permite múltiples selecciones
              >
                <option value="">Elije los contratos:</option>
                {contratosFiltrados.map((contrato) => (
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
                    - Contrato {contrato.num} -Colegio: {contrato.colegio}{" "}
                    -Curso: {contrato.curso}
                  </option>
                ))}
              </select>
            </div>

            <br />

            <div>
              <h4>Corroboración de Datos:</h4>
              <div>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <div className="form-group">
                          <label className="estilosLabels">Nombre:</label>
                          <p className="form-control-static">{nombre}</p>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <label className="estilosLabels">Apellido:</label>
                          <p className="form-control-static">{apellido}</p>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <label className="estilosLabels">Usuario:</label>
                          <p className="form-control-static">{usuario}</p>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <label className="estilosLabels">Telefono:</label>
                          <p className="form-control-static">{telefono}</p>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <label className="estilosLabels">Email:</label>
                          <p className="form-control-static">{email}</p>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <label className="estilosLabels">Rol:</label>
                          <p className="form-control-static">{rol}</p>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <label className="estilosLabels">
                            Contratos Seleccionados:
                          </label>
                          <ul className="estiloListaContratosSeleccionados">
                            {contratosSeleccionados.map((contractNum) => (
                              <li key={contractNum}>
                                {getContractNameById(contractNum)}
                                {console.log(
                                  "contrato",
                                  contratosSeleccionados
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <button type="submit" className="btn btn-primary estiloBotones">
              Crear Usuario
            </button>
            {usuarioCreado && (
              <div className="alert alert-success" role="alert">
                Usuario creado con éxito.
              </div>
            )}

            {error && (
              <div className="alert alert-danger" role="alert">
                Error al crear el usuario: {error}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
