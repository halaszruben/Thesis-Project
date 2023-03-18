import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserProvider';
import ajax from '../util/fetchService';

const CustomerBookstoreView = () => {

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

        <div style={{
            padding: "0.25%",
            minHeight: "100vh",
            maxHeight: "200vh",
            backgroundImage: `url("/booksview4.jpg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }}>

            <Container className='mt-3'
            >

                <Row>
                    <Col>
                        <div
                            className="logout my-4 d-flex justify-content-end"
                            style={{ cursor: "pointer", fontSize: "2vw" }}
                            onClick={() => {
                                user.setJwt(null);
                                navigate("/")
                            }}
                        >
                            Logout
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>

                        <p className="text-break text-center"
                            style={{ fontFamily: "-moz-initial", color: "black", fontSize: "2vw" }}>
                            Here are all the Bookstores that are registered to us. Take your time to look around and find the best place for your convenience, We’re sure whichever You choose will give You an awesome time.                    </p>

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
                                style={{
                                    width: "18rem", height: "18rem", backgroundColor: "lightgrey",
                                    backgroundImage: `url("/Bookstore.jpg")`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover"
                                }}


                            >

                                <Card.Body
                                    className='d-flex flex-column justify-content-around'
                                >


                                    <Card.Title className='d-flex justify-content-center'
                                        style={{ fontFamily: "-moz-initial", color: "white" }}>{bookstore.name} bookstore</Card.Title>

                                    <Card.Text
                                        style={{ marginTop: "1em" }}>
                                        <p>
                                            <b style={{ fontFamily: "-moz-initial", color: "white" }}>Description</b>: {bookstore.description}
                                        </p>
                                        <p>
                                            <b style={{ fontFamily: "-moz-initial", color: "white" }}>Location</b>: {bookstore.location}
                                        </p>
                                    </Card.Text>

                                    <Button
                                        variant="primary"
                                        onClick={() => {
                                            window.location.href = `/tables/${bookstore.id}`;
                                        }}>
                                        Take a look
                                    </Button>

                                </Card.Body>

                            </Card>
                        ))}
                    </div>

                ) : (
                    <></>
                )
                }
            </Container >
        </div >
    );
};

export default CustomerBookstoreView;