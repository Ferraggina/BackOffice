import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLandingForm } from "../../redux/actions/actions"; // Asegúrate de importar la acción adecuada
import "../../sass/_abm_Viaje.scss";
import Pagination from "../home/Pagination";

export default function ContactosRecibidos() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const dispatch = useDispatch();
  const landingDataForm = useSelector((state) => state.landingDataForm);

  useEffect(() => {
    dispatch(getLandingForm());
  }, [dispatch]);
  const filterLanding = (landing) => {
    // Calcular el índice del primer elemento y del último elemento en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Obtener los elementos de la página actual
    const currentItems = landing.slice(indexOfFirstItem, indexOfLastItem);

    return currentItems;
  };
  const handlePageChange = (pageNumber) => {
    console.log(`Cambiando a la página ${pageNumber}`);
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reiniciar a la primera página cuando cambie la cantidad de elementos por página
  };
  return (
    <div className="custom-container mt-8">
      <br />
      <br />
      <br />
      <br />
      <div className="cardViajes">
        <br />
        <h2 className="text-center encabezadoLista">Contactos Recibidos</h2>
        <br />
        <div className="table-responsive">
          <table className="table table-bordered tablaViaje">
            <thead className="text-center cabecerasDeTabla">
              <tr>
                <th>Nombre</th>
                <th>Correo Electrónico</th>
                <th>Teléfono</th>
                <th>Comentario</th>
                <th>Horario de Contacto</th>
              </tr>
            </thead>
            <tbody className="text-center cuerpoTabla">
              {filterLanding(landingDataForm).map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.nombre}</td>
                  <td>{contact.mail}</td>
                  <td>{contact.telefono}</td>
                  <td>{contact.comentario}</td>
                  <td>{contact.horario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination  d-flex justify-content-center align-items-center">
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={landingDataForm.length}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          <p className="mx-2 textoItemsViaje ">
            Cantidad de contactos por pagina:
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
    </div>
  );
}
