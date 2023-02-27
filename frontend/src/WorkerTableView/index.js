import React, { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import ajax from '../util/fetchService'
import { Badge, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

const WorkerTableView = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const tableId = window.location.href.split("/tables/")[1];
    const [table, setTable] = useState({
        chairs: "",
        description: "",
        assignedNumber: null,
        status: null,
    });
    const [tableStatuses, setTableStatuses] = useState([]);

    function updateTable(prop, value) {
        const newTable = { ...table };
        newTable[prop] = value;
        setTable(newTable);

    }

    function save() {

        console.log(`Status is ${table.status}`);
        if (table.status === tableStatuses[0].status) {
            console.log("setting new status be:", tableStatuses[1].status);
            updateTable("status", tableStatuses[1].status);
        }

        ajax(`/api/tables/${tableId}`, "PUT", jwt, table)
            .then((tableData) => {
                setTable(tableData);

                toast.success('The table has been Updated!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
    }

    useEffect(() => {

        ajax(`/api/tables/${tableId}`, "GET", jwt)
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
                    <Badge pill bg="success" style={{ fontSize: "1em" }}>
                        {table.status}
                    </Badge>
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

                    <Button size="lg" className="mt-5" onClick={() => save()}>
                        Save Attributes
                    </Button>
                    <ToastContainer />
                </>
            ) : (
                <></>
            )
            }
        </Container>

    );
};


export default WorkerTableView;