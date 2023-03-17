import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useUser } from '../UserProvider';
import ajax from "../util/fetchService";

const RegisterWorker = () => {
    const userJwt = useUser();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [cohortStartDate, setCohortStartDate] = useState(null);
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [users, setUsers] = useState([]);

    const bookstoreId = window.location.href.split("registerWorker/")[1];
    const emptyUser = {
        username: "",
        password: "",
        name: "",
        email: "",
        phoneNumber: 12345678,
        id: null,
        bookstoreId: bookstoreId != null ? parseInt(bookstoreId) : null
    }
    const [user, setUser] = useState(emptyUser)

    //so from here on is a test

    function onValChange(prop, value) {
        const newUser = { ...user };
        newUser[prop] = value;
        setUser(newUser);
    }

    useEffect(() => {
        ajax(`/api/users?bookstoreId=${bookstoreId}`, "GET", user.jwt, null)
            .then((usersData) => {
                setUsers(usersData);
                console.log(usersData);
            });
    }, []);

    function createWorkerUser() {

        toast.info(`Your new worker is: '${name}' !`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        ajax("/api/users/register/worker", "POST", null, user)
            .then((userData) => {
                console.log(userData);
                const userCopy = [...users];
                userCopy.push(userData);
                setUsers(userCopy);
                setUser(emptyUser);
            });
    }

    function handleDeleteUser(userId) {
        ajax(`/api/users/${user.id}`, "DELETE", user.jwt)
            .then((msg) => {
                const usersCopy = [...users];
                const i = usersCopy.findIndex((user) => user.id === userId);
                usersCopy.splice(i, 1);
                setUsers(usersCopy);
            })
    }

    return (
        <div>

            <h1 className="registerHeaders" >Here you can add new personal's to your work force! </h1>


            <Container className="mt-5 ">

                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label className="fs-4">Nickname:</Form.Label>
                            <Form.Control
                                type="text"
                                size="lg"
                                placeholder="John Doe"
                                value={user.name}
                                onChange={(e) => onValChange("name", e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label className="fs-4">Username:</Form.Label>
                            <Form.Control
                                type="text"
                                size="lg"
                                placeholder="dogPoop@email.com"
                                value={user.username}
                                onChange={(e) => onValChange("username", e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="phoneNumber">
                            <Form.Label className="fs-4">Phone Number:</Form.Label>
                            <Form.Control
                                type="number"
                                size="lg"
                                placeholder="20752347"
                                value={user.phoneNumber}
                                onChange={(e) => onValChange("phoneNumber", e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label className="fs-4">Email:</Form.Label>
                            <Form.Control
                                type="email"
                                size="lg"
                                placeholder="something@something"
                                value={user.email}
                                onChange={(e) => onValChange("email", e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label className="fs-4">Password:</Form.Label>
                            <Form.Control
                                type="password"
                                size="lg"
                                placeholder="Type in your password"
                                value={user.password}
                                onChange={(e) => onValChange("password", e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col
                        md="8"
                        lg="6"
                        className="mt-2 d-flex flex-column gap-5 flex-md-row justify-content-md-between"
                    >
                        <Button
                            id="submit"
                            type="button"
                            size="lg"
                            onClick={() => { createWorkerUser() }}
                        >
                            Register Worker
                        </Button>

                        <Button
                            variant="secondary"
                            type="button"
                            size="lg"
                            onClick={() => {
                                navigate("/dashboard");
                            }}
                        >
                            Back
                        </Button>

                    </Col>
                </Row>
                <ToastContainer />

                <h1 className="employee-header" >Here are your current employees! </h1>

                <div className="table-wrapper occupied-table mb-2">
                    <Table responsive size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nickname</th>
                                <th>Username</th>
                                <th>Phone number</th>
                                <th>Email</th>
                                <th>Started (Y/M/D)</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {users ? (
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{user.email}</td>
                                        <td>{user.cohortStartDate}</td>
                                        <td><Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() => handleDeleteUser(user.id)}>Delete</Button></td>
                                    </tr>
                                ))
                            ) : (<></>)}
                        </tbody>

                    </Table>

                </div>

            </Container>

        </div>

    );
};

export default RegisterWorker