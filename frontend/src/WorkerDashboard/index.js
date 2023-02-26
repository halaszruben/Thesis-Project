import React, { useEffect, useState } from "react";
import ajax from "../util/fetchService";
import { useLocalState } from "../util/useLocalStorage";
import { Alert, Button, Card } from "react-bootstrap";

const WorkerDashboard = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [tables, setTables] = useState(null);


    function deleteTable(tableId) {
        ajax(`api/tables/${tableId}`, "DELETE", jwt)

        const tablesCopy = [...tables];
        const i = tablesCopy.findIndex((table) => table.id === tableId);
        tablesCopy.splice(i, 1);
        setTables(tablesCopy);
    }

    function createTable() {
        ajax("api/tables", "POST", jwt)
            .then((table) => {
                window.location.href = `/tables/${table.id}`;
            });
    }

    useEffect(() => {
        ajax("api/tables", "GET", jwt)
            .then((tablesData) => {
                setTables(tablesData);
            });
    }, [jwt]);

    return (
        <div style={{ margin: "3em" }}>
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
                                    Table #{table.id}
                                </Card.Title>
                                <Card.Subtitle className="mb-1 text-muted">
                                    {table.status}
                                </Card.Subtitle>
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
                                    Edit
                                </Button>
                                <Button
                                    variant="warning" size="sm"
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
            )}
        </div>
    );
};

export default WorkerDashboard;