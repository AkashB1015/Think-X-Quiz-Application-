import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { clearRole } from "../../services/RoleService.js";
import { clearToken } from "../../services/TokenService.js";

export default function DashboardNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearRole();
    clearToken();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="shadow-sm">
      <Container>
        <container className="navbar-brand fw-bold fs-3 d-flex align-items-center ms-5" > 
          <i className="bi text-danger me-5"> ThinkX</i> 
        </container>

        <Navbar.Toggle aria-controls="dashboard-nav" />
        <Navbar.Collapse id="dashboard-nav">
          <Button 
            variant="outline-light" 
            className="ms-auto me-2"
            onClick={() => navigate('/user/dashboard')}
          >
            Home
          </Button>
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
