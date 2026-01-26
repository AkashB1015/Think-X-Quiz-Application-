import React, { useState, useEffect } from 'react';
import { Container, Table, Card, Alert, Badge } from 'react-bootstrap';
import api from '../../services/apiService';
import AdminNavbar from './AdminNavbar';

const StudentsList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {

                setLoading(true);
               
                const response = await api.get('/users', {

                    baseURL: api.defaults.baseURL.replace('/api', '') 

                });

                console.log('Students data:', response.data);
                setStudents(response.data.data || []);

            } catch (err) {

                console.error('Error fetching students:', err);
                setError('Failed to load students list');

            } finally {

                setLoading(false);

            }
        };

        fetchStudents();

    }, []);

    if (error) {

        return (
            <>
                <AdminNavbar />
                <Alert variant="danger">{error}</Alert>
            </>
        );

    }

    return (

        <>
            <AdminNavbar />
            <Container className="py-4">

                <Card className="shadow">

                    <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                        <h4 className="mb-0">Students List</h4>
                        <Badge bg="light" text="dark">
                            Total Students: {students.length}
                        </Badge>
                    </Card.Header>

                    <Card.Body>

                {loading ? (

                            <div className="text-center py-4">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-2">Loading students...</p>
                            </div>

                        ) : students.length === 0 ? (

                            <Alert variant="info">No students registered yet.</Alert>

                        ) : (
                            
                            <Table responsive striped hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Joined Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student, index) => (
                                        <tr key={student.user_id}>
                                            <td>{index + 1}</td>
                                            <td>{student.fullname}</td>
                                            <td>{student.email}</td>
                                            <td>{new Date(student.created_at).toLocaleDateString()}</td>
                                            <td>
                                                <Badge bg="success">Active</Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default StudentsList;