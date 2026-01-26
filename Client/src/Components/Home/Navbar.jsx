import React from "react";
import { Link } from "react-router-dom";
import "../../assets/style.css";


export function Navbar() {
  return (
    <nav
      id="Nave-bar-Quize"
      className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top"
    >
      <container className="container-fluid px-3">
        <container  className="navbar-brand fw-bold fs-3 d-flex align-items-center ms-5" >
           <i className="bi text-danger me-5"> ThinkX</i>
        </container>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>

          <Link to="/login">
            <button className="btn btn-primary rounded-pill ms-lg-5 mt-2 mt-lg-1 px-2">
              <i className="bi bi-person-fill me-1"></i> Sign In
            </button>
          </Link>
        </div>
      </container>
    </nav>
  );
}
