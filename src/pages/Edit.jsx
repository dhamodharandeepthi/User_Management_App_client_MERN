import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [input, setInput] = useState({
        name: "",
        email: "",
        age: "",
    });

    useEffect(() => {
        const getAllData = async () => {
            try {
                const res = await axios.get(`https://user-management-app-server-mern.onrender.com/api/v1/users/single/${id}`);
                setInput(res.data);
            } catch (error) {
                console.error("Error fetching user data", error);
                toast.error("Error fetching user data");
            }
        };
        getAllData();
    }, [id]);

    const handleEditData = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://user-management-app-server-mern.onrender.com/api/v1/users/${id}`, input);
            toast.success("User updated successfully");
                
        } catch (error) {
            console.error("Error updating user data", error);
            toast.error("Error updating user data");
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col md={8} lg={6} className="mx-auto">
                    <Card className="shadow-lg">
                        <Card.Header className="bg-primary text-white text-center">
                            <h2>Update User</h2>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleEditData}>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={input.name}
                                        onChange={(e) =>
                                            setInput({ ...input, [e.target.name]: e.target.value })
                                        }
                                        placeholder="Enter name"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={input.email}
                                        onChange={(e) =>
                                            setInput({ ...input, [e.target.name]: e.target.value })
                                        }
                                        placeholder="Enter email"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formAge">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="age"
                                        value={input.age}
                                        onChange={(e) =>
                                            setInput({ ...input, [e.target.name]: e.target.value })
                                        }
                                        placeholder="Enter age"
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100"  >
                                    Update
                                </Button>
                            </Form>
                        </Card.Body>
                        <Card.Footer className="text-center">
                            <Button variant="info" onClick={() => navigate("/")}>
                                Go To Home
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            <ToastContainer />

        </Container>
    );
};

export default Edit;
