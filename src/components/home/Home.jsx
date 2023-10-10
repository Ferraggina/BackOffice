import { Link } from "react-router-dom";
import "../../app.scss";

import { useSelector } from "react-redux";
import { AdminPantallaInicio } from "../admin_pantalla_inicio/adminPantallaInicio";
import { AdminUsers } from "../admin_users/adminUsers";
import { AdminViaje } from "../admin_viaje/adminViaje";
export function Home() {
  const currentUser = useSelector((state) => state.currentUser.usuario);
  console.log(currentUser);
  return (
    <div className="home">
      <h1>Bienvenido/a ,{currentUser}</h1>
      <div>
        <AdminPantallaInicio />
        <AdminUsers />
        <AdminViaje />
      </div>
    </div>
  );
}
