import React, { useEffect, useState } from "react";
import ajax from "../util/fetchService";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import jwt_decode from "jwt-decode"
import StatusBadge from "../StatusBadge";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider";

const CustomerDashboard = () => {
    const user = useUser();
    const [tables, setTables] = useState(null);
    const bookstoreId = window.location.href.split("/tables/")[1];

    useEffect(() => {
        if (!user.jwt)
            window.location.href = "/login";
    });

    function orderAtTable(table) {
        window.location.href = `/table/${table.id}`;
        claimTable(table);
    }

    function claimTable(table) {
        const decodedJwt = jwt_decode(user.jwt);
        const tableClaimer = {
            username: decodedJwt.sub,
        }
        table.tableClaimer = tableClaimer;
        //TODO: no hard code
        table.status = "Table is occupied";

        ajax(`api/tables/${table.id}`, "PUT", user.jwt, table)
            .then(updatedTable => {
                const tablesCopy = [...tables];
                const i = tablesCopy.findIndex((t) => t.id === table.id);
                tablesCopy[i] = updatedTable;
                setTables(tablesCopy);
            });
    }

    useEffect(() => {
        ajax(`/api/tables?bookStoreId=${bookstoreId}`, "GET", user.jwt, null)
            .then((tablesData) => {
                setTables(tablesData);
            });
    }, []);

    return (
        <Container style={{ margin: "3em" }}>

            <div>
                <div
                    className="logout"
                    onClick={() => {
                        user.setJwt(null);
                        window.location.href = "/login";
                    }}
                >
                    Logout
                </div>

                <div
                    className="back"
                    onClick={() => {
                        window.location.href = "/dashboard";
                    }}
                >
                    Back to the Book Stores
                </div>
            </div>

            <Row>
                <Col>
                    <div className="h1">Customer Dashboard</div>
                </Col>
            </Row>

            <div className="table-wrapper free-table">
                <div
                    className="table-statuses h2 px-2">
                    Free Tables
                </div>

                {(tables && tables.filter((table) => table.status === "Table is free").length > 0) ? (
                    <div
                        className="d-grid gap-4"
                        style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
                    >
                        {tables.filter((table) => table.status === "Table is free")
                            .map((table) => (
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
                                            variant="info"
                                            onClick={() => {
                                                orderAtTable(table);
                                            }}
                                        >
                                            Sit down
                                        </Button>

                                    </Card.Body>
                                </Card>
                            ))}
                    </div>
                ) : (
                    <div>Currently there are no free tables</div>
                )}
            </div>

            <div className="table-wrapper occupied-table">
                <div
                    className="table-statuses h2 px-2">
                    Occupied Tables
                </div>
                {(tables && tables.filter((table) => table.status === "Table is occupied").length > 0) ? (
                    <div
                        className="d-grid gap-5"
                        style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
                    >
                        {tables.filter((table) => table.status === "Table is occupied")
                            .map((table) => (
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
                                    </Card.Body>
                                </Card>
                            ))}
                    </div>
                ) : (
                    <div>There are no occupied tables</div>
                )}
            </div>

            <div className="table-wrapper unavailable-table">
                <div
                    className="table-statuses h2 px-2">
                    Unavailable Tables
                </div>
                {(tables && tables.filter((table) => table.status === "Unavailable").length > 0) ? (
                    <div
                        className="d-grid gap-5"
                        style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
                    >
                        {tables.filter((table) => table.status === "Unavailable")
                            .map((table) => (
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

                                    </Card.Body>
                                </Card>
                            ))}
                    </div>
                ) : (
                    <div>All the tables are available for customers</div>
                )}
            </div>

        </Container>
    );
};

export default CustomerDashboard;