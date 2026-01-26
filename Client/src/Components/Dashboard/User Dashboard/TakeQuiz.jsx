import React, { useState, useEffect, useCallback } from 'react';
import { Container, Card, Button, Row, Col, Form, Alert, Toast } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/apiService.js';
import DashboardNavbar from './DashboardUsers';

const TakeQuiz = () => {

    const navigate = useNavigate();
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [quizResult, setQuizResult] = useState(null);
    const [error, setError] = useState('');
    const [timeLeft, setTimeLeft] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleAnswerSelect = (answer) => {

        const newAnswers = [...answers];
        newAnswers[currentQuestion] = answer;
        setAnswers(newAnswers);

    };

    const handleNextQuestion = () => {

        if (currentQuestion < quiz.questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);

        }
    };

    const handlePreviousQuestion = () => {

        if (currentQuestion > 0) {

            setCurrentQuestion(prev => prev - 1);

        }
    };

    const handleSubmitQuiz = useCallback(async () => {
        try {
           
            const token = localStorage.getItem('token');
            let userId = null;

            if (token) {

                try {

                    const payload = JSON.parse(atob(token.split('.')[1]));
                    userId = payload?.admin_id || payload?.user_id || payload?.id || null;

                } catch (err) {

                    console.warn('Failed to decode token payload', err);

                }
            }

            if (!userId) {

                setError('User ID not found. Please log in again.');
                return;

            }

            const submissionData = {

                user_id: userId,
                quiz_id: quizId,
                answers: answers.map((answer, index) => ({
                    question_id: quiz.questions[index].question_id,
                    chosen_option: answer
                }))

            };
     
            const response = await api.post('/quiz/submit', submissionData);
           
            if (response.data && response.data.success) {

                setQuizResult(response.data.data || null);
                setQuizSubmitted(true);
             
                if (response.data.data && response.data.data.id) {

                    setToastMessage('Quiz submitted and results saved successfully!');
                    setShowToast(true);

                }

            } else {

                setError(response.data?.message || 'Submission failed');

            }

        } catch (error) {

            console.error('Error submitting quiz:', error);
            
            setError('Error submitting quiz: ' + (error.response?.data?.message || error.message));
        
        }

    }, [answers, quiz, quizId]);


    useEffect(() => {

        const fetchQuiz = async () => {

            try {

              
                const response = await api.get(`/quiz/${quizId}`);
                
                const quizData = response.data.data;
                        
                if (!quizData || (!quizData.quiz && !quizData.questions)) {

                    throw new Error('Invalid quiz data received from server');

                }
                
              
                setQuiz({

                    quiz_title: quizData.quiz ? quizData.quiz.quiz_title : quizData.quiz_title,
                    subject_name: quizData.quiz ? quizData.quiz.subject_name : '',
                    questions: quizData.questions || []

                });

                const questions = quizData.questions || [];
                console.log('Questions array:', questions);
                
                if (questions.length === 0) {

                    throw new Error('No questions found for this quiz');

                }
                
              
                setAnswers(new Array(questions.length).fill(''));
            
                setTimeLeft(questions.length * 30);

            } catch (error) {

                console.error('Error loading quiz:', error);
               
                setError('Error loading quiz: ' + (error.response?.data?.message || error.message));
            
            }
        };

        if (quizId) {

            fetchQuiz();

        }

    }, [quizId]);

    useEffect(() => {

        if (timeLeft === null || timeLeft <= 0 || quizSubmitted) return;

        const timer = setInterval(() => {

            setTimeLeft(prev => prev - 1);

        }, 1000);

        if (timeLeft === 0) {

            handleSubmitQuiz();

        }

        return () => clearInterval(timer);

    }, [timeLeft, quizSubmitted, handleSubmitQuiz]);

    if (error) {

        return (
            <>
                <DashboardNavbar />
                <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
                    <Alert variant="danger">{error}</Alert>
                    <Button variant="primary" onClick={() => navigate('/user/dashboard')}>
                        Go to Dashboard
                    </Button>
                </Container>
            </>
        );
    }
    
    if (!quiz) {

        return (
            <>
                <DashboardNavbar />
                <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2">Loading quiz...</p>
                    </div>
                </Container>
            </>
        );
    }

    if (quizSubmitted) {
        return (
            <>
                <DashboardNavbar />

                <Container className="d-flex flex-column align-items-center justify-content-center py-5" style={{ minHeight: '80vh' }}>

                    <Card className="shadow-lg p-4" style={{ maxWidth: 800, width: '100%', borderRadius: 2 }}>
                        <Card.Header as="h4" className="bg-primary text-white text-center" style={{ borderRadius: '15px 15px 0 0' }}>
                            Quiz Results - {quiz.quiz_title}
                        </Card.Header>

                        <Card.Body>

                            <div className="text-center mb-4">
                                <h2>Your Score: {quizResult.score.toFixed(2)}%</h2>
                                <p>Correct Answers: {quizResult.correct_answers} out of {quizResult.total_questions}</p>
                            </div>

                            <div className="quiz-review">

                     {quiz.questions.map((question, index) => (

                                    <Card key={index} className="mb-4 shadow-sm">

                                        <Card.Body>

                                            <h6 className="fw-bold mb-3">Question {index + 1}:</h6>
                                            <p className="mb-3">{question.question_text}</p>
                                            <Row className="g-3">

                             {['a', 'b', 'c', 'd'].map((option) => (

                                                    <Col md={6} key={option}>

                                                        <div className={`p-3 rounded ${

                                                            answers[index] === option 
                                                                ? (option === question.correct_option 
                                                                    ? 'bg-success bg-opacity-25 border border-success' 
                                                                    : 'bg-danger bg-opacity-25 border border-danger')
                                                                : option === question.correct_option 
                                                                    ? 'bg-success bg-opacity-25 border border-success'
                                                                    : 'bg-light'
                                                        }`}>
                                                            {question[`option_${option}`]}
                                                            {answers[index] === option && option === question.correct_option && 
                                                                <span className="ms-2">✓</span>}
                                                            {answers[index] === option && option !== question.correct_option && 
                                                                <span className="ms-2">✗</span>}

                                                        </div>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>

                            <div className="text-center mt-4">

                                <Button variant="primary" onClick={() => navigate('/user/dashboard')}>
                                    Go to Dashboard
                                </Button>

                            </div>
                        </Card.Body>

                    </Card>

                </Container>

            </>
        );
    }

    return (
        <>
            <DashboardNavbar />

            <Container className="py-5" style={{ maxWidth: '1100px' ,topmargin: '300' }}>

                <Card className="shadow-lg" style={{ borderRadius: 2 }}>
                    
                    <Card.Header className="bg-primary text-white" style={{ borderRadius: '2px ' }}>
                        <h4 className="mb-0">{quiz.quiz_title}</h4>

                    </Card.Header>

                    <Card.Body className="p-4">

                        <div className="mb-4">
                            <h5 className="fw-bold mb-3">Question {currentQuestion + 1}:</h5>
                            <p className="fs-5">{quiz.questions[currentQuestion].question_text}</p>
                        </div>

                        <Form>
                            <Row className="g-3">
                                {['a', 'b', 'c', 'd'].map((option) => (
                                    <Col md={6} key={option}>
                                        <Form.Check
                                            type="radio"
                                            id={`option_${option}`}
                                            name="answer"
                                            label={quiz.questions[currentQuestion][`option_${option}`]}
                                            checked={answers[currentQuestion] === option}
                                            onChange={() => handleAnswerSelect(option)}
                                            className="p-3 border rounded h-100"
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Form>

                        <div className="d-flex justify-content-between mt-4">
                            <Button 
                                variant="secondary"
                                onClick={handlePreviousQuestion}
                                disabled={currentQuestion === 0}
                            >
                                Previous
                            </Button>

                            {currentQuestion < quiz.questions.length - 1 ? (
                                <Button 
                                    variant="primary"
                                    onClick={handleNextQuestion}
                                    disabled={!answers[currentQuestion]}
                                >
                                    Next
                                </Button>

                            ) : (

                                <Button 
                                    variant="success"
                                    onClick={handleSubmitQuiz}
                                    disabled={answers.includes('')}
                                >
                                    Submit Quiz
                                </Button>
                            )}
                        </div>

                    </Card.Body>

                </Card>

                <Toast 
                    show={showToast} 
                    onClose={() => setShowToast(false)}
                    style={{ position: 'fixed', top: 20, right: 20 }}
                    bg="success"
                    delay={3000}
                    autohide
                >
                    <Toast.Header closeButton={false}>

                        <strong className="me-auto">Success</strong>

                    </Toast.Header>
                    <Toast.Body className="text-white">{toastMessage}</Toast.Body>

                </Toast>
                
            </Container>
        </>
    );
};

export default TakeQuiz;