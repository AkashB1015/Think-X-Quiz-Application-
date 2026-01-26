import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Slider from './imageslider';
import { Link } from "react-router-dom";
import card2 from '../../assets/Slider/card2.png';
import '../../App.css';  // IMPORTANT → Add CSS file

function MainContent() {
  return (
    <Container fluid className="main-wrapper p-0 overflow-hidden">

      {/* ==== Slider Section ==== */}
      <Row className="slider-wrapper g-0">
        <Col className="p-0">
          <Slider />
        </Col>
      </Row>

      {/* ==== Welcome Section ==== */}
      <Row className="welcome-section text-center">
        <Col xs={12} md={10} lg={8} className="mx-auto">

          <h1 className="welcome-title">Welcome to <span>ThinkX!</span></h1>

          <p className="welcome-subtext">
            Challenge your knowledge with fun and interactive quizzes.
            Join ThinkX today and start your journey to becoming a quiz master!
          </p>

          <div className="welcome-buttons">
            <Link to="/register">
              <Button className="btn-custom-primary">Register</Button>
            </Link>

            <Link to="/login">
              <Button className="btn-custom-success">Sign In</Button>
            </Link>
          </div>

        </Col>
      </Row>

      {/* ==== Feature Section ==== */}
      <Container fluid className="feature-section">
        <Row className="align-items-center justify-content-center">

          {/* Feature Image */}
          <Col xs={12} md={6} className="feature-img-container">
            <img src={card2} alt="Quiz Features" className="feature-img" />
          </Col>

          {/* Feature Text */}
          <Col xs={12} md={6} className="feature-text">
            <h2 className="feature-title">Discover ThinkX Features</h2>

            <p className="feature-desc">
              ThinkX offers a smooth and interactive platform designed to make 
              learning fun and engaging. Get instant feedback, track your progress, 
              and explore quizzes across multiple categories.
            </p>

            <p className="feature-sub">
              Enjoy topic-based quizzes, score tracking, explanations, 
              and a gamified experience — all in one place.
            </p>

            <Link to="/services">
              <Button className="btn-custom-primary mt-3">Learn More</Button>
            </Link>
          </Col>

        </Row>
      </Container>
      

    </Container>
    
  );
}

export default MainContent;
