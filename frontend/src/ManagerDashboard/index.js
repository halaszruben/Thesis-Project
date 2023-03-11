import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useUser } from '../UserProvider';
import ajax from '../util/fetchService';

const ManagerDashboard = () => {

    const user = useUser();
    const [bookstores, setBookstores] = useState(null);

    useEffect(() => {
        ajax("api/bookstores", "GET", user.jwt)
            .then((bookstoreData) => {
                setBookstores(bookstoreData);
            });
    }, [user.jwt]);

    function createBookStore() {
        ajax("api/bookstores", "POST", user.jwt)
            .then((bookstore) => {
                window.location.href = `/bookstores/${bookstore.id}`;
            });
    }

    return (
        <div style={{ margin: "2em" }}>

            {bookstores ? (
                <div
                    className='d-grid gap-5'
                    style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
                >

                    {bookstores.map((bookstore) => (
                        <Card
                            key={bookstore.id}
                            style={{ width: "18rem", height: "18rem" }}
                        >

                            <Card.Body
                                className='d-flex flex-column justify-content-around'>

                                <Card.Title>{bookstore.name} bookstore!</Card.Title>

                                <Card.Text
                                    style={{ marginTop: "1em" }}>
                                    <p>
                                        <b>Description</b>: {bookstore.description}
                                    </p>
                                    <p>
                                        <b>Location</b>: {bookstore.location}
                                    </p>
                                </Card.Text>

                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        window.location.href = `/bookstores/${bookstore.id}`;
                                    }}>
                                    Manage
                                </Button>

                            </Card.Body>

                        </Card>
                    ))}
                </div>
            ) : (
                <></>
            )}

            <div className="mt-5">
                <Button
                    size='lg'
                    onClick={() => createBookStore()}>
                    Add a new Restaurant
                </Button>
            </div>

        </div>

    );
};

export default ManagerDashboard;