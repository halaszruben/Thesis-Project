import React from 'react';
import { Badge, Table } from 'react-bootstrap';

const BookTableView = ({ books }) => {

    let sortedProducts = [...books];

    sortedProducts.sort((a, b) => {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    });

    return (
        <Table striped bordered hover>

            <thead dark>
                <tr>
                    <th style={{ color: "white" }}>Title</th>
                    <th style={{ color: "white" }}>Author</th>
                    <th style={{ color: "white" }}>Themes</th>
                    <th style={{ color: "white" }}>Language</th>
                    <th style={{ color: "white" }}>Pages</th>
                    <th style={{ color: "white" }}>Number of books</th>
                </tr>
            </thead>
            <tbody>
                {books ? (
                    sortedProducts.map((data) => (
                        <tr key={data.id}>
                            <td style={{ color: "white" }}>{data.title}</td>
                            <td style={{ color: "white" }}>{data.author}</td>
                            <td style={{ color: "white" }}>
                                <Badge bg="info">{data.themes}</Badge>
                            </td>
                            <td style={{ color: "white" }}>{data.language}</td>
                            <td style={{ color: "white" }}>{data.pages}</td>
                            <td style={{ color: "white" }}>{data.numberOfBooks}</td>
                        </tr>
                    ))
                ) : (<></>)}
            </tbody>
        </Table>
    );
};

export default BookTableView;