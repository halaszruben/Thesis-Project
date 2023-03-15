import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import BooksTable from '../BooksTable';
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

    const emptyBook = {
        id: null,
        title: "",
        author: "",
        themes: "",
        language: "",
        pages: 0,
        numberOfBooks: 0,
        bookstoreId: bookstoreId != null ? parseInt(bookstoreId) : null
    }
    const [book, setBook] = useState(emptyBook)
    const [books, setBooks] = useState([]);

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

        if (book.id) {
            ajax(`/api/books/${book.id}`, "PUT", user.jwt, book)
                .then((data) => {
                    const booksCopy = [...books];
                    const i = booksCopy.findIndex((book) => book.id === data.id);
                    booksCopy[i] = data;
                    setBooks(booksCopy);
                    setBook(emptyBook);
                });

        } else {
            ajax("/api/books", "POST", user.jwt, book).then((bookData) => {
                const booksCopy = [...books]
                booksCopy.push(bookData);
                setBooks(booksCopy);
                setBook(emptyBook)
            });
        }
    }

    function handleEditBook(bookId) {
        const i = books.findIndex((book) => book.id === bookId);
        const bookCopy = {
            id: books[i].id,
            title: books[i].title,
            author: books[i].author,
            themes: books[i].themes,
            language: books[i].language,
            pages: books[i].pages,
            numberOfBooks: books[i].numberOfBooks,
            bookstoreId: bookstoreId != null ? parseInt(bookstoreId) : null
        }
        setBook(bookCopy);
    }

    function handleDeleteBook(bookId) {
        ajax(`/api/books/${bookId}`, "DELETE", user.jwt)
            .then((msg) => {
                const booksCopy = [...books];
                const i = booksCopy.findIndex((book) => book.id === bookId);
                booksCopy.splice(i, 1);
                setBooks(booksCopy);
            })
    }

    useEffect(() => {
        ajax(`/api/books?bookstoreId=${bookstoreId}`, "GET", user.jwt, null)
            .then((booksData) => {
                setBooks(booksData);
            });
    }, []);

    function onValChange(prop, value) {
        const newBook = { ...book };
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

            <div >
                <BooksTable tableData={books}
                    emitEditBook={handleEditBook}
                    emitDeleteBook={handleDeleteBook} />
            </div>

        </Container>
    );
};

export default ManagerBookstoreView;