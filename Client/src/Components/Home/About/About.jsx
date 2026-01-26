import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import card1 from "../../../assets/Slider/card1.png";
import "../../../index.css";


function AboutUs() {
  return (
    <>
 
      <section className="about-header">
        <Container className="text-center">
          <h1 className="about-main-heading">About US</h1>
          <p className="about-subtext">
            ThinkX Quiz is a smart and interactive learning platform designed 
            to make quizzes engaging, effective, and fun for learners and educators worldwide.
          </p>
        </Container>
      </section>

      
      <section className="about-app-section">
        <Container>
          <Row className="align-items-center">

           
            <Col md={6} className="text-center mb-4 mb-md-0">
              <img src={card1} alt="ThinkX App" className="about-app-img" />
            </Col>

         
            <Col md={6}>
              <h2 className="about-app-title">About ThinkX Quiz App</h2>

              <p className="about-app-text">
                - ThinkX Quiz App provides a smooth and modern quiz experience 
                where users can explore different topics, test their knowledge, 
                and get instant feedback with detailed explanations.
              </p>

              <p className="about-app-text">
               - With a user-friendly interface, real-time scoring, and a rich 
                collection of quiz categories, ThinkX helps students learn effectively 
                while keeping the experience enjoyable and motivating.
              </p>

              <p className="about-app-text">
               - Whether you're preparing for exams, improving skills, or just 
                exploring fun quizzes—ThinkX is your perfect learning companion.
              </p>
            </Col>

          </Row>
        </Container>
      </section>
    </>
  );
}

export default AboutUs;
