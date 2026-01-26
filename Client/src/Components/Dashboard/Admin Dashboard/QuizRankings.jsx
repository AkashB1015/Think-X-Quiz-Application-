import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Alert } from 'react-bootstrap';
import api from '../../services/apiService.js';
import AdminNavbar from './AdminNavbar';

const QuizRankings = ({ quizId }) => {
    const [rankings, setRankings] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let intervalId = null;
        const fetchRankings = async () => {

            try {

                setLoading(true);
                console.log('Fetching rankings for quiz:', quizId);

                const token = localStorage.getItem('token');

                const response = await api.get(`/quiz/${quizId}/rankings`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                console.log('Rankings response:', response.data);

                if (response.data.success) {

                    setRankings(response.data.data || []);
                    console.log('Updated rankings state with:', response.data.data);

                } else {

                    console.warn('Rankings request was not successful:', response.data);
                    setError('Failed to load rankings: ' + (response.data.message || 'Unknown error'));
                
                }
            } catch (err) {
                
                console.error('Error fetching rankings:', err);
                console.error('Error details:', err.response?.data || err.message);
                setError('Error fetching rankings: ' + (err.response?.data?.message || err.message));
            
            } finally {

                setLoading(false);

            }
        };

      
        if (quizId) {

            fetchRankings();
            intervalId = setInterval(fetchRankings, 5000);

        }

        return () => {

            if (intervalId) clearInterval(intervalId);

        };

    }, [quizId]);

    if (error) return (
        <>
            <AdminNavbar />
            <Alert variant="danger">{error}</Alert>
        </>
    );

    if (loading) return (

        <>
            <AdminNavbar />
            <Container className="my-4">

                <Card className="shadow">

                    <Card.Header as="h4" className="bg-primary text-white">
                        <span>Loading Rankings...</span>
                    </Card.Header>
                    
                    <Card.Body className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </Card.Body>

                </Card>

            </Container>
        </>
    );

    return (
        <>
            <AdminNavbar />
            <Container className="my-4">

                <Card className="shadow">

                    <Card.Header as="h4" className="bg-primary text-white d-flex justify-content-between align-items-center">
                        
                        <span>Quiz Rankings</span>

                    {
                         loading ? (

                            <span className="badge bg-info">Loading...</span>

                        ) : rankings.length === 0 ? (

                            <span className="badge bg-warning">Waiting for submissions...</span>
                        
                        ) : (

                            <span className="badge bg-success">{rankings.length} submissions</span>
                        
                        )
                    }

                    </Card.Header>

                    <Card.Body>

                        <Table striped bordered hover responsive>

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Score</th>
                                    <th>Correct Answers</th>
                                    <th>Total Questions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {rankings.map((rank, index) => (
                                    <tr key={rank.user_id}>
                                        <td>{index + 1}</td>
                                        <td>{rank.fullname}</td>
                                        <td>{(parseFloat(rank.score) || 0).toFixed(2)}%</td>
                                        <td>{rank.correct_answers}</td>
                                        <td>{rank.total_questions}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default QuizRankings;