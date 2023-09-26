import React from "react";
import "./formularioViaje.scss";
export default function FormularioViaje() {
  return (
    <form className="container ">
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
            />
          </div>
          <div className="form-group">
            <label>Ingreso</label>
            <input
              type="date"
              className="form-control"
              id="inputEmail2"
              placeholder="Ingreso"
            />
          </div>
          <div className="form-group">
            <label>Salida</label>
            <input
              type="date"
              className="form-control"
              id="inputEmail3"
              placeholder="Salida"
            />
          </div>
          <div className="form-group">
            <label>Datos del Hotel:</label>
            <br />

            <label>Ubicacion</label>
            <input
              type="text"
              className="form-control"
              id="inputEmail4"
              placeholder="Ubicacion"
            />
            <label>Nombre</label>
            <input
              type="text"
              className="form-control"
              id="inputEmail4"
              placeholder="Nombre"
            />
            <label>Direccion</label>
            <input
              type="text"
              className="form-control"
              id="inputEmail4"
              placeholder="Direccion"
            />
            <label>Telefono</label>
            <input
              type="number"
              className="form-control"
              id="inputEmail4"
              placeholder="Telefono"
            />
            <label>Imagenes</label>
            <input
              type="file"
              className="form-control"
              id="inputEmail4"
              placeholder="Imagen"
            />
          </div>

          <div className="form-group"></div>
          <br />
          <button type="submit" className="btn btn-primary">
            Agregar Viaje
          </button>
        </div>
      </div>
    </form>
  );
}
