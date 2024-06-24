import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/actions";
import { Link } from "react-router-dom"; // Importar el componente Link desde react-router-dom
import "../../sass/_navbar.scss";

export default function Navbar() {
  const user = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());

    showNavbar(false);
  };

  return (
    <>
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 d-flex flex-row fixed-top estiloNav">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          {/* Utilizar Link en lugar de <a> */}
          <Link to="/gestion/home" className="navbar-brand brand-logo">
            <img src="\src\assets\logo-cuyen-turismo.png" alt="logo" />
          </Link>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-profile dropdown show">
              <div
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
              </div>
              <div
                className="dropdown-menu navbar-dropdown show"
                aria-labelledby="profileDropdown"
              >
                {/* Utilizar Link en lugar de <a> */}
                <Link
                  to="/gestion"
                  className="dropdown-item logout-button"
                  onClick={handleLogout}
                >
                  <i className="mdi mdi-logout me-2 text-primary"></i>
                  Logout
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
