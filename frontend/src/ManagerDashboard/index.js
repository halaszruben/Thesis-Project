import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../UserProvider';
import ajax from '../util/fetchService';

const ManagerDashboard = () => {

    const user = useUser();
    const [bookstores, setBookstores] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        ajax("api/bookstores", "GET", user.jwt)
            .then((bookstoreData) => {
                setBookstores(bookstoreData);
            });
    }, [user.jwt]);

    function createBookStore() {
        ajax("api/bookstores", "POST", user.jwt)
            .then((bookstore) => {
                window.location.href = `/bookstores/${bookstore.id}`;
            });
    }

    return (
        <div style={{
            padding: "0.25%",
            minHeight: "100vh",
            maxHeight: "200vh",
            backgroundImage: `url("/Bookstore.jpg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }}>
            <div style={{ margin: "2em" }}>

                <Row>
                    <Col>
                        <div
                            className="logout d-flex justify-content-end"
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
                            style={{ fontFamily: "-moz-initial", color: "white", fontSize: "2vw" }}>
                            Here you can add the bookstores and manage them. </p>
                    </Col>
                </Row>

                {bookstores ? (
                    <div
                        className='d-grid mt-3 gap-5 justify-content-center'
                        style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
                    >

                        {bookstores.map((bookstore) => (
                            <Card
                                key={bookstore.id}
                                style={{
                                    width: "18rem", height: "18rem",
                                    backgroundImage: `url("/booksview.jpg")`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover"
                                }}
                            >

                                <Card.Body
                                    className='d-flex flex-column justify-content-around'>

                                    <Card.Title
                                        className='d-flex justify-content-center'
                                        style={{ fontFamily: "-moz-initial", color: "white" }}
                                    >{bookstore.name} bookstore</Card.Title>

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
                                        variant="secondary"
                                        onClick={() => {
                                            window.location.href = `/bookstores/${bookstore.id}`;
                                        }}>
                                        Manage
                                    </Button>

                                </Card.Body>

                            </Card>
                        ))}
                    </div>
                ) : (
                    <></>
                )}

                <div className="mt-5 text-center">
                    <Button
                        size='lg'
                        onClick={() => createBookStore()}>
                        Add a new Restaurant
                    </Button>
                </div>

            </div>
        </div>

    );
};

export default ManagerDashboard;