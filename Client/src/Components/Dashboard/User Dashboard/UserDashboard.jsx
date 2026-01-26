import React from "react";
import { Container, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function UserDashboard() {

  return (

    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
     
      <Card className="shadow-lg p-4" style={{ maxWidth: 500, width: '100%', borderRadius: 2}}>

        <Card.Body className="text-center">

          <h2 className="fw-bold text-primary mb-3">Welcome to <span className="text-danger">ThinkX</span> Quiz!</h2>
          <p className="text-muted mb-4">
            Choose an option below to start a quiz.
          </p>
          <div className="d-flex flex-column gap-3 mt-4">
            <Button as={Link} to="/start-quiz" variant="primary" size="lg" className="rounded-pill fw-semibold shadow">
              Start Quiz
            </Button>
          </div>
          
        </Card.Body>
     
      </Card>
    
    </Container>

  );
}
