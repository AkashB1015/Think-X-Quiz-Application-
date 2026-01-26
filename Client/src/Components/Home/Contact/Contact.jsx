import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Container, Form, Button } from "react-bootstrap";
import { ToastContainer, toast, Bounce } from "react-toastify";
import api from "../../services/apiService";
import { CONTACT_API_URL } from "../../constants/APIConstant";

export function Contact() {

  const validationSchema = Yup.object({

    name: Yup.string().trim().required("Name is required"),
    email: Yup.string().email("Enter a valid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),

  });

  const handleSubmit = async (values, { resetForm }) => {

    try {

      const payload = {

        fullname: values.name,
        email: values.email,
        phone: values.phone,
        message: values.message,

      };

      const res = await api.post(CONTACT_API_URL, payload);

      toast.success(res.data.message || "Message Sent Successfully!", {

        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "colored",
        transition: Bounce,

      });

      resetForm();

    } catch (error) {

      console.error("Error sending message:", error);
      toast.error(error.response?.data?.message || "Failed to send message", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "colored",
        transition: Bounce,

      });

    }
  };

  return (
    
    <section id="contact-section" className="py-5 bg-light">

      <Container style={{ paddingTop: "40px" }}>

        <Container className="text-center mb-4">
          <h2 className="fw-bold text-primary">Contact Us - ThinkX</h2>
          <p className="text-muted">We’re always here to answer your questions and listen to your ideas.</p>
        </Container>

        <Formik
          initialValues={{ name: "", email: "", phone: "", message: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >

    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, dirty }) => (
           
           <Form
              noValidate
              onSubmit={handleSubmit}
              className="mx-auto bg-white p-4 rounded shadow-sm"
              style={{ maxWidth: "700px" }}
            >
            <Form.Group className="mb-3" controlId="name">

                <Form.Label>
                  <i className="bi bi-person-fill me-2"></i>Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.name && !!errors.name}
                />
               <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
                
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">

                <Form.Label>
                  <i className="bi bi-envelope-fill me-2"></i>Email
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="thinkx@gmail.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && !!errors.email}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>

            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">

                <Form.Label>
                  <i className="bi bi-telephone-fill me-2"></i>Phone Number
                </Form.Label>

                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder=" +91 98111 11111"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.phone && !!errors.phone}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>

            </Form.Group>

              <Form.Group className="mb-3" controlId="message">
                <Form.Label>
                  <i className="bi bi-pencil-square me-2"></i>Message
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  placeholder="Type your message here..."
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.message && !!errors.message}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.message}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="text-center">
                <Button type="submit" variant="primary" className="px-4 py-2" disabled={!isValid || !dirty}>
                  Send Message
                </Button>
              </div>
            </Form>
          )}

      </Formik>

        <ToastContainer position="top-right"autoClose={3000}hideProgressBar={false}theme="colored"transition={Bounce}/>
      
      </Container>

    </section>
  );
}
