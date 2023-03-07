import React, { useEffect, useRef, useState } from 'react';
import ajax from '../util/fetchService'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import StatusBadge from '../StatusBadge';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../UserProvider";

const WorkerTableView = () => {
    const user = useUser();
    const tableId = window.location.href.split("/tables/")[1];
    const [table, setTable] = useState({
        chairs: "",
        description: "",
        assignedNumber: null,
        status: null,
    });
    const [tableStatuses, setTableStatuses] = useState([]);
    const prevTableValue = useRef(table);
    const navigate = useNavigate();

    function updateTable(prop, value) {
        const newTable = { ...table };
        newTable[prop] = value;
        setTable(newTable);

    }

    function save(status) {

        // if (table.status === tableStatuses[4].status) {
        //     updateTable("status", tableStatuses[0].status);
        if (status && table.status !== status) {
            updateTable("status", status);
            toast.info(`The table status has been updated to: ${status}`, {
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
                console.log(tableData);
                console.log(tableResponse);
                setTableStatuses(tableResponse.statusEnums);
            });
    }, []);

    return (
        <Container className="mt-5" >
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
                        className="my-3"
                        controlId="assignedNumber">
                        <Form.Label column sm="3" md="2">
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
                        className="my-3"
                        controlId="chairs">
                        <Form.Label column sm="3" md="2">
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
                        className="mb-3"
                        controlId="description">
                        <Form.Label column sm="3" md="2">
                            Description:
                        </Form.Label>
                        <Col sm="9" md="8" lg="8">
                            <Form.Control
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
                            className="mt-5"
                            variant="success"
                            onClick={() => save(tableStatuses[0].status)}>
                            Save Attributes /
                            Free the table up
                        </Button>

                        <Button
                            size="lg"
                            className="mt-5"
                            variant="info"
                            onClick={() => save(tableStatuses[3].status)}>
                            Tidying
                        </Button>

                        <Button
                            size="lg"
                            variant="secondary"
                            className="mt-5"
                            onClick={() => (window.location.href = "/dashboard")}
                        >
                            Back
                        </Button>
                        <ToastContainer />
                    </div>
                    <Button
                        size="lg"
                        className="mt-5"
                        variant="dark"
                        onClick={() => save(tableStatuses[4].status)}>
                        Unavailable
                    </Button>
                </>
            ) : (
                <></>
            )
            }
        </Container>

    );
};


export default WorkerTableView;