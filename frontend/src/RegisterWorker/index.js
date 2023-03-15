import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useUser } from '../UserProvider';

const RegisterWorker = () => {
    const userJwt = useUser();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [cohortStartDate, setCohortStartDate] = useState(null);
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [users, setUsers] = useState(null);

    useEffect(() => {
        fetch("/api/users", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userJwt.jwt}`
            },
            method: "GET",
        }).then((response) => {
            if (response.status === 200) return response.json();
        }).then((usersData) => {
            setUsers(usersData);
            console.log(usersData);
        });
    }, []);

    function createWorkerUser() {
        const reqBody = {
            username: username,
            password: password,
            name: name,
            cohortStartDate: cohortStartDate,
            email: email,
            phoneNumber: phoneNumber,
        };

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

        fetch("api/users/register/worker", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify(reqBody),
        })
            .then((response) => response.json)
            .then((data) =>
                setPassword(""), setUsername(""), setName(""), setEmail(""), setPhoneNumber("")
            );
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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                                placeholder="00407523473984"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                            onClick={() => {
                                createWorkerUser()
                            }}
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
                                    </tr>
                                ))
                            ) : (<></>)}
                        </tbody>

                    </Table>

                    <Row>
                        <Col>
                            <div
                                className="d-flex justify-content-center"
                                style={{ cursor: "pointer", fontSize: "large", color: "burgundy" }}
                                onClick={() => {
                                    window.location.reload(true);
                                }}
                            >
                                Refresh Database
                            </div>
                        </Col>
                    </Row>

                </div>

            </Container>

        </div>

    );
};

export default RegisterWorker