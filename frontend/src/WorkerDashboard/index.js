import React, { useEffect, useState } from "react";
import ajax from "../util/fetchService";
import { Button, Card, Col, Container, Form, InputGroup, Nav, Navbar, Row } from "react-bootstrap";
import StatusBadge from "../StatusBadge";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider";
import BeverageAndPastryTable from "../BeverageAndPastryTable";
import jwt_decode from "jwt-decode";

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
    const emptyBevAndPast = {
        id: null,
        bookstoreId: bookstoreId != null ? parseInt(bookstoreId) : null,
        name: "",
        type: "",
        costs: 0,
    }
    const [bevAndPast, setBevAndPast] = useState(emptyBevAndPast);
    const [bevsAndPasts, setBevsAndPasts] = useState([]);

    function deleteTable(tableId) {
        ajax(`/api/tables/${tableId}`, "DELETE", user.jwt)

        const tablesCopy = [...tables];
        const i = tablesCopy.findIndex((table) => table.id === tableId);
        tablesCopy.splice(i, 1);
        setTables(tablesCopy);
    }

    function createTable() {
        ajax("/api/tables", "POST", user.jwt, emptyTable)
            .then((table) => {
                window.location.href = `/table/${table.id}`;
            });
    }

    useEffect(() => {
        ajax(`/api/tables?bookStoreId=${bookstoreId}`, "GET", user.jwt, null)
            .then((tablesData) => {
                setTables(tablesData);
            });
    }, []);

    function submitBevAndPast() {

        if (bevAndPast.id) {
            ajax(`/api/bevsAndPasties/${bevAndPast.id}`, "PUT", user.jwt, bevAndPast)
                .then((data) => {
                    const bevsAndPastiesCopy = [...bevsAndPasts];
                    const i = bevsAndPasts.findIndex((bevAndPast) => bevAndPast.id === data.id);
                    bevsAndPastiesCopy[i] = data;
                    setBevsAndPasts(bevsAndPastiesCopy);
                    setBevAndPast(emptyBevAndPast);
                });
        } else {

            ajax("/api/bevsAndPasties", "POST", user.jwt, bevAndPast)
                .then((data) => {
                    const bevsAndPastsCopy = [...bevsAndPasts];
                    bevsAndPastsCopy.push(data);
                    setBevsAndPasts(bevsAndPastsCopy);
                    setBevAndPast(emptyBevAndPast);
                });
        }
    }

    useEffect(() => {
        ajax(`/api/bevsAndPasties?bookstoreId=${bookstoreId}`, "GET", user.jwt, null)
            .then((data) => {
                setBevsAndPasts(data);
            });
    }, []);

    function onValChange(prop, value) {
        const newBevAndPast = { ...bevAndPast };
        newBevAndPast[prop] = value;
        setBevAndPast(newBevAndPast);
    }

    function handleEditBevAndPast(bevAndPastId) {
        const i = bevsAndPasts.findIndex((bevAndPast) => bevAndPast.id === bevAndPastId);
        const bevAndPastCopy = {
            id: bevsAndPasts[i].id,
            bookstoreId: bookstoreId != null ? parseInt(bookstoreId) : null,
            name: bevsAndPasts[i].name,
            type: bevsAndPasts[i].type,
            costs: bevsAndPasts[i].costs,
        }
        setBevAndPast(bevAndPastCopy);
    }

    function handleDeleteBevAndPast(bevAndPastId) {
        ajax(`/api/bevsAndPasties/${bevAndPast.id}`, "DELETE", user.jwt)
            .then((msg) => {
                const bevsAndPastiesCopy = [...bevsAndPasts];
                const i = bevsAndPastiesCopy.findIndex((bevAndPast) => bevAndPast.id === bevAndPastId);
                bevsAndPastiesCopy.splice(i, 1);
                setBevsAndPasts(bevsAndPastiesCopy);
            });
    }

    return (

        <div style={{
            padding: "0.25%",
            minHeight: "100vh",
            maxHeight: "500vh",
            backgroundImage: `url("/booksview.jpg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }}>

            <Navbar bg='dark' variant='dark'
                style={{
                    backgroundImage: `url("/navbar6.jpg")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                }}>
                <Container>
                    <Navbar.Brand
                        style={{ fontSize: "2vw", margin: "0em" }}>Worker Tables view</Navbar.Brand>
                    <Navbar.Brand
                        className='justify-content-center'>Here you can manage your tables</Navbar.Brand>
                    <Navbar.Brand>
                        <Button size="lg" onClick={() => createTable()}>
                            Add new Table
                        </Button>
                    </Navbar.Brand>
                    <Nav.Link
                        style={{ color: "red", cursor: "pointer", fontSize: "1.7vw", fontWeight: "bold" }}
                        onClick={() => {
                            user.setJwt(null);
                            window.location.href = "/";
                        }}>
                        Logout
                    </Nav.Link>
                </Container>
            </Navbar>

            <div style={{ margin: "1em" }}>

                {tables ? (
                    <div
                        className="d-grid gap-2"
                        style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
                    >
                        {tables.map((table) => (
                            <Card
                                key={table.id}
                                style={{
                                    width: "18rem", height: "30.3rem",
                                    backgroundImage: `url("/tableback4.jpg")`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover"
                                }}
                            >
                                <Card.Body
                                    className="d-flex flex-column justify-content-around">
                                    <Card.Title
                                        className="tableNumber"
                                        style={{ fontFamily: "-moz-initial", fontWeight: "bold", color: "white" }}
                                    >
                                        Table #{table.assignedNumber}
                                    </Card.Title>
                                    <div>
                                        <StatusBadge text={table.status} />
                                    </div>
                                    <Card.Text style={{ marginTop: "0.5em" }}>
                                        <p style={{ color: "white" }}>
                                            <b style={{ fontFamily: "-moz-initial", color: "white", fontSize: "1.2em" }}>Description:</b> {table.description}
                                        </p>
                                        <p style={{ color: "white" }}>
                                            <b style={{ fontFamily: "-moz-initial", color: "white", fontSize: "1.2em" }}>Number of seating places:</b> {table.chairs}
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

                <InputGroup className="mt-4"
                    style={{ fontFamily: "-moz-initial" }}>
                    <InputGroup.Text
                        style={{ fontFamily: "-moz-initial", color: "black", fontWeight: "bold" }}>
                        Enter the Beverage or Pastry's data's in this order: Name, Cost and Type of the item
                    </InputGroup.Text>
                    <Form.Control
                        placeholder='Name'
                        type='text'
                        onChange={(e) => onValChange("name", e.target.value)}
                        value={bevAndPast.name}
                    />
                    <Form.Control
                        placeholder='Costs'
                        type='number'
                        onChange={(e) => onValChange("costs", e.target.value)}
                        value={bevAndPast.costs} />
                    <Form.Control
                        placeholder='Type'
                        type='text'
                        onChange={(e) => onValChange("type", e.target.value)}
                        value={bevAndPast.type} />
                    <Button
                        onClick={() => submitBevAndPast()}
                    >
                        Add new item to the Menu
                    </Button>
                </InputGroup>

                <div >
                    <BeverageAndPastryTable tableData={bevsAndPasts}
                        emitDeleteBevAndPast={handleDeleteBevAndPast}
                        emitEditBevAndPast={handleEditBevAndPast} />
                </div>

            </div >
        </div >
    );
};

export default WorkerDashboard;