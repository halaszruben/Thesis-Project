import React, { useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const RegisterWorker = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [cohortStartDate, setCohortStartDate] = useState(null);
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

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
            </Container>

        </div>
    )
}

export default RegisterWorker