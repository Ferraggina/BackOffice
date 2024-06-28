import "../../app.scss";
import { useState, useEffect } from "react"; // Importa useState y useEffect
import { useSelector } from "react-redux";
import { AdminPantallaInicio } from "../admin_pantalla_inicio/AdminPantallaInicio";
import { AdminViaje } from "../admin_viaje/AdminViaje";
// import Navbar from "./Navbar";
import { reuleaux } from "ldrs";
import {
  readDataFromFirebase,
  writeDataToFirebase,
} from "../../../firebaseUtils";
import "../../sass/_home.scss";
import { AdminFinanciacion } from "../admin_viaje/AdminFinanciacion";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useSelector((state) => state.currentUser.usuario);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="home">
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
            <AdminFinanciacion />
          </div>
        </>
      )}
    </div>
  );
}
