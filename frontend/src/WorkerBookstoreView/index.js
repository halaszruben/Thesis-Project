import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserProvider';
import ajax from '../util/fetchService';

const WorkerBookstoreView = () => {
    const user = useUser();
    const [bookstores, setBookstores] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        ajax("/api/bookstores", "GET", user.jwt)
            .then((bookstoresData) => {
                setBookstores(bookstoresData);
            });
    }, [user.jwt]);

    return (
        <Container>

            <Row>
                <Col>
                    <div
                        className="d-flex justify-content-end"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            user.setJwt(null);
                            navigate("/login")
                        }}
                    >
                        Logout
                    </div>
                </Col>
            </Row>

            <Row>
                <Col>
                    <div className='h1'>Worker Bookstore View</div>
                </Col>
            </Row>

            {bookstores ? (
                <div
                    className='d-grid gap-5'
                    style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
                >

                    {bookstores.map((bookstore) => (

                        <Card
                            key={bookstore.id}
                            style={{ width: "18rem", height: "18rem" }}
                        >

                            <Card.Body
                                className='d-flex flex-column justify-content-around'>

                                <Card.Title>{bookstore.name} bookstore!</Card.Title>

                                <Card.Text
                                    style={{ marginTop: "1em" }}>
                                    <p>
                                        <b>Description</b>: {bookstore.description}
                                    </p>
                                    <p>
                                        <b>Location</b>: {bookstore.location}
                                    </p>
                                </Card.Text>

                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        window.location.href = `/tables`;
                                    }}>
                                    Start Shift
                                </Button>

                            </Card.Body>

                        </Card>
                    ))}
                </div>
            ) : (
                <></>
            )}
        </Container>
    );
};
export default WorkerBookstoreView;