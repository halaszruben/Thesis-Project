import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Login from "../Login";
import RegisterCustomer from "../RegisterCustomer"
import { useUser } from "../UserProvider";

const Homepage = () => {
    const user = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.jwt) navigate("/dashboard");
    }, [user])

    return (

        <div style={{
            padding: "0.25%",
            minHeight: "100vh",
            maxHeight: "200vh",
            backgroundImage: `url("/homepage5.jpg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }}>

            <Container>

                <Row>
                    <Col className="d-flex justify-content-space-around">
                        <Row style={{ width: "50%" }}
                            className="me-5">
                            <h1 className="mt-4 text-center"
                                style={{ fontFamily: "monospace", fontWeight: "bold", color: "white" }}
                            >Well, Hello there fellow book enthusiast</h1>
                            <p className="text-break text-center"
                                style={{ fontFamily: "-moz-initial", color: "white" }}>
                                Here You will be able to find every Book you ever wished for and More! Our crew of book fanatics will guarantee that you will have the best time of your life, so get on already Login and you will see what We're all about.
                            </p>
                        </Row>
                        <Login />
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    <Col className="d-flex justify-content-around">
                        <RegisterCustomer className="me-5" />

                        <Row className="d-flex align-items-center"
                            style={{ width: "35%" }}
                        >
                            <p className=" text-break text-center"
                                style={{ marginTop: "12em", fontFamily: "-moz-initial", color: "white" }}>
                                Oh, is this Your first time? No worries We will take good care of You, don’t you worry! You will see that this is everything you thought it would be and more! So get on already register, so You can meet our fantastic team, have a beverage, maybe some pastries and read your preferred Book. Here You will find that everything is for your convenience.
                            </p>
                        </Row>
                    </Col>
                </Row>

            </Container >

        </div>
    )

}

export default Homepage;