import React from 'react';
import { Badge, Table } from 'react-bootstrap';

const BookTableView = ({ books }) => {

    let sortedProducts = [...books];
    console.log(sortedProducts);
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
                    sortedProducts.map((data) => (
                        <tr key={data.id}>
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