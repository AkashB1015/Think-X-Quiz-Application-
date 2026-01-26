import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import api from '../../services/apiService.js';
import AdminNavbar from './AdminNavbar';

const CreateQuiz = () => {

    const [quizData, setQuizData] = useState({

        quiz_title: '',
        subject_id: '',
        questions: [
            {
                question_text: '',
                option_a: '',
                option_b: '',
                option_c: '',
                option_d: '',
                correct_option: ''
            }
        ]
    });

    const [subjects, setSubjects] = useState([]);
    const [addingSubjectName, setAddingSubjectName] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });

    const defaultSubjects = ['Java', 'WPT', 'Database', 'OS', 'DSA'];

    useEffect(() => {

        fetchSubjects();

    }, []);

    const fetchSubjects = async () => {

        try {

            const res = await api.get('/subjects');
            setSubjects(res.data.data);

        } catch (error) {

            console.error('Error fetching subjects', error);
            setMessage({ text: 'Error fetching subjects', type: 'danger' });

        }
    };

    const handleAddSubject = async (name) => {

        const subjectName = (name || addingSubjectName || '').trim();
        if (!subjectName) return;

        try {
            
            const res = await api.post('/subjects', { subject_name: subjectName });
           
            const newSubject = { subject_id: res.data.subject_id, subject_name: subjectName };
            setSubjects((s) => [...s, newSubject]);
            setQuizData((q) => ({ ...q, subject_id: newSubject.subject_id }));
            setAddingSubjectName('');
            setMessage({ text: `Subject '${subjectName}' added`, type: 'success' });

        } catch (err) {

            console.error('Error adding subject', err);
            setMessage({ text: 'Error adding subject', type: 'danger' });

        }
    };

    const handleQuizDataChange = (e) => {

        setQuizData({
            ...quizData,
            [e.target.name]: e.target.value
        });

    };

    const handleQuestionChange = (index, field, value) => {

        const updatedQuestions = [...quizData.questions];

        updatedQuestions[index] = {

            ...updatedQuestions[index],
            [field]: value

        };

        setQuizData({

            ...quizData,
            questions: updatedQuestions

        });
    };

    const addQuestion = () => {

        setQuizData({

            ...quizData,
            questions: [
                ...quizData.questions,
                {
                    question_text: '',
                    option_a: '',
                    option_b: '',
                    option_c: '',
                    option_d: '',
                    correct_option: ''
                }
            ]
        });
    };

    const removeQuestion = (index) => {

        const updatedQuestions = quizData.questions.filter((_, i) => i !== index);
        setQuizData({
            ...quizData,
            questions: updatedQuestions
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            await api.post('/quiz', quizData);
            setMessage({ text: 'Quiz created successfully!', type: 'success' });
          
            setQuizData({
                quiz_title: '',
                subject_id: '',
                questions: [
                    {
                        question_text: '',
                        option_a: '',
                        option_b: '',
                        option_c: '',
                        option_d: '',
                        correct_option: ''
                    }
                ]
            });
        } catch (error) {
            console.error('Error creating quiz', error);
            setMessage({ text: 'Error creating quiz', type: 'danger' });
        }
    };

    return (
        <>
            <AdminNavbar />
            <Container className="my-4">

            <Card className="shadow">

                <Card.Header as="h4" className="bg-primary text-white">
                    Create New Quiz
                </Card.Header>

                <Card.Body>
                    {message.text && (
                        <Alert variant={message.type} dismissible onClose={() => setMessage({ text: '', type: '' })}>
                            {message.text}
                        </Alert>
                    )}

                <Form onSubmit={handleSubmit}>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Quiz Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="quiz_title"
                                        value={quizData.quiz_title}
                                        onChange={handleQuizDataChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>

                                <Form.Group>

                                    <Form.Label>Subject</Form.Label>
                                    <Form.Select
                                        name="subject_id"
                                        value={quizData.subject_id}
                                        onChange={handleQuizDataChange}
                                        required
                                    >
                                        
                                        <option value="">Select Subject</option>
                                        {subjects.map((subject) => (
                                            <option key={subject.subject_id} value={subject.subject_id}>
                                                {subject.subject_name}
                                            </option>
                                        ))}
                                    </Form.Select>

                                    <div className="d-flex gap-2 mt-2">
                                        <Form.Control
                                            placeholder="Add subject"
                                            value={addingSubjectName}
                                            onChange={(e) => setAddingSubjectName(e.target.value)}
                                        />
                                        <Button variant="outline-primary" onClick={() => handleAddSubject()}>Add</Button>
                                    </div>
                                 
                                    {subjects.length === 0 && (


                                        <div className="mt-2">
                                            <small className="text-muted">Quick add:</small>
                                            <div className="mt-1 d-flex gap-2 flex-wrap">
                                                {defaultSubjects.map((s) => (
                                                    <Button key={s} size="sm" variant="light" onClick={() => handleAddSubject(s)}>
                                                        {s}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>

                                    )}

                                </Form.Group>
                            </Col>
                        </Row>

                        {quizData.questions.map((question, index) => (

                            <Card key={index} className="mb-3 question-card">

                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5>Question {index + 1}</h5>

                                        {index > 0 && (
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => removeQuestion(index)}
                                            >
                                                Remove Question
                                            </Button>
                                        )}

                                    </div>

                                    <Form.Group className="mb-3">

                                        <Form.Control
                                            as="textarea"
                                            rows={2}
                                            placeholder="Enter question"
                                            value={question.question_text}
                                            onChange={(e) => handleQuestionChange(index, 'question_text', e.target.value)}
                                            required
                                        />

                                    </Form.Group>

                                    <Row>
                                        {['a', 'b', 'c', 'd'].map((option) => (

                                            <Col md={6} key={option} className="mb-3">
                                                <div
                                                    className="d-flex align-items-center p-2"
                                                    style={{
                                                        borderRadius: 6,
                                                        backgroundColor: question.correct_option === option ? '#e9f7ff' : 'transparent'
                                                    }}
                                                >
                                                    <Form.Check

                                                        type="radio"
                                                        aria-label={`Mark option ${option.toUpperCase()} as correct`}
                                                        name={`correct_${index}`}
                                                        checked={question.correct_option === option}
                                                        onChange={() => handleQuestionChange(index, 'correct_option', option)}
                                                        required

                                                    />
                                                    <Form.Control

                                                        className="ms-2"
                                                        placeholder={`Option ${option.toUpperCase()}`}
                                                        value={question[`option_${option}`]}
                                                        onChange={(e) => handleQuestionChange(index, `option_${option}`, e.target.value)}
                                                        required

                                                    />
                                                    <div className="ms-2 text-muted small">Mark as correct</div>
                                                
                                                </div>
                                           
                                            </Col>
                                        ))}
                                    </Row>
                                </Card.Body>
                            </Card>
                        ))}

                        <div className="d-flex justify-content-between">

                            <Button variant="secondary" onClick={addQuestion}>
                                Add Another Question
                            </Button>

                            <Button variant="primary" type="submit">
                                Create Quiz
                            </Button>
                            
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
        </>
    );
};

export default CreateQuiz;