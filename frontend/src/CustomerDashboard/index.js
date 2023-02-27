import React, { useEffect, useState } from "react";
import ajax from "../util/fetchService";
import { useLocalState } from "../util/useLocalStorage";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";

const CustomerDashboard = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [tables, setTables] = useState(null);






    useEffect(() => {
        ajax("api/tables", "GET", jwt)
            .then((tablesData) => {
                setTables(tablesData);
            });
    }, [jwt]);

    return (
        <Container style={{ margin: "3em" }}>

            <Row>
                <Col>
                    <div
                        className="d-flex justify-content-end"
                        style={{ cursor: "pointer", fontSize: "large", color: "burgundy" }}
                        onClick={() => {
                            setJwt(null);
                            window.location.href = "/login"
                        }}
                    >
                        Logout
                    </div>
                </Col>
            </Row>

            <Row>
                <Col>
                    <div className="h1">Customer Dashboard</div>
                </Col>
            </Row>

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
                                    <Badge
                                        pill
                                        bg="success"
                                        style={{ fontSize: "1em" }}
                                    >
                                        {table.status}
                                    </Badge>
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
                                        window.location.href = `/tables/${table.id}`;
                                    }}
                                >
                                    Sit down
                                </Button>

                            </Card.Body>
                        </Card>
                    ))}
                </div>
            ) : (
                <></>
            )}
        </Container>
    );
};

export default CustomerDashboard;