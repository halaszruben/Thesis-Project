import { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BookTableView from '../BookTableView';

function ShowBooks(props) {

    const books = props.bookdata;

    const [query, setQuery] = useState("");
    const keys = ["title", "author", "themes"];
    const search = (books) => {
        return books.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(query))
        );
    }

    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div style={{
                padding: "0.25%",
                minHeight: "50vh",
                maxHeight: "200vh",
                backgroundImage: `url("/menu3.jpg")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}>
                <Modal.Header closeButton
                    style={{ color: "white" }}>
                    <Modal.Title id="contained-modal-title-vcenter"
                        style={{ fontFamily: "-moz-initial", color: "white" }}>
                        Here you can see our Book collection!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mt-2">
                        <InputGroup className="mb-3">
                            <InputGroup.Text
                                style={{ fontFamily: "-moz-initial", color: "black" }}>Search by: Title, Author and Theme</InputGroup.Text>
                            <Form.Control
                                placeholder='Search ...'
                                onChange={(e) => setQuery(e.target.value.toLowerCase())} />
                        </InputGroup>
                        {<BookTableView books={search(books)} />}

                    </div>
                    <p style={{ fontFamily: "-moz-initial", color: "white" }}>
                        ″‘At last all such things must end,’
                        he said,
                        ‘but I would have you wait a little while longer: for the end of the deeds that you have shared in has not yet come.
                        A day draws near that I have looked for in all the years of my manhood,
                        and when it comes I would have my friends beside me.‘”
                    </p>
                    <p style={{ fontFamily: "-moz-initial", color: "white" }}>
                        Author: J.R.R. Tolkien | Book: The Lord of the Rings: The Return of the King | Character: Aragorn
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </div>
        </Modal>
    );
};

export default ShowBooks;
