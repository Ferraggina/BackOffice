import { useEffect, useState } from "react";

import "./app.scss";
import { Login } from "./components/login/Login";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./components/home/Home";
import { OlvidoPass } from "./components/login/OlvidoPass";
import { RecuperarPass } from "./components/login/RecuperarPass";
import FormularioViaje from "./components/admin_viaje/FormularioViaje";
import Itinerario from "./components/admin_viaje/Itinerario";
import MedioDePago from "./components/admin_viaje/MedioDePago";

import FormularioHoteles from "./components/admin_viaje/FormularioHoteles";

import { useDispatch } from "react-redux";
import AbmHotel from "./components/admin_viaje/AbmHotel";

import AbmImagenesLandin from "./components/admin_pantalla_inicio/AbmImagenesLandin";
import AccesoDenegado from "./components/login/AccesoDenegado";
import Navbar from "./components/home/Navbar";
import AbmTexto from "./components/admin_pantalla_inicio/AbmTexto";
import ContactosRecibidos from "./components/admin_pantalla_inicio/ContatosRecividos";

import CrearUsuarios from "./components/admin_users/CrearUsuarios";

import { AdminViaje } from "./components/admin_viaje/AdminViaje";

import { AdminPantallaInicio } from "./components/admin_pantalla_inicio/AdminPantallaInicio";
import AbmViaje from "./components/admin_viaje/AbmViaje";
import Abmusuario from "./components/admin_users/Abmusuarios";
import AbmItinerario from "./components/admin_viaje/AbmItinerario";
import AbmMediosDePago from "./components/admin_viaje/AbmMediosDePago";
import AbmPasajeros from "./components/admin_users/AbmPasajeros";
import MedioDePagoVisualizacion from "./components/admin_viaje/AbmMediosDePago";
import AgregarFinanciacionContrato from "./components/admin_viaje/AgregarFinanciacionContrato";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(() => {
    // dispatch(getUsers());
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    // Recupera la información del usuario del Local Storage
    const user = JSON.parse(localStorage.getItem("user"));

    // Verifica si hay un usuario autenticado almacenado
    if (user) {
      // Establece el estado de autenticación en tu Redux Store
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });
      setUserLoggedIn(true);
    }
  }, [dispatch]);

  const loggedUserJSON = window.localStorage.getItem("user");

  return (
    <div>
      {loggedUserJSON && <Navbar />}

      <Routes>
        {/* <Route exact path="/" Component={Login} /> */}
        {!userLoggedIn && <Route path="/gestion" element={<Login />} />}
        {userLoggedIn && (
          <Route path="/gestion" element={<Navigate to="/gestion/home" />} />
        )}
        <Route path="/gestion/ForgotPass" Component={OlvidoPass} />
        <Route path="/gestion/RecuperarPass/" Component={RecuperarPass} />
        <Route path="/AccesoDenegado" Component={AccesoDenegado} />
        {/* Aca van las que necesitan autorizacion */}
        <Route
          path="/gestion/home"
          element={loggedUserJSON ? <Home /> : <Login />}
        />
        <Route
          path="/gestion/FormularioViaje"
          element={
            loggedUserJSON ? (
              <FormularioViaje />
            ) : (
              <Navigate to="/AccesoDenegado" />
            )
          }
        />
        <Route
          path="/gestion/CrearItinerario"
          element={
            loggedUserJSON ? <Itinerario /> : <Navigate to="/AccesoDenegado" />
          }
        />
        {/* <Route path="/FormularioViaje/" Component={FormularioViaje} /> */}
        <Route
          path="/gestion/ViajesEdicion"
          element={
            loggedUserJSON ? <AbmViaje /> : <Navigate to="/AccesoDenegado" />
          }
        />
        <Route
          path="/gestion/ViajesEdicion"
          element={
            loggedUserJSON ? <AdminViaje /> : <Navigate to="/AccesoDenegado" />
          }
        />
        <Route
          path="/gestion/AgregarHoteles"
          element={
            loggedUserJSON ? (
              <FormularioHoteles />
            ) : (
              <Navigate to="/AccesoDenegado" />
            )
          }
        />
        <Route
          path="/gestion/ListadoHoteles"
          element={
            loggedUserJSON ? <AbmHotel /> : <Navigate to="/AccesoDenegado" />
          }
        />

        <Route
          path="/gestion/AdminViaje"
          element={
            loggedUserJSON ? (
              <AdminPantallaInicio />
            ) : (
              <Navigate to="/AccesoDenegado" />
            )
          }
        />
        <Route
          path="/gestion/ImagenesLanding"
          element={
            loggedUserJSON ? (
              <AbmImagenesLandin />
            ) : (
              <Navigate to="/AccesoDenegado" />
            )
          }
        />
        <Route
          path="/gestion/promocionLanding"
          element={
            loggedUserJSON ? <AbmTexto /> : <Navigate to="/AccesoDenegado" />
          }
        />
        <Route
          path="/gestion/Contactos"
          element={
            loggedUserJSON ? (
              <ContactosRecibidos />
            ) : (
              <Navigate to="/AccesoDenegado" />
            )
          }
        />

        <Route
          path="/gestion/editUsuarios"
          element={
            loggedUserJSON ? <Abmusuario /> : <Navigate to="/AccesoDenegado" />
          }
        />
        <Route
          path="/gestion/postUsuarios"
          element={
            loggedUserJSON ? (
              <CrearUsuarios />
            ) : (
              <Navigate to="/AccesoDenegado" />
            )
          }
        />
        <Route
          path="/gestion/listaItinerarios"
          element={
            loggedUserJSON ? (
              <AbmItinerario />
            ) : (
              <Navigate to="/AccesoDenegado" />
            )
          }
        />
        <Route
          path="/gestion/pasajeros"
          element={
            loggedUserJSON ? (
              <AbmPasajeros />
            ) : (
              <Navigate to="/AccesoDenegado" />
            )
          }
        />
        <Route
          path="/gestion/mediosdepago"
          element={
            loggedUserJSON ? (
              <AbmMediosDePago />
            ) : (
              <Navigate to="/AccesoDenegado" />
            )
          }
        />
        <Route
          path="/gestion/mediosdepagoAcontratos"
          element={
            loggedUserJSON ? (
              <AgregarFinanciacionContrato />
            ) : (
              <Navigate to="/AccesoDenegado" />
            )
          }
        />
        <Route
          path="/gestion/CrearMedioDePago"
          element={
            loggedUserJSON ? (
              <MedioDePago />
            ) : (
              <Navigate to="/AccesoDenegado" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
