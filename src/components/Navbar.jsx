import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faShoppingCart, faBell } from '@fortawesome/free-solid-svg-icons';

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link className="navbar-brand mt-2 mt-lg-0" to="/">
            <img
              src="https://cdn2.steamgriddb.com/file/sgdb-cdn/icon/851b10e5b105815806efcf78b53588f4/32/256x256.png"
              height="30"
              alt="Hotel Logo"
              loading="lazy"
            />
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/dashboard">
                Hoteles
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/team">
                Eventos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/projects">
                Reservacion
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center">
          <Link className="text-reset me-3" to="#">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
          <div className="dropdown">
            <Link
              className="text-reset me-3 dropdown-toggle hidden-arrow"
              to="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faBell} />
              <span className="badge rounded-pill badge-notification bg-danger">1</span>
            </Link>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <NavLink className="dropdown-item" to="/profile">
                  My profile
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" to="/settings">
                  Settings
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" to="/logout">
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};