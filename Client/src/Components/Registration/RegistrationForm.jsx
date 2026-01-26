import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Container, Form, Button } from "react-bootstrap";
import { ToastContainer, toast, Bounce } from "react-toastify";
import api from "../../Components/services/apiService.js"; 
import { REGISTER_API_URL } from "../constants/APIConstant.js";

export default function Registration() {

  const validationSchema = Yup.object({

    fullName: Yup.string().trim().required("Full name is required"),
    email: Yup.string().email("Enter a valid email").required("Email is required"),
    password: Yup.string().required("Password is required")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be 8+ chars with uppercase, lowercase, number & special symbol"
      ),
    dob: Yup.date().required("Date of birth is required"),
    gender: Yup.string().required("Please select gender"),
    phone: Yup.string().matches(/^[0-9]{10}$/, "Phone must be 10 digits").required("Phone number is required"),

  });

  const handleSubmit = async (FormData, { resetForm }) => {

    try {
      
      const payload = {

        fullname: FormData.fullName,
        email: FormData.email,
        password: FormData.password,
        dob: FormData.dob,
        gender: FormData.gender,
        phone: FormData.phone,

      };

       const res = await api.post(REGISTER_API_URL, payload);

      toast.success(res.data.message || "Student Registered Successfully!", {

        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,

      });

      console.log("Student registered:", res.data);
      resetForm();

    } catch (error) {

      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
      });

    }
  };

  return (

    <section id="student-section" className="py-5 bg-light">

      <Container style={{ paddingTop: "40px" }}>
        
        <Container className="text-center mb-4">
          <h2 className="fw-bold text-primary">Student Registration - ThinkX</h2>
          <p className="text-muted">Fill out the details to register as a student</p>
        </Container>

        <Formik

          initialValues={{ fullName: "", email: "", password: "", dob: "", gender: "", phone: "", }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}

        >
{({values: FormData, errors,touched,handleChange, handleBlur, handleSubmit,isValid,dirty,}) => (

            <Form
              noValidate
              onSubmit={handleSubmit}
              className="mx-auto bg-white p-4 rounded shadow-sm"
              style={{ maxWidth: "700px" }}
            >
              
            <Form.Group className="mb-3" controlId="fullName">

                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={FormData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.fullName && !!errors.fullName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fullName}
                </Form.Control.Feedback>

            </Form.Group>

            <Form.Group className="mb-3" controlId="email">

                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="thinkx@gmail.com"
                  value={FormData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && !!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>

            </Form.Group>

            <Form.Group className="mb-3" controlId="password">

                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={FormData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.password && !!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>

            </Form.Group>

             <Form.Group className="mb-3" controlId="dob">

                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={FormData.dob}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.dob && !!errors.dob}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dob}
                </Form.Control.Feedback>

            </Form.Group>

            <Form.Group className="mb-3" controlId="gender">

                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={FormData.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.gender && !!errors.gender}
                >
                  <option value="">Select gender...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.gender}
                </Form.Control.Feedback>

            </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder=" +91 98111 11111"
                  value={FormData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.phone && !!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="text-center">
                <Button
                  type="submit"
                  variant="primary"
                  className="px-4 py-2"
                  disabled={!isValid || !dirty}
                >
                  Register
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        <ToastContainer position="top-right"autoClose={3000} hideProgressBar={false} theme="colored" transition={Bounce}/>

      </Container>
    </section>
  );
}
