import React, { useEffect, useRef, useState } from 'react';
import ajax from '../util/fetchService'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import StatusBadge from '../StatusBadge';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from "../UserProvider";
import CommentContainer from '../CommentContainer';
import ShowBooks from '../ShowBooks';

const WorkerTableView = () => {
    const user = useUser();
    const { tableId } = useParams();
    const [table, setTable] = useState({
        chairs: "",
        description: "",
        assignedNumber: null,
        status: null,
    });
    const [books, setBooks] = useState([]);

    const [tableStatuses, setTableStatuses] = useState([]);
    const prevTableValue = useRef(table);
    const navigate = useNavigate();

    const [modalShow, setModalShow] = useState(false);


    function deleteAllComments() {
        ajax("/api/comments", "DELETE", user.jwt).then(() => window.location.reload(true))
    }

    function updateTable(prop, value) {
        const newTable = { ...table };
        newTable[prop] = value;
        setTable(newTable);
    }

    function save(status) {

        if (status && table.status !== status) {
            updateTable("status", status);
            toast.info(`The table status has been updated to: '${status}'`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            persist();
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
            })
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
                                    type="number"
                                    value={table.assignedNumber}
                                    placeholder="the_number_you_want_to_identify_this_table_with"
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group
                            as={Row}
                            className="my-1 align-items-center"
                            controlId="chairs"
                            style={{ fontFamily: "-moz-initial", color: "white" }}>
                            <Form.Label column sm="3" md="2"
                                className='textNextToInput'
                                style={{ color: "black" }}>
                                Number of sitting places:
                            </Form.Label>
                            <Col sm="4" md="3" lg="2" xs="5">
                                <Form.Control
                                    onChange={(event) => updateTable("chairs", event.target.value)}
                                    type="number"
                                    value={table.chairs}
                                    placeholder="0"
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group
                            as={Row}
                            className="mb-2 align-items-center"
                            controlId="description"
                            style={{ fontFamily: "-moz-initial", color: "white" }}>
                            <Form.Label column sm="3" md="2"
                                className='textNextToInput'
                                style={{ color: "black" }}>
                                Description:
                            </Form.Label>
                            <Col sm="9" md="8" lg="8">
                                <textarea
                                    style={{ width: "80%", height: "80px", borderRadius: "0.50em" }}
                                    type=""
                                    placeholder="describe_the_background"
                                    onChange={(event) => updateTable("description", event.target.value)}
                                    value={table.description}
                                />
                            </Col>
                        </Form.Group>

                        <div className="d-flex gap-3">
                            <Button
                                size="lg"
                                className="mt-0.5"
                                variant="success"
                                onClick={() => save(tableStatuses[0].status)}>
                                Save Attributes /
                                Free the table up
                            </Button>

                            <Button
                                size="lg"
                                className="mt-0.5"
                                variant="info"
                                onClick={() => save(tableStatuses[3].status)}>
                                Tidying the table
                            </Button>

                            <Button
                                size="lg"
                                variant="secondary"
                                className="mt-0.5"
                                onClick={() => (window.location.href = `/tables/${table.bookStoreId.id}`)}
                            >
                                Back to the Tables
                            </Button>
                            <ToastContainer />

                        </div>

                        <div className="d-flex justify-content-end">
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
                        </div>

                        <div className='d-flex gap-3'>
                            <Button
                                size="lg"
                                variant="warning"
                                onClick={() => save(tableStatuses[4].status)}>
                                Table is Unavailable
                            </Button>

                            <Button
                                size="lg"
                                variant="warning"
                                onClick={() => deleteAllComments()}>
                                Delete All comments
                            </Button>
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


export default WorkerTableView;