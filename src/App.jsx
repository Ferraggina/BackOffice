import { useEffect, useState } from "react";

import "./app.scss";
import { Login } from "./components/login/Login";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./components/home/Home";
import { OlvidoPass } from "./components/login/OlvidoPass";
import { RecuperarPass } from "./components/login/RecuperarPass";
import FormularioViaje from "./components/admin_viaje/FormularioViaje";
import Itinerario from "./components/admin_viaje/Itinerario";

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

function App() {
  useEffect(() => {
    // dispatch(getUsers());
  }, []);
  const dispatch = useDispatch();

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
    }
  }, [dispatch]);

  const loggedUserJSON = window.localStorage.getItem("user");

  return (
    <div>
      {loggedUserJSON && <Navbar />}

      <Routes>
        <Route exact path="/" Component={Login} />
        <Route path="/ForgotPass" Component={OlvidoPass} />
        <Route path="/RecuperarPass/" Component={RecuperarPass} />
        <Route path="/AccesoDenegado" Component={AccesoDenegado} />
        {/* Aca van las que necesitan autorizacion */}
        <Route path="/home" element={loggedUserJSON ? <Home /> : <Login />} />
        <Route
          path="/FormularioViaje"
          element={
            loggedUserJSON ? (
              <FormularioViaje />
            ) : (
              <Navigate to="/AccesoDenegado" />
            )
          }
        />
        <Route
          path="/CrearItinerario"
          element={
            loggedUserJSON ? <Itinerario /> : <Navigate to="/AccesoDenegado" />
          }
        />
        {/* <Route path="/FormularioViaje/" Component={FormularioViaje} /> */}
        <Route
          path="/ViajesEdicion"
          element={
            loggedUserJSON ? <AbmViaje /> : <Navigate to="/AccesoDenegado" />
          }
        />
        <Route
          path="/ViajesEdicion"
          element={
            loggedUserJSON ? <AdminViaje /> : <Navigate to="/AccesoDenegado" />
          }
        />
        <Route
          path="/AgregarHoteles"
          element={
            loggedUserJSON ? (
              <FormularioHoteles />
            ) : (
              <Navigate to="/AccesoDenegado" />
            )
          }
        />
        <Route
          path="/ListadoHoteles"
          element={
            loggedUserJSON ? <AbmHotel /> : <Navigate to="/AccesoDenegado" />
          }
        />

        <Route
          path="/AdminViaje"
          element={
            loggedUserJSON ? (
              <AdminPantallaInicio />
            ) : (
              <Navigate to="/AccesoDenegado" />
            )
          }
        />
        <Route
          path="/ImagenesLanding"
          element={
            loggedUserJSON ? (
              <AbmImagenesLandin />
            ) : (
              <Navigate to="/AccesoDenegado" />
            )
          }
        />
        <Route
          path="/textosLanding"
          element={
            loggedUserJSON ? <AbmTexto /> : <Navigate to="/AccesoDenegado" />
          }
        />
        <Route
          path="/Contactos"
          element={
            loggedUserJSON ? (
              <ContactosRecibidos />
            ) : (
              <Navigate to="/AccesoDenegado" />
            )
          }
        />

        <Route
          path="/editUsuarios"
          element={
            loggedUserJSON ? <Abmusuario /> : <Navigate to="/AccesoDenegado" />
          }
        />
        <Route
          path="/postUsuarios"
          element={
            loggedUserJSON ? (
              <CrearUsuarios />
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
