import React, { useEffect, useState } from "react";
import ajax from "../util/fetchService";
import { Button, Card, Col, Row } from "react-bootstrap";
import StatusBadge from "../StatusBadge";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider";

const WorkerDashboard = () => {
    const user = useUser();
    const [tables, setTables] = useState(null);
    const bookstoreId = window.location.href.split("/tables/")[1];

    const emptyTable = {
        id: null,
        bookStoreId: bookstoreId != null ? parseInt(bookstoreId) : null,
        chairs: null,
        assignedNumber: null,
        description: "",
        status: "",
    }


    function deleteTable(tableId) {
        ajax(`api/tables/${tableId}`, "DELETE", user.jwt)

        const tablesCopy = [...tables];
        const i = tablesCopy.findIndex((table) => table.id === tableId);
        tablesCopy.splice(i, 1);
        setTables(tablesCopy);
    }

    function createTable() {
        ajax("/api/tables", "POST", user.jwt, emptyTable)
            .then((table) => {
                console.log("this is my log", table);
                console.log("Should pass through this", emptyTable);
                window.location.href = `/table/${table.id}`;
            });
    }

    useEffect(() => {
        ajax(`/api/tables?bookStoreId=${bookstoreId}`, "GET", user.jwt, null)
            .then((tablesData) => {
                setTables(tablesData);
            });
    }, []);

    return (
        <div style={{ margin: "3em" }}>

            <Row>
                <Col>
                    <div
                        className="d-flex justify-content-end"
                        style={{ cursor: "pointer", fontSize: "large", color: "burgundy" }}
                        onClick={() => {
                            user.setJwt(null);
                            window.location.href = "/login";
                        }}
                    >
                        Logout
                    </div>
                </Col>
            </Row>

            <div className="mb-5">
                <Button size="lg" onClick={() => createTable()}>
                    Add new Table
                </Button>
            </div>

            {tables ? (
                <div
                    className="d-grid gap-5"
                    style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
                >
                    {tables.map((table) => (
                        <Card
                            key={table.id}
                            style={{ width: "18rem", height: "32rem" }}
                        >
                            <Card.Body
                                className="d-flex flex-column justify-content-around">
                                <Card.Title
                                    className="tableNumber"
                                >
                                    Table #{table.assignedNumber}
                                </Card.Title>
                                <div>
                                    <StatusBadge text={table.status} />
                                </div>
                                <Card.Text style={{ marginTop: "1em" }}>
                                    <p>
                                        <b>Description</b>: {table.description}
                                    </p>
                                    <p>
                                        <b>Number of seating places</b>: {table.chairs}
                                    </p>
                                </Card.Text>

                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        window.location.href = `/table/${table.id}`;
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger" size="sm"
                                    onClick={() => deleteTable(table.id)}
                                >
                                    Delete
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            ) : (
                <></>
            )
            }
        </div >
    );
};

export default WorkerDashboard;