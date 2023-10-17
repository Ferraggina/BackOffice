import { Link } from "react-router-dom";
import "../../app.scss";

import { useSelector } from "react-redux";
import { AdminPantallaInicio } from "../admin_pantalla_inicio/adminPantallaInicio";
import { AdminUsers } from "../admin_users/adminUsers";
import { AdminViaje } from "../admin_viaje/adminViaje";
// import Navbar from "./Navbar";

export function Home() {
  const currentUser = useSelector((state) => state.currentUser.usuario);
  console.log(currentUser);
  return (
    <div className="home">
      {/* <div>
        <h1>
          {" "}
          <Navbar />
        </h1>
      </div> */}
      <h2>Bienvenido/a ,{currentUser}</h2>
      <br />
      <div className="d-flex flex-column align-items-center">
        <AdminUsers />
        <AdminPantallaInicio />
        <AdminViaje />
      </div>
    </div>
  );
}
