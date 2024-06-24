import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerContratos,
  obtenerHoteles,
  obtenerItinerario,
} from "../../redux/actions/actions";
import "../../sass/_formularioViaje.scss";
import { crearViaje } from "../../redux/actions/actions";
import { Link, useNavigate } from "react-router-dom";

export default function FormularioViaje() {
  const [nuevoContratoData, setNuevoContratoData] = useState([]);
  const [nuevoHotelIdData, setNuevoHotelIdData] = useState("");
  const [nuevoDestinoData, setNuevoDestinoData] = useState("");
  const [nuevoScheduleIdData, setNuevoScheduleIdData] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [fechaRegreso, setFechaRegreso] = useState("");
  const dispatch = useDispatch();
  const nuevoViaje = useSelector((state) => state.nuevoViaje);
  const navigate = useNavigate();
  const contratos = useSelector((state) => state.contratos);
  const hoteles = useSelector((state) => state.hoteles);
  const itinerarios = useSelector((state) => state.itinerarios);
  const [contratosSeleccionados, setContratosSeleccionados] = useState([]);

  const [hotelSeleccionado, setHotelSeleccionado] = useState(null);
  const [contratosFiltrados, setContratosFiltrados] = useState([]);

  const [itinerarioSeleccionado, setItinerarioSeleccionado] = useState(null);
  const error = useSelector((state) => state.error);
  useEffect(() => {
    dispatch(obtenerContratos());
    dispatch(obtenerHoteles());
    dispatch(obtenerItinerario());
  }, [dispatch]);

  useEffect(() => {
    // Busca el hotel correspondiente según el id seleccionado

    if (nuevoHotelIdData && hoteles.length > 0) {
      const hotelEncontrado = hoteles.find(
        (hotel) => hotel.id == nuevoHotelIdData
      );

      setHotelSeleccionado(hotelEncontrado || null); // Si no se encuentra un hotel, establece el estado en null
    } else {
      setHotelSeleccionado(null);
    }
  }, [nuevoHotelIdData, hoteles]);

  useEffect(() => {
    // Busca el itinerario correspondiente según el id seleccionado
    if (nuevoScheduleIdData && itinerarios.length > 0) {
      const itinerarioEncontrado = itinerarios.find(
        (itinerario) => itinerario.id == nuevoScheduleIdData
      );
      setItinerarioSeleccionado(itinerarioEncontrado);
    } else {
      setItinerarioSeleccionado(null);
    }
  }, [nuevoScheduleIdData, itinerarios]);
  useEffect(() => {
    {
      contratos.sort((a, b) => b.num - a.num);
    }
  });

  const toggleContractSelection = (contractNum) => {
    if (contratosSeleccionados.includes(contractNum)) {
      setContratosSeleccionados((prevSelected) =>
        prevSelected.filter((num) => num !== contractNum)
      );
    } else {
      // Si no está seleccionado, agrégaa la lista de contratos seleccionados
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
  const handleSubmit = (e) => {
    e.preventDefault();

    const contratosFormateados = contratosSeleccionados.join(",");

    // Agrega corchetes alrededor de la cadena
    const contratosFinal = `[${contratosFormateados}]`;

    dispatch(
      crearViaje({
        contratosFinal,
        nuevoHotelIdData,
        nuevoDestinoData,
        nuevoScheduleIdData,
        fechaSalida,
        fechaRegreso,
      })
    ).then(() => {
      setNuevoContratoData([]);
    });
    setTimeout(() => {
      navigate("/gestion/ViajesEdicion");
    }, 2000);
  };
  const handleRemoveContract = (contractNumToRemove) => {
    setContratosSeleccionados((prevSelected) =>
      prevSelected.filter((num) => num !== contractNumToRemove)
    );
  };

  return (
    <div className="card-tittle">
      <form className="form-sample " onSubmit={handleSubmit}>
        <br />
        <br />
        <br />
        <h1 className="text-center tituloForm">Formulario para crear viaje</h1>
        <div className="row justify-content-center formularioViajeContenedor">
          <div className="botonCrear">
            <Link
              to="/gestion/AgregarHoteles"
              className="btn btn-primary botonCrearLink"
              title="Agregar Hotel"
            >
              <lord-icon
                src="https://cdn.lordicon.com/fzoffrbp.json"
                trigger="hover"
                style={{ width: "35px", height: "35px" }}
                colors="primary:#ffffff,secondary:#1b1091"
              ></lord-icon>
            </Link>
            <Link
              to="/gestion/CrearItinerario"
              className="btn btn-primary botonCrearLink"
              style={{ marginLeft: "10px" }}
              title="Crear Itinerario"
            >
              <lord-icon
                src="https://cdn.lordicon.com/kgdqzapd.json"
                trigger="hover"
                style={{ width: "35px", height: "35px" }}
                colors="primary:#ffffff,secondary:#1b1091"
              ></lord-icon>
            </Link>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <div className="form-group">
                <label className="estilosLabels">Destino</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail1"
                  placeholder="Destino"
                  value={nuevoDestinoData}
                  onChange={(e) => setNuevoDestinoData(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="estilosLabels">Fecha de salida</label>
                <input
                  type="date"
                  className="form-control"
                  id="fechaSalida"
                  placeholder="Fecha de salida"
                  value={fechaSalida}
                  onChange={(e) => setFechaSalida(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="estilosLabels">Fecha de Regreso</label>
                <input
                  type="date"
                  className="form-control"
                  id="fechaRegreso"
                  placeholder="Fecha de regreso"
                  value={fechaRegreso}
                  onChange={(e) => setFechaRegreso(e.target.value)}
                  required
                />
              </div>
              <label htmlFor="opciones" className="estilosLabels">
                Selecciona un Hotel:
              </label>
              <select
                className="form-control"
                id="hotel"
                name="hotel"
                value={nuevoHotelIdData}
                // onChange={(e) => setNuevoHotelIdData(e.target.value)}
                onChange={(e) => {
                  setNuevoHotelIdData(e.target.value);
                }}
                required
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
              <label className="estilosLabels">Selecciona un Itinerario</label>
              <select
                className="form-control"
                id="itinerario"
                name="itinerario"
                value={nuevoScheduleIdData}
                onChange={(e) => setNuevoScheduleIdData(e.target.value)}
                required
              >
                <option value="">-- Selecciona una opción --</option>

                {itinerarios.map((itinerario) => (
                  <option key={itinerario.id} value={itinerario.id}>
                    {itinerario.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <br />
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
              <div>
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
                          - Contrato {contrato.num} - Colegio:{" "}
                          {contrato.colegio} - Curso: {contrato.curso}
                        </option>
                      ))}
                </select>
              </div>
              <br />
              <h4>Corroboracion de datos:</h4>

              <div>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <div className="form-group">
                          <label className="estilosLabels">
                            Contratos Seleccionados:
                          </label>
                          <ul className="estiloListaContratosSeleccionados">
                            {contratosSeleccionados.map((contractNum) => (
                              <li key={contractNum}>
                                <br />
                                {getContractNameById(contractNum)}
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
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <label className="estilosLabels">Destino:</label>
                          <p className="form-control-static">
                            {nuevoDestinoData}
                          </p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-group">
                          <label className="estilosLabels">
                            Fecha de salida elegida:
                          </label>
                          <p className="form-control-static">{fechaSalida}</p>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <label className="estilosLabels">
                            Fecha de regreso elegida:
                          </label>
                          <p className="form-control-static">{fechaRegreso}</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-group">
                          <label className="estilosLabels">
                            Hotel Seleccionado:
                          </label>
                          {hotelSeleccionado ? (
                            <div>
                              <p>Nombre: {hotelSeleccionado.nombre}</p>
                              <p>Dirección: {hotelSeleccionado.direccion}</p>
                            </div>
                          ) : (
                            <p>No se ha seleccionado un hotel.</p>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <label className="estilosLabels">
                            Itinerario Seleccionado:
                          </label>
                          {itinerarioSeleccionado ? (
                            <div>
                              <p>Nombre: {itinerarioSeleccionado.nombre}</p>
                              {itinerarioSeleccionado.texto_gral ? (
                                <p>
                                  Comentarios de itinerario: <br />
                                  {JSON.parse(
                                    itinerarioSeleccionado.texto_gral
                                  ).map((comentario, index) => (
                                    <span key={index}>
                                      Titulo: {comentario.titulo} <br />{" "}
                                      Descripcion:
                                      {comentario.descripcion} <br />
                                    </span>
                                  ))}
                                </p>
                              ) : (
                                <p>No hay comentarios de itinerario.</p>
                              )}
                            </div>
                          ) : (
                            <p>No se ha seleccionado un itinerario.</p>
                          )}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <br />
            <button
              type="submit"
              className="btn btn-primary estiloBotones"
              title="Agregar Viaje"
            >
              <lord-icon
                src="https://cdn.lordicon.com/smwmetfi.json"
                trigger="hover"
                style={{ width: "30px", height: "30px" }}
                colors="primary:#ffffff,secondary:#1b1091"
              ></lord-icon>
            </button>
            <button
              type="button"
              className="btn btn-primary ml-2 estiloBotones"
              onClick={() => navigate("/gestion/ViajesEdicion")}
              title="Lista de viajes"
            >
              <lord-icon
                src="https://cdn.lordicon.com/depeqmsz.json"
                trigger="hover"
                style={{ width: "30px", height: "30px" }}
                colors="primary:#ffffff,secondary:#1b1091"
              ></lord-icon>
            </button>
          </div>
          {nuevoViaje && (
            <div className="alert alert-success" role="alert">
              Viaje creado con éxito.
            </div>
          )}

          {error && (
            <div className="alert alert-danger" role="alert">
              Error al crear el viaje: {error}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
