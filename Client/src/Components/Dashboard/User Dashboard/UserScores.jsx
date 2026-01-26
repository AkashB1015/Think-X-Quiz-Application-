import React, { useEffect, useState } from 'react';
import { Container, Table, Alert } from 'react-bootstrap';
import api from '../../services/apiService.js';

const UserScores = () => {

    const [scores, setScores] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {

        const fetchScores = async () => {

            try {

                const res = await api.get('/quiz/user/me/completed');
                setScores(res.data.data);

            } catch (err) {

                console.error('Error fetching scores', err);
                setError('Unable to load scores');

            }
        };
        fetchScores();

    }, []);

    if (error) return <Alert variant="danger">{error}</Alert>;

    return (

        <Container className="py-4">

            <h3 className="mb-4">Your Quiz Scores</h3>
            <Table striped bordered hover responsive>

                <thead>
                    <tr>
                        <th>#</th>
                        <th>Quiz</th>
                        <th>Correct</th>
                        <th>Total</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>

                {
                    scores.map((s, idx) => (

                        <tr key={s.quiz_id}>
                            <td>{idx + 1}</td>
                            <td>{s.quiz_title}</td>
                            <td>{s.correct_answers}</td>
                            <td>{s.total_questions}</td>
                            <td>{Number(s.score).toFixed(2)}%</td>
                        </tr>
                        
                    ))
                }
                </tbody>

            </Table>

        </Container>
    );
};

export default UserScores;