import { useEffect } from "react";

import "./app.scss";
import { Login } from "./components/login/Login";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home/Home";
import { OlvidoPass } from "./components/login/OlvidoPass";
import { RecuperarPass } from "./components/login/RecuperarPass";
import FormularioViaje from "./components/admin_viaje/FormularioViaje";
import Itinerario from "./components/admin_viaje/Itinerario";
import abm_Viaje from "./components/admin_viaje/abm_Viaje";

function App() {
  useEffect(() => {
    // dispatch(getUsers());
  }, []);

  return (
    <div>
      <Routes>
        <Route exact path="/" Component={Login} />
        <Route path="/home" Component={Home} />
        <Route path="/ForgotPass" Component={OlvidoPass} />
        <Route path="/RecuperarPass/" Component={RecuperarPass} />
        <Route path="/FormularioViaje/" Component={FormularioViaje} />
        <Route path="/CrearItinerario/" Component={Itinerario} />
        <Route path="/ViajesEdicion" Component={abm_Viaje} />
      </Routes>
    </div>
  );
}

export default App;
