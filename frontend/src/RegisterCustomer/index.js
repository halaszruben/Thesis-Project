import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ajax from "../util/fetchService"
import { useUser } from "../UserProvider";

const RegisterCustomer = () => {
    const user = useUser();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        if (user.jwt) navigate("/dashboard");
    }, [user]);

    function createAndLoginUser() {
        const reqBody = {
            username: username,
            password: password,
            name: name,
        };

        fetch("api/users/register/customer", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify(reqBody),
        })
            .then((response) => {
                if (response.status === 200)
                    return Promise.all([response.json(), response.headers]);
                else return Promise.reject("Invalid login attempt");
            })
            .then(([body, headers]) => {
                user.setJwt(headers.get("authorization"));
            }).catch((message) => {
                alert(message);
            });
    }



    return (
        <div style={{ width: "50%" }}>
            <Container className="mt-5 "
            >

                <Row className="justify-content-center">
                    <Col md="8" lg="8">
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label className="fs-4 textAboveInput ">Nickname:</Form.Label>
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
                    <Col md="8" lg="8">
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label className="fs-4 textAboveInput">Username:</Form.Label>
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
                    <Col md="8" lg="8">
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label className="fs-4 textAboveInput">Password:</Form.Label>
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
                        className="d-flex justify-content-center"
                    >
                        <Button
                            id="submit"
                            type="button"
                            size="lg"
                            onClick={() => {
                                createAndLoginUser()
                            }}
                        >
                            Register
                        </Button>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default RegisterCustomer