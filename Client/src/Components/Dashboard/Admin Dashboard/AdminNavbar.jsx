import React, { useEffect, useState, useRef } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_BASE_URL } from '../../constants/APIConstant.js';
import { getToken, clearToken } from "../../services/TokenService.js";
import { clearRole } from "../../services/RoleService.js";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      const token = getToken();
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/admin/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setAdmin(response.data);
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error("Error fetching admin profile:", error);
        handleLogout();
      }
    };

    fetchAdminProfile();
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    clearRole();
    clearToken();
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow-sm py-3">
        <Container fluid>
          
          <Navbar.Brand
            as={Link}
            to="/admin/dashboard"
            className="fw-bold fs-3 text-light d-flex align-items-center">
            <div className="navbar-brand fw-bold fs-3 d-flex align-items-center ms-5" >
              <i className="bi text-danger me-5"> ThinkX</i>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="admin-navbar" />
          <Navbar.Collapse id="admin-navbar">

            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/admin/dashboard" className="text-light mx-2">Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/admin/students" className="text-light mx-2">Students</Nav.Link>
              <Nav.Link as={Link} to="/admin/quizzes" className="text-light mx-2">Quizzes</Nav.Link>
              <Nav.Link as={Link} to="/admin/contacts" className="text-light mx-2">Contacts</Nav.Link>
            </Nav>

            <div className="position-relative d-flex align-items-center" ref={profileRef}>

              <Button
                variant="link"
                className="text-light d-flex align-items-center p-0"
                onClick={() => setShowProfile((prev) => !prev)}
              >
                <i
                  className="bi bi-person-circle text-light"
                  style={{ fontSize: "2.8rem", marginRight: "40px", cursor: "pointer" }}
                ></i>

              </Button>

              {showProfile && (
                <div
                  className="position-absolute end-0 bg-white rounded-3 shadow-lg p-3 fade-in"
                  style={{ top: "calc(100% + 12px)", minWidth: "280px", zIndex: 2000 }}>

                  <div
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "16px",
                      width: "16px",
                      height: "16px",
                      backgroundColor: "white",
                      transform: "rotate(45deg)",
                      boxShadow: "-2px -2px 4px rgba(0,0,0,0.05)",
                    }}
                  ></div>

                  <div className="border-bottom pb-2 mb-2">
                    <div className="fw-bold text-dark">{admin?.fullname}</div>
                    <div className="small text-muted">{admin?.email}</div>
                    <div className="small text-primary">{admin?.specialization || "Administrator"}</div>
                  </div>

                  <Button
                    variant="outline-danger"
                    className="w-100 rounded-2 fw-semibold"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i> Logout
                  </Button>
                </div>
              )}

            </div>

          </Navbar.Collapse>
        </Container>
      </Navbar>

    
      <div style={{ marginTop: "100px" }} />
    </>
  );
}
