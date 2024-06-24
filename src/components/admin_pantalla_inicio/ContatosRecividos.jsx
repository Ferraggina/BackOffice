import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLandingForm,
  markAllMessagesAsRead,
} from "../../redux/actions/actions";
import "../../sass/_abm_Viaje.scss";
import Pagination from "../home/Pagination";
import { reuleaux } from "ldrs";

export default function ContactosRecibidos() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const dispatch = useDispatch();
  const landingDataForm = useSelector((state) => state.landingDataForm);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getLandingForm());

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [dispatch]);
  useEffect(() => {}, [dispatch]);
  const filterLanding = (landing) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Obtener los elementos de la página actual
    const currentItems = landing.slice(indexOfFirstItem, indexOfLastItem);

    return currentItems;
  };
  const handlePageChange = (pageNumber) => {
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
                  {/* <th>Horario de Contacto</th> */}
                </tr>
              </thead>
              <tbody className="text-center cuerpoTabla">
                {filterLanding(landingDataForm).map((contact) => (
                  <tr key={contact.id}>
                    <td>{contact.nombre}</td>
                    <td>{contact.mail}</td>
                    <td>{contact.telefono}</td>
                    <td>{contact.comentario}</td>
                    {/* <td>{contact.horario}</td> */}
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
    </div>
  );
}
