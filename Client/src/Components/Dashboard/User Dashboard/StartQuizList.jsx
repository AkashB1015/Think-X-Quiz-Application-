import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../services/apiService.js';
import DashboardNavbar from './DashboardUsers';

const StartQuizList = () => {

    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {

        const fetch = async () => {

            try {

                const res = await api.get('/quiz');
                setQuizzes(res.data.data);

            } catch (err) {

                console.error('Error fetching quizzes', err);
                setError('Unable to load quizzes');

            }
        };
        fetch();
    }, []);

    if (error) {
        return (
            
            <>
                <DashboardNavbar />
                <Container className="py-4" style={{ marginTop: '100px', minHeight: 'calc(100vh - 200px)' }}>
                    <Alert variant="danger">{error}</Alert>
                </Container>
                <Footer />
            </>
        );
    }

    return (
        <>
            <DashboardNavbar />
            <Container className="py-4" style={{ marginTop: '100px', minHeight: 'calc(100vh - 200px)' }}>
                <h3 className=" text-primary mb-4">Available Quizzes</h3>
                <Row>
                    {quizzes.map((quiz) => (
                        <Col md={6} key={quiz.quiz_id} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{quiz.quiz_title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{quiz.subject_name}</Card.Subtitle>
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <small className="text-muted">Questions: N/A</small>
                                        <Button as={Link} to={`/start-quiz/${quiz.quiz_id}`} variant="primary">Start Quiz</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default StartQuizList;