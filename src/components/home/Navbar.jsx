// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getUsers, logoutUser } from "../../redux/actions/actions";
// import { useNavigate } from "react-router-dom"; // Importa useHistory
// import "../../sass/_navbar.scss";

// export default function Navbar() {
//   const user = useSelector((state) => state.currentUser); // Reemplaza 'user' por el nombre de tu reducer de usuario
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Obtiene la instancia de history
//   const [isLoading, setIsLoading] = useState(true);
//   const handleLogout = () => {
//     dispatch(logoutUser()); // Llama a tu acción de logoutUser
//     navigate("/"); // Redirige al usuario al inicio de la aplicación
//   };
//   useEffect(() => {
//     // Simulación de tiempo de carga (puedes reemplazarlo por tu lógica de carga real)
//     const timeout = setTimeout(() => {
//       setIsLoading(false); // Cambia el estado a false después de un tiempo (simulación de carga)
//     }, 2000); // Cambia el número a la cantidad de tiempo que desees simular

//     return () => clearTimeout(timeout); // Limpia el timeout en caso de que el componente se desmonte antes de que termine la carga simulada
//   }, []);

//   return (

//     <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 d-flex flex-row fixed-top estiloNav">

//       <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
//         <a className="navbar-brand brand-logo" href="/home">
//           <img src="\src\assets\logo-cuyen-turismo.png" alt="logo" />
//         </a>
//       </div>
//       <div className="navbar-menu-wrapper d-flex align-items-stretch">
//         <ul className="navbar-nav navbar-nav-right">
//           <li className="nav-item nav-profile dropdown show">
//             <a
//               href="#"
//               className="nav-link dropdown-toggle"
//               data-bs-toggle="dropdown"
//               aria-expanded="true"
//               tabIndex="0"
//             >
//               <div className="nav-profile-img">
//                 <img
//                   src="\src\assets\logouser.png"
//                   alt="logouser"
//                   className="img-fluid"
//                   style={{ maxWidth: "100px" }}
//                 />
//                 <span className="availability-status online"></span>
//               </div>
//               <div className="nav-profile-text">
//                 <p className="mb-1 text-black">{user.nombre}</p>
//                 <p className="mb-1 text-black">{user.email}</p>
//               </div>
//             </a>
//             <div
//               className="dropdown-menu navbar-dropdown show"
//               aria-labelledby="profileDropdown"
//             >
//               <a
//                 href="#"
//                 className="dropdown-item logout-button"
//                 onClick={handleLogout}
//               >
//                 <i className="mdi mdi-logout me-2 text-primary"></i>
//                 Logout
//               </a>
//             </div>
//           </li>
//         </ul>

//         {/* <div className="user-menu">
//           <button onClick={handleLogout} className="btn btn-danger">
//             Logout
//           </button>
//         </div> */}
//       </div>
//     </nav>
//   );
// }
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, logoutUser } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import "../../sass/_navbar.scss";
//para probar
export default function Navbar() {
  const user = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false); // Nuevo estado para controlar la visualización del Navbar

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
      setShowNavbar(true); // Muestra el Navbar después de la carga
    }, 6500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isLoading
        ? null
        : showNavbar && (
            <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 d-flex flex-row fixed-top estiloNav">
              <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <a className="navbar-brand brand-logo" href="/home">
                  <img src="\src\assets\logo-cuyen-turismo.png" alt="logo" />
                </a>
              </div>
              <div className="navbar-menu-wrapper d-flex align-items-stretch">
                <ul className="navbar-nav navbar-nav-right">
                  <li className="nav-item nav-profile dropdown show">
                    <a
                      href="#"
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="true"
                      tabIndex="0"
                    >
                      <div className="nav-profile-img">
                        <img
                          src="\src\assets\logouser.png"
                          alt="logouser"
                          className="img-fluid"
                          style={{ maxWidth: "100px" }}
                        />
                        <span className="availability-status online"></span>
                      </div>
                      <div className="nav-profile-text">
                        <p className="mb-1 text-black">{user.nombre}</p>
                        <p className="mb-1 text-black">{user.email}</p>
                      </div>
                    </a>
                    <div
                      className="dropdown-menu navbar-dropdown show"
                      aria-labelledby="profileDropdown"
                    >
                      <a
                        href="#"
                        className="dropdown-item logout-button"
                        onClick={handleLogout}
                      >
                        <i className="mdi mdi-logout me-2 text-primary"></i>
                        Logout
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          )}
    </>
  );
}
