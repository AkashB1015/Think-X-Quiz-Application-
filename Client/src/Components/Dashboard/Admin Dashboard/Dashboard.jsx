import React, { useEffect, useState, useRef } from "react";
import { Container, Navbar, Nav, Button, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_BASE_URL } from '../../constants/APIConstant.js';
import { getToken, clearToken } from "../../services/TokenService.js";
import { clearRole } from "../../services/RoleService.js";

export default function AdminDashboard() {
  
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

          console.error(" Error fetching admin profile:", error);
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
              <Nav.Link as={Link} to="/admin/dashboard" className="text-light mx-2">
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/students" className="text-light mx-2">
                Students
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/quizzes" className="text-light mx-2">
                Quizzes
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/contacts" className="text-light mx-2">
                Contacts
              </Nav.Link>
              
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
                  style={{ top: "calc(100% + 12px)", minWidth: "280px", zIndex: 2000, }}>

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
                    <div className="small text-primary">
                      {admin?.specialization || "Administrator"}
                    </div>
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


      <div style={{ marginTop: "100px" }}>

        <Container className="mt-4">

          <Row>
            <Col md={12} className="mb-4">
              <h2 className="fw-bold text-primary">
                Welcome, <span className="text-dark">{admin?.fullname || "Admin"}</span>
              </h2>
              <p className="text-muted">
                Manage your quizzes, view student progress, and handle contact messages all from one place.
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 shadow-sm hover-card">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="bi bi-pencil-square text-primary" style={{ fontSize: "2.5rem" }}></i>
                  </div>
                  <h4>Create Quiz</h4>
                  <p className="text-muted mb-4">Create new quizzes and manage questions</p>
                  <Button 
                    variant="primary" 
                    as={Link} 
                    to="/admin/quizzes?tab=create"
                    className="w-100"
                  >
                    Create Quiz
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 shadow-sm hover-card">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="bi bi-trophy text-warning" style={{ fontSize: "2.5rem" }}></i>
                  </div>
                  <h4>Rankings</h4>
                  <p className="text-muted mb-4">View student rankings and performance</p>
                  <Button 
                    variant="warning" 
                    as={Link} 
                    to="/admin/quizzes"
                    className="w-100 text-white"
                  >
                    View Rankings
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 shadow-sm hover-card">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="bi bi-people text-success" style={{ fontSize: "2.5rem" }}></i>
                  </div>
                  <h4>Students</h4>
                  <p className="text-muted mb-4">Manage student accounts and progress</p>
                  <Button 
                    variant="success" 
                    as={Link} 
                    to="/admin/students"
                    className="w-100"
                  >
                    View Students
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <style jsx>{`
            .hover-card {
              transition: transform 0.2s ease-in-out;
            }
            .hover-card:hover {
              transform: translateY(-5px);
            }
            .feature-icon {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto;
              background: #f8f9fa;
            }
          `}</style>
        </Container>
      </div>


    </>
  );
}
