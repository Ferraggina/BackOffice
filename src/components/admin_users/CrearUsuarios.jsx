import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { crearUsuario, obtenerContratos } from "../../redux/actions/actions";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "../../sass/_abmUsuarios.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function CrearUsuarios() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rol, setRol] = useState("");
  const [estado, setEstado] = useState(false);

  const [contratosSeleccionados, setContratosSeleccionados] = useState([]);
  const [nuevoContratoData, setNuevoContratoData] = useState([]);
  const [contratosFiltrados, setContratosFiltrados] = useState([]);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [usuarioCreado, setUsuarioCreado] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showPasswordVerification, setShowPasswordVerification] =
    useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rolesOptions = ["Padre", "Coordinador", "Administrador"];

  const error = useSelector((state) => state.error);
  const contratos = useSelector((state) => state.contratos);

  useEffect(() => {
    dispatch(obtenerContratos());
  }, [dispatch]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    // Verificar si el rol es "Coordinador" para  Firebase
    if (rol === "Coordinador" || rol === "Administrador" || rol === "Padre") {
      try {
        // Lógica para crear el usuario en el backend
        await dispatch(crearUsuario(nuevoUsuario));

        // Lógica para crear el usuario en Firebase Authentication
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("Usuario creado en Firebase:", user);

        //  Crear el usuario en Firebase y en el backend
        setTimeout(() => {
          setUsuarioCreado(true); // esto lo movi aca para que solo muestre el mensaje de OK si se ejecuto bien lo anterior (al estar eso en un await, pasaba que se seteaba siempre independientemente del estado, generando que se mostrara por pantalla el mensaje de OK y el de error)
          navigate("/gestion/editUsuarios");
        }, 1000);
      } catch (error) {
        console.error("Error al crear el usuario: ", error);
      }
    } else {
      // Si el rol no es "Coordinador", simplemente crea el usuario en el backend
      try {
        await dispatch(crearUsuario(nuevoUsuario));
        setUsuarioCreado(true);

        //  crear el usuario en el backend
        setTimeout(() => {
          navigate("/editUsuarios");
        }, 1000);
      } catch (error) {
        console.error("Error al crear el usuario: ", error);
      }
    }
  };
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setClicked(false);

    // Verificar si la contraseña coincide con la confirmación
    if (newPassword === confirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibilityVerification = () => {
    setShowPasswordVerification(!showPasswordVerification);
  };
  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (password === newConfirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };
  const validatePassword = (password) => {
    const regex = /^\d{4,}$/;
    return regex.test(password);
  };
  const handleClick = () => {
    setClicked(true);
  };
  const handleRemoveContract = (contractNumToRemove) => {
    setContratosSeleccionados((prevSelected) =>
      prevSelected.filter((num) => num !== contractNumToRemove)
    );
  };
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isValidEmail = emailRegex.test(newEmail);

    if (!isValidEmail && newEmail !== "") {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };
  const handleContractSelection = (contractNum) => {
    if (contractNum === "0") {
      setContratosSeleccionados([...contratosSeleccionados, contractNum]);
    } else {
      toggleContractSelection(contractNum);
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
                maxLength={30}
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
                maxLength={30}
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
            {/* <div className="form-group">
              <label className="estilosLabels">Email (obligatorio)</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={50}
              />
            </div> */}
            <div className="form-group">
              <label className="estilosLabels">Email (obligatorio)</label>
              <input
                type="email"
                className={`form-control ${emailError ? "error" : ""}`}
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                required
                maxLength={50}
              />
              {emailError && (
                <p className="text-danger">
                  Por favor ingresa un correo electrónico válido.
                </p>
              )}
            </div>
            <div className="form-group">
              <label className="estilosLabels">Telefono </label>
              <input
                type="number"
                className="form-control"
                placeholder="+54 11-1111-1111"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
                maxLength="8"
              />
            </div>
            <div className="form-group">
              <label className="estilosLabels">Contraseña (obligatorio)</label>
              <input
                type={showPassword ? "password" : "text"}
                className="form-control"
                placeholder="La contraseña debe ser 4 caracteres"
                value={password}
                onChange={handlePasswordChange}
                onClick={handleClick}
                required
                maxLength={4}
              />
              <span className="password-messages">
                {!validatePassword(password) && (
                  <p className="text-danger">4 caracteres numerales | 0-9 |</p>
                )}
                {validatePassword(password) && (
                  <p className="text-success">
                    ¡La contraseña cumple con los requisitos!
                  </p>
                )}
              </span>
              <span
                className="password-toggle-icon ocultarPass"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>

            <div className="form-group">
              <label className="estilosLabels">
                Confirmar Contraseña (obligatorio)
              </label>
              <input
                type={showPasswordVerification ? "password" : "text"}
                className="form-control "
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                maxLength={4}
              />
              <span className="password-messages">
                {!passwordMatch && (
                  <div className="text-danger">
                    Las contraseñas no coinciden.
                  </div>
                )}
              </span>
              <span
                className="password-toggle-icon ocultarPass2"
                onClick={togglePasswordVisibilityVerification}
              >
                <FontAwesomeIcon
                  icon={showPasswordVerification ? faEyeSlash : faEye}
                />
              </span>
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
            <br />
            <p className="me-3 seleccionestado">Seleccionar estado:</p>
            <div className="mb-3 d-flex align-items-center">
              <p className="me-5">Desactivado</p>
              <div className="form-check form-switch mb-4">
                <input
                  className="form-check-input switchEstado "
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                  checked={estado}
                  onChange={(e) => setEstado(e.target.checked)}
                />
              </div>
              <p className="me-2 activadoClase">Activado</p>
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
                multiple
              >
                <option value="">Elije los contratos:</option>
                <option value="0" onClick={() => handleContractSelection("0")}>
                  Contrato de Administrador
                </option>

                {contratosFiltrados.length > 0
                  ? contratosFiltrados.map((contrato) => (
                      <option
                        key={contrato.id}
                        value={contrato.num}
                        onChange={obtenerContratos()}
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
                    ))
                  : contratos.map((contrato) => (
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
                        - Contrato {contrato.num} - Colegio: {contrato.colegio}{" "}
                        - Curso: {contrato.curso}
                      </option>
                    ))}
              </select>
            </div>

            <br />

            <div>
              <h4>Corroboración de Datos:</h4>
              <div className="texto-largo ">
                <table className="table ">
                  <tbody>
                    <tr>
                      <td>
                        <div className="form-group">
                          <label className="estilosLabels">Nombre:</label>
                          <p className="form-control-static ">{nombre}</p>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <label className="estilosLabels">Apellido:</label>
                          <p className="form-control-static">{apellido}</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
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
                    </tr>
                    <tr>
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
                    </tr>
                    <tr>
                      <td>
                        <div className="form-group">
                          <br />
                          <label className="estilosLabels">
                            Contratos Seleccionados:
                          </label>
                        </div>
                      </td>
                      <td>
                        <ul className="estiloListaContratosSeleccionados">
                          {contratosSeleccionados.map((contractNum) => (
                            <li key={contractNum}>
                              <br />
                              {/* {getContractNameById(contractNum)} */}
                              {contractNum === "0"
                                ? "Contrato de Administrador"
                                : getContractNameById(contractNum)}
                              <span
                                className="eliminarContrato"
                                onClick={() =>
                                  handleRemoveContract(contractNum)
                                }
                              >
                                X
                              </span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary estiloBotones"
              title="Agregar usuarios "
            >
              <lord-icon
                src="https://cdn.lordicon.com/hrjifpbq.json"
                trigger="hover"
                style={{ width: "30px", height: "30px" }}
                colors="primary:#ffffff,secondary:#1b1091"
              ></lord-icon>
            </button>
            <Link
              to="/gestion/editUsuarios"
              className="btn btn-primary estiloBotones"
              title="Lista de Usuarios"
            >
              <lord-icon
                src="https://cdn.lordicon.com/depeqmsz.json"
                trigger="hover"
                style={{ width: "30px", height: "30px" }}
                colors="primary:#ffffff,secondary:#1b1091"
              ></lord-icon>
            </Link>
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
