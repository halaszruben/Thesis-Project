import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useUser } from '../UserProvider';
import ajax from '../util/fetchService';

const ManagerBookstoreView = () => {

    const navigate = useNavigate();
    const user = useUser();
    const bookstoreId = window.location.href.split("bookstores/")[1];
    const [bookstore, setBookstore] = useState({
        name: "",
        location: "",
        description: "",
    });

    const emptyComment = {
        title: "",
        author: "",
        themes: "",
        language: "",
        pages: null,
        numberOfBooks: null,
        bookstoreId: bookstoreId != null ? parseInt(bookstoreId) : null
    }
    const [book, setBook] = useState(emptyComment)

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

        toast.success("The data has been updated!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
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

    function submitBook() {
        ajax("/api/books", "POST", user.jwt, book).then((data) => {
            console.log(data);
        });
    }

    function onValChange(prop, value) {
        const newBook = { ...book };
        console.log("book values : ", book);
        newBook[prop] = value;
        setBook(newBook);
    }

    return (
        <Container className='mt-5'>
            <h1 className='bookstoreTitle d-flex'>{bookstore.name}</h1>

            {bookstore ? (
                <>
                    <Form.Group
                        as={Row}
                        className='my-3'>
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
                        className='my-3'>
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
                        className='my-3'>
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
                        onClick={() => (navigate(`/tables/${bookstore.id}`))}>
                        Manage Tables
                    </Button>

                    <Button
                        className='me-3'
                        size='lg'
                        variant='secondary'
                        onClick={() => (navigate("/dashboard"))}>
                        Back
                    </Button>

                    <ToastContainer />
                </>

            ) : (
                <></>
            )}

            <InputGroup.Text
                className='mt-4'>
                Enter the book's data's in this order: Title, Author, Themes, Language, pages, number of available books
            </InputGroup.Text>

            <InputGroup className="mt-1">
                <Form.Control
                    placeholder='Title'
                    type='text'
                    onChange={(e) => onValChange("title", e.target.value)}
                    value={book.title}
                />
                <Form.Control
                    placeholder='Author'
                    type='text'
                    onChange={(e) => onValChange("author", e.target.value)}
                    value={book.author} />
                <Form.Control
                    placeholder='Themes'
                    type='text'
                    onChange={(e) => onValChange("themes", e.target.value)}
                    value={book.themes} />
                <Form.Control
                    placeholder='Language'
                    type='text'
                    onChange={(e) => onValChange("language", e.target.value)}
                    value={book.language} />
                <Form.Control
                    placeholder='pages'
                    type='number'
                    onChange={(e) => onValChange("pages", e.target.value)}
                    value={book.pages} />
                <Form.Control
                    placeholder='number of books'
                    type='number'
                    onChange={(e) => onValChange("numberOfBooks", e.target.value)}
                    value={book.numberOfBooks} />
                <Button
                    onClick={() => submitBook()}
                >
                    Add book
                </Button>
            </InputGroup>

        </Container>
    );
};

export default ManagerBookstoreView;