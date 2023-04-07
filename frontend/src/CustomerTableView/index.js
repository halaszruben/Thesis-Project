import React, { useEffect, useRef, useState } from 'react';
import ajax from '../util/fetchService'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import StatusBadge from '../StatusBadge';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserProvider';
import CommentContainer from '../CommentContainer';
import ShowBooks from '../ShowBooks';
import ShowFoodBeverage from '../ShowFoodBeverage';

const CustomerTableView = () => {
    const user = useUser();
    const tableId = window.location.href.split("/table/")[1];
    const [table, setTable] = useState({
        chairs: "",
        description: "",
        assignedNumber: null,
        status: null,
    });
    const [tableStatuses, setTableStatuses] = useState([]);
    const prevTableValue = useRef(table);
    const navigate = useNavigate();

    const [modalShow, setModalShow] = useState(false);
    const [books, setBooks] = useState([]);

    const [modalShowBevAndPast, setModalShowBevAndPast] = useState(false);
    const [bevsAndPasts, setBevsAndPasts] = useState([]);

    function updateTable(prop, value) {
        const newTable = { ...table };
        newTable[prop] = value;
        setTable(newTable);

    }

    function leave(status) {

        if (status && table.status !== status) {
            updateTable("status", status);
            window.location.href = `/tables/${table.bookStoreId.id}`;
        } else {
            persist();
        }
    }

    function persist() {
        ajax(`/api/tables/${tableId}`, "PUT", user.jwt, table)
            .then((tableData) => {
                setTable(tableData);

            });

    };

    useEffect(() => {
        if (prevTableValue.current.status !== table.status) {
            persist();
        }
        prevTableValue.current = table;
    }, [table]);

    useEffect(() => {

        ajax(`/api/tables/${tableId}`, "GET", user.jwt)
            .then((tableResponse) => {

                let tableData = tableResponse.table;

                if (tableData.chairs === null) tableData.chairs = "";
                if (tableData.description === null) tableData.description = "";

                setTable(tableData);
                setTableStatuses(tableResponse.statusEnums);

                ajax(`/api/books?bookstoreId=${tableData.bookStoreId.id}`, "GET", user.jwt, null)
                    .then((booksData) => {
                        setBooks(booksData);
                    });

                ajax(`/api/bevsAndPasties?bookstoreId=${tableData.bookStoreId.id}`, "GET", user.jwt, null)
                    .then((bevsAndPastsData) => {
                        setBevsAndPasts(bevsAndPastsData);
                    });
            });
    }, []);

    return (
        <div style={{
            padding: "0.25%",
            minHeight: "100vh",
            maxHeight: "200vh",
            backgroundImage: `url("/tableview1.jpg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }}>

            <Container className="mt-2" >
                <Row className="d-flex justify-content-center">
                    <Col>
                        {table.assignedNumber ?
                            (<h1 className='tableNumber'>Table #{table.assignedNumber}</h1>) : (
                                <h1 className='tableNumber'>This is a new Table</h1>
                            )}

                    </Col>
                    <Col>
                        <StatusBadge text={table.status} />
                    </Col>
                </Row>

                {table ? (
                    <>

                        <Form.Group
                            as={Row}
                            className="my-1 align-items-center"
                            controlId="assignedNumber"
                            style={{ fontFamily: "-moz-initial", color: "white" }}>
                            <Form.Label column sm="3" md="2"
                                className='textNextToInput'
                                style={{ color: "black" }}>
                                Assigned Table number:
                            </Form.Label>
                            <Col sm="4" md="3" lg="2" xs="5">
                                <Form.Control
                                    onChange={(event) => updateTable("assignedNumber", event.target.value)}
                                    type="text"
                                    readOnly
                                    value={table.assignedNumber}
                                    placeholder="the_number_you_want_to_identify_this_table_with"
                                    style={{ backgroundColor: "lightgrey" }}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group
                            as={Row}
                            className="my-1 align-items-center"
                            controlId="chairs">
                            <Form.Label column sm="3" md="2"
                                className='textNextToInput'
                                style={{ color: "black" }}>
                                Number of sitting places:
                            </Form.Label>
                            <Col sm="4" md="3" lg="2" xs="5">
                                <Form.Control
                                    onChange={(event) => updateTable("chairs", event.target.value)}
                                    type="text"
                                    readOnly
                                    value={table.chairs}
                                    placeholder="0"
                                    style={{ backgroundColor: "lightgrey" }}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group
                            as={Row}
                            className="mb-2 align-items-center"
                            controlId="description">
                            <Form.Label column sm="3" md="2"
                                className='textNextToInput'
                                style={{ color: "black" }}>
                                Description:
                            </Form.Label>
                            <Col sm="9" md="8" lg="8">
                                <textarea
                                    type=""
                                    readOnly
                                    placeholder="describe_the_background"
                                    onChange={(event) => updateTable("description", event.target.value)}
                                    value={table.description}
                                    style={{ width: "80%", height: "80px", borderRadius: "0.50em", backgroundColor: "lightgrey", color: "black" }}
                                />
                            </Col>
                        </Form.Group>

                        <div className="d-flex gap-3 mt-5">

                            <Button
                                variant="danger"
                                size="lg"

                                onClick={() => leave(tableStatuses[2].status)}>
                                Leave Table
                            </Button>

                            <Button
                                size='lg'
                                variant='info btn-outline-dark'
                                className="d-flex"
                                onClick={() => setModalShow(true)}>
                                Show Books
                            </Button>

                            <ShowBooks
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                bookdata={books} />

                            <Button
                                size='lg'
                                variant='info btn-outline-dark'
                                className="d-flex"
                                onClick={() => setModalShowBevAndPast(true)}>
                                Show Drinks & Pastries
                            </Button>

                            <ShowFoodBeverage
                                show={modalShowBevAndPast}
                                onHide={() => setModalShowBevAndPast(false)}
                                bevAndPastData={bevsAndPasts} />

                            <ToastContainer />
                        </div>

                        <CommentContainer tableId={tableId} />
                    </>
                ) : (
                    <></>
                )
                }
            </Container>
        </div>

    );
};


export default CustomerTableView;