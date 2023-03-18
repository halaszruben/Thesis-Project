import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useUser } from "../UserProvider";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const user = useUser();

    function sendLoginRequest() {
        const reqBody = {
            username: username,
            password: password,
        };

        fetch("api/auth/login", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify(reqBody),
        })
            .then((response) => {
                if (response.status === 200) {
                    return Promise.all([response.json(), response.headers]);
                }
                else {
                    return Promise.reject("Invalid credentials!");
                }
            })
            .then(([body, headers]) => {
                user.setJwt(headers.get("authorization"));
                if (body.bookStore.id !== null)
                    window.location.href = `/tables/${body.bookStore.id}`;
                else
                    window.location.href = `/dashboard`;
            })
            .catch((message) => {
                if (message instanceof TypeError) {

                }
                else
                    alert(message);
            });
    }

    return (
        <>
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="username" className="fs-4">Username:</Form.Label>
                            <Form.Control
                                type="email"
                                size="lg"
                                placeholder="littleJon"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col
                        md="8"
                        lg="6">
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="password" className="fs-4">Password:</Form.Label>
                            <Form.Control
                                type="password"
                                size="lg"
                                placeholder="Type in your password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col
                        md="8"
                        lg="6"
                        className="d-flex justify-content-center">
                        <Button
                            id="submit"
                            type="button"
                            size="lg"
                            onClick={() => sendLoginRequest()}
                        >
                            Login
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};


export default Login;