import { useEffect } from "react";

import "./app.scss";
import { Login } from "./components/login/Login";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home/Home";
import { OlvidoPass } from "./components/login/OlvidoPass";
import { RecuperarPass } from "./components/login/RecuperarPass";
import FormularioViaje from "./components/admin_viaje/FormularioViaje";
import Itinerario from "./components/admin_viaje/Itinerario";

import FormularioHoteles from "./components/admin_viaje/FormularioHoteles";
import Abm_Viaje from "./components/admin_viaje/Abm_Viaje";

import { useDispatch } from "react-redux";
import AbmHotel from "./components/admin_viaje/AbmHotel";

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
  return (
    <div>
      <Routes>
        <Route exact path="/" Component={Login} />
        <Route path="/home" Component={Home} />
        <Route path="/ForgotPass" Component={OlvidoPass} />
        <Route path="/RecuperarPass/" Component={RecuperarPass} />
        <Route path="/FormularioViaje/" Component={FormularioViaje} />
        <Route path="/CrearItinerario/" Component={Itinerario} />
        <Route path="/ViajesEdicion" Component={Abm_Viaje} />
        <Route path="/AgregarHoteles" Component={FormularioHoteles} />
        <Route path="/ListadoHoteles" Component={AbmHotel} />
      </Routes>
    </div>
  );
}

export default App;
