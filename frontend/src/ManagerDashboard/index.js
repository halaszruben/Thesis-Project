import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Nav, Navbar, NavbarBrand, Row } from 'react-bootstrap';
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
                        className='justify-content-center'>Here you can add your bookstores and start managing them</Navbar.Brand>
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

            <div style={{ margin: "2em" }}>

                {bookstores ? (
                    <div
                        className='d-grid mt-2 gap-5 justify-content-center'
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
                                    className='d-flex flex-column justify-content-around'>

                                    <Card.Title
                                        className='d-flex justify-content-center'
                                        style={{ fontFamily: "-moz-initial", fontWeight: "bold", color: "black" }}
                                    >{bookstore.name}</Card.Title>

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
                        Add a new Bookstore
                    </Button>
                </div>

            </div>
        </div>

    );
};

export default ManagerDashboard;