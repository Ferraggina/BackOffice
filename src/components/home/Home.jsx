// import { Link } from "react-router-dom";
// import "../../app.scss";

// import { useSelector } from "react-redux";
// import { AdminPantallaInicio } from "../admin_pantalla_inicio/AdminPantallaInicio";

// import { AdminViaje } from "../admin_viaje/AdminViaje";
// // import Navbar from "./Navbar";

// export function Home() {
//   const currentUser = useSelector((state) => state.currentUser.usuario);
//   console.log(currentUser);
//   return (
//     <div className="home">
//       {/* <div>
//         <h1>
//           {" "}
//           <Navbar />
//         </h1>
//       </div> */}
//       <h2>Bienvenido/a ,{currentUser}</h2>
//       <br />
//       <div className="d-flex flex-column align-items-center">
//         <AdminPantallaInicio />
//         <AdminViaje />
//       </div>
//     </div>
//   );
// }
import { Link } from "react-router-dom";
import "../../app.scss";
import { useState, useEffect } from "react"; // Importa useState y useEffect
import { useSelector } from "react-redux";
import { AdminPantallaInicio } from "../admin_pantalla_inicio/AdminPantallaInicio";
import { AdminViaje } from "../admin_viaje/AdminViaje";
// import Navbar from "./Navbar";
import { reuleaux } from "ldrs";

export function Home() {
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar carga
  const currentUser = useSelector((state) => state.currentUser.usuario);
  console.log(currentUser);

  useEffect(() => {
    // Simulación de tiempo de carga (puedes reemplazarlo por tu lógica de carga real)
    const timeout = setTimeout(() => {
      setIsLoading(false); // Cambia el estado a false después de un tiempo (simulación de carga)
    }, 6500); // Cambia el número a la cantidad de tiempo que desees simular

    return () => clearTimeout(timeout); // Limpia el timeout en caso de que el componente se desmonte antes de que termine la carga simulada
  }, []);

  return (
    <div className="home">
      {/* Mostrar spinner si isLoading es true */}
      {isLoading ? (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <div className="spinner">
            {/* Contenido del spinner */}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
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
        <>
          <h2>Bienvenido/a, {currentUser}</h2>
          <br />
          <div className="d-flex flex-column align-items-center">
            <AdminPantallaInicio />
            <AdminViaje />
          </div>
        </>
      )}
    </div>
  );
}
