import React from 'react';
import { Badge, Table } from 'react-bootstrap';

const BookTableView = ({ books }) => {
    return (
        <Table striped bordered hover>

            <thead dark>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Themes</th>
                    <th>Language</th>
                    <th>Pages</th>
                    <th>Number of books</th>
                </tr>
            </thead>
            <tbody>
                {books ? (
                    books.map((data) => (
                        <tr key={data.id}>
                            <td>{data.id}</td>
                            <td>{data.title}</td>
                            <td>{data.author}</td>
                            <td>
                                <Badge bg="info">{data.themes}</Badge>
                            </td>
                            <td>{data.language}</td>
                            <td>{data.pages}</td>
                            <td>{data.numberOfBooks}</td>
                        </tr>
                    ))
                ) : (<></>)}
            </tbody>
        </Table>
    );
};

export default BookTableView;