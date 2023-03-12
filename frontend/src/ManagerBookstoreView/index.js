import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useUser } from '../UserProvider';
import ajax from '../util/fetchService';
import WorkerTableView from '../WorkerTableView';

const ManagerBookstoreView = () => {

    const navigate = useNavigate();
    const user = useUser();
    const bookstoreId = window.location.href.split("bookstores")[1];
    const [bookstore, setBookstore] = useState({
        name: "",
        location: "",
        description: "",
    });

    function updateBookstore(prop, value) {
        const newBookstore = { ...bookstore };
        newBookstore[prop] = value;
        setBookstore(newBookstore);
    }

    function save() {
        ajax(`/api/bookstores/${bookstoreId}`, "PUT", user.jwt, bookstore)
            .then((bookstoreData) => {
                setBookstore(bookstoreData);
            });
    }

    useEffect(() => {
        ajax(`/api/bookstores/${bookstoreId}`, "GET", user.jwt)
            .then((bookstoreData) => {
                if (bookstoreData.name === null)
                    bookstoreData.name = "";
                if (bookstoreData.location === null)
                    bookstoreData.location = "";
                if (bookstoreData.description === null)
                    bookstoreData.description = "";

                setBookstore(bookstoreData);
            });
    }, []);

    return (
        <Container className='mt-5'>

            {bookstore ? (
                <>

                    <h1 className='bookstoreTitle d-flex'>{bookstore.name}</h1>

                    <Form.Group
                        as={Row}
                        className='my-3'
                        controlId="formPlaintextEmail">
                        <Form.Label
                            column
                            sm="3"
                            md="2">
                            Name:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">

                            <Form.Control
                                id="name"
                                onChange={(e) => updateBookstore("name", e.target.value)}
                                type="text"
                                value={bookstore.name}
                                placeholder="What is the place called"
                            />

                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}
                        className='my-3'
                        controlId="formPlaintextEmail">
                        <Form.Label
                            column
                            sm="3"
                            md="2">
                            Location:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">

                            <Form.Control
                                id="location"
                                onChange={(e) => updateBookstore("location", e.target.value)}
                                type="text"
                                value={bookstore.location}
                                placeholder="Where is it located"
                            />

                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}
                        className='my-3'
                        controlId="formPlaintextEmail">
                        <Form.Label
                            column
                            sm="3"
                            md="2">
                            Description:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">

                            <textarea
                                style={{ width: "100%", height: "80px", borderRadius: "0.25em" }}
                                id="description"
                                onChange={(e) => updateBookstore("description", e.target.value)}
                                type="text"
                                value={bookstore.description}
                                placeholder="Describe the place"
                            />

                        </Col>
                    </Form.Group>

                    <Button
                        className='me-3'
                        size='lg'
                        onClick={() => save()}>
                        Update bookstore
                    </Button>

                    <Button
                        className='me-3'
                        size='lg'
                        variant='info'
                        onClick={() => (navigate("/registerWorker"))}>
                        Manage Workers
                    </Button>

                    <Button
                        className='me-3'
                        size='lg'
                        variant='info'
                        onClick={() => (navigate("/tables"))}>
                        Manage Tables
                    </Button>

                    <Button
                        className='me-3'
                        size='lg'
                        variant='secondary'
                        onClick={() => (navigate("/dashboard"))}>
                        Back
                    </Button>

                </>

            ) : (
                <></>
            )}

        </Container>
    );
};

export default ManagerBookstoreView;