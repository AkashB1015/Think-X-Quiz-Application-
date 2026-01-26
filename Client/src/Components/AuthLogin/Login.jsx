import * as Yup from "yup";
import { Formik } from "formik";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { login } from "../../Components/services/LoginService.js";
import { storeToken } from "../../Components/services/TokenService.js";
import { storeRole } from "../../Components/services/RoleService.js";

export default function Login() {

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const loginSchema = Yup.object({

    email: Yup.string().email("Enter a valid email").required("Email is required"),
    
    password: Yup.string().required("Password is required").matches(

            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must be 8+ chars with uppercase, lowercase, number & special symbol"

          ),

    role: Yup.string().required("Select a role"),

  });


  const handleSubmit = async (values, { resetForm }) => {

    try {

      const response = await login(values);

      if (response.status === 200 && response.data.token) {

        storeToken(response.data.token);
        storeRole(values.role.toLowerCase());

        toast.success(`Logged in successfully as ${values.role}`, {

          position: "top-right",
          autoClose: 1500,
          theme: "colored",
          transition: Bounce,

        });

        resetForm();


        if (values.role.toLowerCase() === "admin") {

          navigate("/admin/dashboard", { replace: true });

        } else if (values.role.toLowerCase() === "user") {

          navigate("/user/dashboard", { replace: true });

        } else {

          toast.error("Invalid role selected.", {
            position: "top-right",
            theme: "colored",

          });
        }
      } else {

        toast.error("Invalid credentials. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          transition: Bounce,

        });
      }
    } catch (error) {

      console.error(" Login error:", error);
      const message = error.response?.data?.message ||
        "Invalid credentials or server error";

      toast.error(message, {

        position: "top-right",
        autoClose: 4000,
        theme: "colored",
        transition: Bounce,

      });
    }
  };

  return (

    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center py-5"
      style={{ backgroundColor: "#f2f5fa" }}
    >
      <Row className="w-130 justify-content-center align-items-center " >

        <Col lg={6} md={6} className="text-center d-none d-md-block">
          <Image
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            alt="login"
            fluid
            style={{maxWidth: "80%", marginTop: "70px",marginBottom: "150px", }}
          />
        </Col>


        <Col lg={5} md={6}>
          <Container style={{ width: "100%", maxWidth: "420px",  marginRight:"200px",marginBottom:"60px"}}>
            <h4 className="text-center mb-4 fw-bold text-dark">Sign In</h4>

            <Formik
              initialValues={{ email: "", password: "", role: "" }}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, dirty, }) => (

                <Form noValidate onSubmit={handleSubmit}>

                  <Form.Group className="mb-3" controlId="loginEmail">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>


                  <Form.Group className="mb-2" controlId="loginPassword">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="loginShowPass">
                    <Form.Check
                      type="checkbox"
                      label="Show password"
                      className="small"
                      onChange={() => setShowPassword(!showPassword)}
                    />
                  </Form.Group>


                  <Form.Group className="mb-3" controlId="loginRole">
                    <Form.Label className="fw-semibold">Select Role</Form.Label>
                    <div>
                      <Form.Check
                        inline
                        type="radio"
                        label="Admin"
                        name="role"
                        value="admin"
                        checked={values.role === "admin"}
                        onChange={handleChange}
                        isInvalid={touched.role && !!errors.role}
                      />
                      <Form.Check
                        inline
                        type="radio"
                        label="User"
                        name="role"
                        value="user"
                        checked={values.role === "user"}
                        onChange={handleChange}
                        isInvalid={touched.role && !!errors.role}
                      />
                    </div>

                    {
                      touched.role && errors.role && (

                      <div className="text-danger small mt-1">
                         {errors.role}
                      </div>

                      )
                    }

                  </Form.Group>


                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mb-3 fw-semibold"
                    disabled={!isValid || !dirty}
                  >
                    SIGN IN
                  </Button>

                 <p className="text-center mb-0" style={{ fontSize: "0.9rem" }}>
                       Don't have an account?{" "}

                   <Link to="/register" className="text-primary text-decoration-none mx-2 fw-bold"> Register</Link>
                   <span className="text-muted">|</span>
                   <Link to="/" className="text-primary text-decoration-none mx-2 fw-bold"> Home </Link>

               </p>

                </Form>
              )}
            </Formik>
          </Container>
        </Col>
      </Row>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="colored" transition={Bounce}
      />
    </Container>
  );
}
