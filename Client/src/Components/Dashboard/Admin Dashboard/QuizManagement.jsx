import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Nav, Alert } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';
import { getToken } from '../../services/TokenService.js';
import api from '../../services/apiService.js';
import CreateQuiz from './CreateQuiz';
import QuizRankings from './QuizRankings';

const QuizManagement = () => {
    const [activeTab, setActiveTab] = useState('list');
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [error, setError] = useState('');
    const location = useLocation();

    useEffect(() => {
        fetchQuizzes();
        
        const search = new URLSearchParams(location.search);
        const tab = search.get('tab');
        if (tab) setActiveTab(tab);
    }, [location.search]);


    const fetchQuizzes = async () => {

        try {

            const token = getToken();

            const response = await api.get('/quiz', {
                headers: { Authorization: `Bearer ${token}` }

            });

            setQuizzes(response.data.data);

        } catch (error) {

            setError('Failed to fetch quizzes');
            console.error('Error fetching quizzes:', error);

        }
    };

    return (
        <>
            <AdminNavbar />
            <Container fluid className="py-4">
                <Row>
                    <Col md={3}>
                        <Card className="shadow mb-4">
                            <Card.Header className="bg-primary text-white">
                                Quiz Management
                            </Card.Header>
                            <Card.Body className="p-0">
                                <Nav className="flex-column">

                                    <Nav.Link 
                                        className={`p-3 ${activeTab === 'list' ? 'bg-light' : ''}`}

                                        onClick={() => {
                                            setActiveTab('list');
                                            setSelectedQuiz(null);
                                        }}
                                    >
                                        <i className="bi bi-list-ul me-2"></i>
                                        All Quizzes
                                    </Nav.Link>

                                    <Nav.Link 
                                        className={`p-3 ${activeTab === 'create' ? 'bg-light' : ''}`}
                                        onClick={() => {
                                            setActiveTab('create');
                                            setSelectedQuiz(null);
                                        }}
                                    >
                                        <i className="bi bi-plus-circle me-2"></i>
                                        Create New Quiz
                                    </Nav.Link>

                                </Nav>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={9}>
                        {error && (
                            <Alert variant="danger" onClose={() => setError('')} dismissible>
                                {error}
                            </Alert>
                        )}

                        {activeTab === 'list' && (
                            <div className="quiz-list">
                                <h3 className="mb-4">Available Quizzes</h3>

                                <Row>
                        {quizzes.map((quiz) => (

                                        <Col md={6} key={quiz.quiz_id} className="mb-4">

                                            <Card className="shadow h-100">

                                                <Card.Body>

                                                    <Card.Title>{quiz.quiz_title}</Card.Title>
                                                    
                                                    <Card.Subtitle className="mb-2 text-muted">
                                                        Subject: {quiz.subject_name}
                                                    </Card.Subtitle>

                                                    <Card.Text>
                                                        Created: {new Date(quiz.created_at).toLocaleDateString()}
                                                    </Card.Text>
                                                    <div className="d-flex gap-2">
                                                        <Button 
                                                            variant="primary"
                                                            onClick={() => {
                                                                setSelectedQuiz(quiz);
                                                                setActiveTab('rankings');
                                                            }}
                                                        >
                                                            <i className="bi bi-trophy me-2"></i>
                                                            View Rankings
                                                        </Button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                    ))}
                                </Row>
                            </div>
                        )}

                        {activeTab === 'create' && (

                            <CreateQuiz onQuizCreated={() => {
                                fetchQuizzes();
                                setActiveTab('list');
                            }} />

                        )}

                        { activeTab === 'rankings' && selectedQuiz && (

                            <QuizRankings quizId={selectedQuiz.quiz_id} />

                        )}

                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default QuizManagement;