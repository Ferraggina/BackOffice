import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "../../sass/_medioDePago.scss";
import { crearMedioDePago } from "../../redux/actions/actions";
import { reuleaux } from "ldrs";
import { Link, useNavigate } from "react-router-dom";

export default function MedioDePago() {
  const [nombre, setNombre] = useState("");
  const defaultCamposMdp = [{medio_de_pago: "Contado", cuotas: 1, importe: 0, disponible: false},{medio_de_pago: "Dolares", cuotas: 1, importe: 0, disponible: false},{medio_de_pago: "6 Cuotas", cuotas: 1, importe: 0, disponible: false}];
  const [isLoading, setIsLoading] = useState(true);
  const [camposMdp, setCamposMdp] = useState(defaultCamposMdp);
  const [alert, setAlert] = useState(null); // Estado para la alerta
  const dispatch = useDispatch();
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false); // Cambia el estado a false después de un tiempo (simulación de carga)
    }, 1500); // Cambia el número a la cantidad de tiempo que desees simular

    return () => clearTimeout(timeout);
  }, [dispatch]);
  // const handleCampoExtraChange = (index, field, value) => {
  //   const newCamposExtras = [...camposExtras];
  //   newCamposExtras[index][field] = value;
  //   setCamposExtras(newCamposExtras);
  // };

  const handleCampoExtraChange = (index, field, value) => {
    const newCamposMdp = [...camposMdp];
    if (field === "medio_de_pago") {
      newCamposMdp[index].medio_de_pago = value;
    } else if (field === "cuotas") {
      if (value >= 0) {
        newCamposMdp[index].cuotas = value;
      }
    } else if (field === "importe") {
      if (value >= 0) {
        newCamposMdp[index].importe = value;
      }
    } else if (field === "disponible") { // para este no uso el value, si no que me fijo si esta checkeado o no
        newCamposMdp[index].disponible = (document.getElementById('checkbox-mdp').checked);
    }
    setCamposMdp(newCamposMdp);
  };

  const handleAgregarMedioDePago = () => {
    setCamposMdp([...camposMdp, {medio_de_pago: "", cuotas: 1, importe: 0, disponible: false}]);
  };
  const handleEliminarMedioDePago = (index) => {
    const newCamposExtras = [...camposMdp];
    newCamposExtras.splice(index, 1);
    setCamposMdp(newCamposExtras);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifico que esten todos los mdp tengan titulo
    if (camposMdp.every((campo) => !(campo.medio_de_pago === ""))) {
      const nuevoMedioDePago = {
        nombre: nombre,
        texto_gral: camposMdp,
      };

      console.log("asi se envia el MedioDePago", nuevoMedioDePago);

      try {
        // Llamar a la acción para crear el medio de pago
        await dispatch(crearMedioDePago(nuevoMedioDePago));
        // Limpiar los campos del formulario
        setNombre("");
        setCamposMdp(defaultCamposMdp);

        // Mostrar una alerta de éxito
        setAlert({
          type: "success",
          message: "Su Medio de Pago se creó exitosamente.",
        });
      } catch (error) {
        console.log("asd3");
        // Mostrar una alerta de error
        setAlert({
          type: "danger",
          message: "Hubo un error al crear el Medio de Pago.",
        });
      }
    } else {
      // Muestra una alerta de error si algun mdp no tiene titulo
      setAlert({
        type: "danger",
        message:
          "Todos los medios de pago deben tener título.",
      });
    }
    setTimeout(() => {
      navigate("/gestion/mediosdepago/");
    }, 2000);
  };

  return (
    <div className="card-tittle">
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
        <div>
          <h1 className="text-center tituloForm">Crear Medio de Pago</h1>

          <form className="form-sample " onSubmit={handleSubmit}>
            <div className="row justify-content-center formularioMedioDePagoContenedor">
              <div>
                {alert && (
                  <div className={`alert alert-${alert.type}`} role="alert">
                    {alert.message}
                  </div>
                )}
              </div>
              <div className="col-md-6">
                {/* ...otros campos */}
                <div className="form-group">
                  <label className="estilosLabels">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                    value={nombre}
                    required
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <div className="estiloParaCampos">
                    {camposMdp.map((campo, index) => (
                      <div key={index} className="campo-extra-container">
                        <button
                          type="button"
                          onClick={() => handleEliminarMedioDePago(index)}
                          className="btn btn-danger eliminacampoextra"
                          title="Eliminar Campo Extra"
                        >
                          X
                        </button>
                        <br />
                        <label className="estilosLabels">Medio de Pago {index + 1}:</label>
                        <br/>
                        <br/>
                        <label>Titulo</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ejemplo: 6 Cuotas"
                          required
                          value={campo.medio_de_pago}
                          onChange={(e) =>
                            handleCampoExtraChange(
                              index,
                              "medio_de_pago",
                              e.target.value
                            )
                          }
                          maxLength={100}
                        />
                        <br />

                        <label>Cuotas</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Ejemplo: 6"
                          value={campo.cuotas}
                          onChange={(e) =>
                            handleCampoExtraChange(
                              index,
                              "cuotas",
                              e.target.value
                            )
                          }
                          min="0"
                        />
                        <br />

                        <label>Importe</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Ejemplo: 6 Cuotas"
                          value={campo.importe}
                          required
                          onChange={(e) =>
                            handleCampoExtraChange(
                              index,
                              "importe",
                              e.target.value
                            )
                          }
                          min="0"
                        />
                        <br />

                        <label>Estado habilitado</label>
                        <br/>
                        <input
                          type="checkbox"
                          id="checkbox-mdp"
                          className="form"
                          placeholder="Ejemplo: 6 Cuotas"
                          value={campo.disponible}
                          onChange={(e) =>
                            handleCampoExtraChange(
                              index,
                              "disponible",
                              e.target.value
                            )
                          }
                        />
                        <br />
                        <hr/>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAgregarMedioDePago()}
                      className="btn btn-secondary"
                      title="Agregar otro medio de pago"
                    >
                      <lord-icon
                        src="https://cdn.lordicon.com/ghhwiltn.json"
                        trigger="hover"
                        colors="primary:#1b1091,secondary:#e4e4e4"
                        style={{ width: "30px", height: "30px" }}
                      ></lord-icon>
                    </button>
                  </div>
                  
                  <button
                    type="submit"
                    className="btn btn-primary estiloBotones"
                    onClick={handleSubmit}
                    title="Enviar Medio de Pago"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/smwmetfi.json"
                      trigger="hover"
                      style={{ width: "30px", height: "30px" }}
                      colors="primary:#ffffff,secondary:#1b1091"
                    ></lord-icon>
                  </button>
                  
                  <Link
                    to="/gestion/mediosdepago"
                    className="btn btn-primary estiloBotones"
                    title="Lista de Medios de Pago"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/zyzoecaw.json"
                      trigger="hover"
                      style={{ width: "30px", height: "30px" }}
                      colors="primary:#ffffff,secondary:#1b1091"
                    ></lord-icon>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
