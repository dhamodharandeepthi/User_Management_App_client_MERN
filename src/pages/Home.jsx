import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Table, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const Home = () => {
    const [users, setUsers] = useState([]);
    const [render, setRender] = useState(false);
    const [input, setInput] = useState({
        name: "",
        email: "",
        age: "",
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAllData = async () => {
            try {
                const res = await axios.get("https://user-management-app-server-mern.onrender.com/api/v1/users");
                setUsers(res.data);
                setError(null); // Clear error on successful data fetch
            } catch (err) {
                setError("Failed to fetch users");
                toast.error("Failed to fetch users"); 
            }
        };
        getAllData();
    }, [render]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://user-management-app-server-mern.onrender.com/api/v1/users", input);
            setRender(!render); // Toggle render state to refresh user list
            setInput({
                name: "",
                email: "",
                age: "",
            });
            setError(null); // Clear error on successful submission
            toast.success("User added successfully"); 
        } catch (err) {
            setError("Failed to add user");
            toast.error("Failed to add user"); 
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://user-management-app-server-mern.onrender.com/api/v1/users/${id}`);
            const newUsers = users.filter((item) => item._id !== id);
            setUsers(newUsers);
            setError(null); // Clear error on successful deletion
            toast.success("User deleted successfully"); 
        } catch (err) {
            setError("Failed to delete user");
            toast.error("Failed to delete user"); 
        }
    };

    return (
        <Container className="my-5">
            <Row>
                <Col md={12}>
                    <div className="bg-primary text-white p-3 rounded mb-4">
                        <h1 className="text-center">User Management App</h1>
                    </div>
                </Col>
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        {error && <Alert variant="danger">{error}</Alert>}
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
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col md={6}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users &&
                                users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.age}</td>
                                        <td>
                                            <Link to={`/edit/${user._id}`}>
                                                <Button variant="primary">Edit</Button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleDelete(user._id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <ToastContainer /> 
        </Container>
    );
};

export default Home;
