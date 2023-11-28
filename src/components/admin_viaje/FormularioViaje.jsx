import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerContratos,
  obtenerHoteles,
  obtenerItinerario,
} from "../../redux/actions/actions";
import "../../sass/_formularioViaje.scss";
import { crearViaje } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";

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
  // Estado para almacenar los detalles del hotel seleccionado
  const [hotelSeleccionado, setHotelSeleccionado] = useState(null);
  const [contratosFiltrados, setContratosFiltrados] = useState([]);

  // Estado para almacenar los detalles del itinerario seleccionado
  const [itinerarioSeleccionado, setItinerarioSeleccionado] = useState(null);
  const error = useSelector((state) => state.error);
  useEffect(() => {
    // Llama a la acción para obtener contratos cuando el componente se monta
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
  const handleSubmit = (e) => {
    e.preventDefault();

    // Formatea el array de contratos como una cadena JSON
    // Asegúrate de que nuevoContratoData sea un array

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
      // Restablece el valor de nuevoContratoData después de enviar la solicitud
      setNuevoContratoData([]);
    });
  };

  return (
    <div className="card-tittle">
      <form className="form-sample " onSubmit={handleSubmit}>
        <br />
        <br />
        <br />
        <h1 className="text-center tituloForm">Formulario para crear viaje</h1>
        <div className="row justify-content-center formularioViajeContenedor">
          <div className="col-md-6">
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
                value={fechaSalida} // Asigna el valor del estado a este campo
                onChange={(e) => setFechaSalida(e.target.value)} // Actualiza el estado cuando cambia el valor
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
                value={fechaRegreso} // Asigna el valor del estado a este campo
                onChange={(e) => setFechaRegreso(e.target.value)} // Actualiza el estado cuando cambia el valor
                required
              />
            </div>

            <div className="form-group">
              <br />

              <div className="form-group">
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
              <br />
              <div>
                <label className="estilosLabels">
                  Selecciona un Itinerario
                </label>
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
                      - Contrato {contrato.num} - Colegio {contrato.colegio}
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
                                {getContractNameById(contractNum)}
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

            <div className="form-group"></div>
            <br />
            <button type="submit" className="btn btn-primary estiloBotones">
              Agregar Viaje
            </button>
            <button
              type="button"
              className="btn btn-primary ml-2 estiloBotones"
              onClick={() => navigate("/home")}
            >
              Volver a administracion
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
