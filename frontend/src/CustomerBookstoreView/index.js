import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
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
            maxHeight: "300vh",
            backgroundImage: `url("/Bookstore.jpg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }}>

            <Navbar bg='dark' variant='dark'
                style={{
                    backgroundImage: `url("/navbar6.jpg")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                }}>
                <Container>
                    <Navbar.Brand
                        style={{ fontSize: "2vw", margin: "0em" }}>Manager Bookstores view</Navbar.Brand>
                    <Navbar.Brand
                        className='justify-content-center'>Here you can find all the available Bookstores to us</Navbar.Brand>
                    <Nav.Link
                        style={{ color: "red", cursor: "pointer", fontSize: "1.7vw", fontWeight: "bold" }}
                        onClick={() => {
                            user.setJwt(null);
                            navigate("/")
                        }}>
                        Logout
                    </Nav.Link>
                </Container>
            </Navbar>

            <Container className='mt-3'>

                {bookstores ? (

                    <div
                        className='d-grid gap-5 justify-content-center'
                        style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
                    >

                        {bookstores.map((bookstore) => (

                            <Card
                                key={bookstore.id}
                                style={{
                                    width: "18rem", height: "28rem",
                                    backgroundImage: `url("/bookstoreview1.jpg")`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover"
                                }}

                            >

                                <Card.Body
                                    className='d-flex flex-column justify-content-around'
                                >

                                    <Card.Title className='d-flex justify-content-center'
                                        style={{ fontFamily: "-moz-initial", fontWeight: "bold", color: "black" }}>{bookstore.name} bookstore</Card.Title>

                                    <Card.Text
                                        style={{ marginTop: "1em" }}>
                                        <p>
                                            <b style={{ fontFamily: "-moz-initial", color: "black", fontSize: "1.2em" }}>Description</b>: {bookstore.description}
                                        </p>
                                        <p>
                                            <b style={{ fontFamily: "-moz-initial", color: "black", fontSize: "1.2em" }}>Location</b>: {bookstore.location}
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