import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerContratos,
  obtenerHoteles,
  obtenerItinerario,
} from "../../redux/actions/actions";
import "./formularioViaje.scss";
import { crearViaje } from "../../redux/actions/actions";

export default function FormularioViaje() {
  // const [nuevoViajeData, setNuevoViajeData] = useState({
  //   destino: "",
  //   hotelId: "",
  //   contratos: "", // Cambia esto según tus necesidades
  //   scheduleId: "",
  // });
  const [nuevoContratoData, setNuevoContratoData] = useState([]);
  const [nuevoHotelIdData, setNuevoHotelIdData] = useState("");
  const [nuevoDestinoData, setNuevoDestinoData] = useState("");
  const [nuevoScheduleIdData, setNuevoScheduleIdData] = useState("");
  const dispatch = useDispatch();
  const nuevoViaje = useSelector((state) => state.nuevoViaje);
  console.log("ACA", nuevoViaje);
  const contratos = useSelector((state) => state.contratos);
  const hoteles = useSelector((state) => state.hoteles);
  const itinerarios = useSelector((state) => state.itinerarios);
  const [contratosSeleccionados, setContratosSeleccionados] = useState([]);

  const error = useSelector((state) => state.error);
  useEffect(() => {
    // Llama a la acción para obtener contratos cuando el componente se monta
    dispatch(obtenerContratos());
    dispatch(obtenerHoteles());
    dispatch(obtenerItinerario());
  }, [dispatch]);

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
    console.log("Contratos seleccionados", contratosSeleccionados);
    // const nuevoContratoArray = Array.isArray(contratosSeleccionados)
    //   ? contratosSeleccionados
    //   : [contratosSeleccionados];

    // Formatea los valores del array como un nuevo array con formato "[num]"
    // const contratosFormateados = contratosSeleccionados
    //   .map((valor) => `[${valor}]`)
    //   .join(",");
    // const contratosFormateados = JSON.stringify(contratosSeleccionados);
    const contratosFormateados = contratosSeleccionados.join(",");

    // Agrega corchetes alrededor de la cadena
    const contratosFinal = `[${contratosFormateados}]`;
    console.log(
      "ACA EL VIAJE ANTES DEL DISPATCH",
      contratosFinal,
      nuevoHotelIdData,
      nuevoDestinoData,
      nuevoScheduleIdData
    );
    dispatch(
      crearViaje({
        contratosFinal,
        nuevoHotelIdData,
        nuevoDestinoData,
        nuevoScheduleIdData,
      })
    ).then(() => {
      // Restablece el valor de nuevoContratoData después de enviar la solicitud
      setNuevoContratoData([]);
    });
  };

  return (
    <form className="container " onSubmit={handleSubmit}>
      <br />
      <br />
      <br />
      <div className="row justify-content-center formularioViajeContenedor">
        <h1 className="text-center tipoLetraViaje">
          Formulario para crear viaje
        </h1>
        <div className="col-md-6">
          <div className="form-group">
            <label>Destino</label>
            <input
              type="text"
              className="form-control"
              id="inputEmail1"
              placeholder="Destino"
              value={nuevoDestinoData}
              onChange={(e) => setNuevoDestinoData(e.target.value)}
            />
          </div>

          <div className="form-group">
            <br />

            <div className="form-group">
              <label htmlFor="opciones">Selecciona un Hotel:</label>
              <select
                className="form-control"
                id="hotel"
                name="hotel"
                value={nuevoHotelIdData}
                onChange={(e) => setNuevoHotelIdData(e.target.value)}
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
              <label>Selecciona un Itinerario</label>
              <select
                className="form-control"
                id="itinerario"
                name="itinerario"
                value={nuevoScheduleIdData}
                onChange={(e) => setNuevoScheduleIdData(e.target.value)}
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

            <div>
              <label>Contratos</label>
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
                multiple // Permite múltiples selecciones
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
          </div>

          <div className="form-group"></div>
          <br />
          <button type="submit" className="btn btn-primary">
            Agregar Viaje
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
  );
}
