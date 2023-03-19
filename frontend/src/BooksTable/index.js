import { Badge, Button, Table } from "react-bootstrap";

function BooksTable({ tableData, emitDeleteBook, emitEditBook }) {
    return (
        <div style={{
            minHeight: "20vh",
            maxHeight: "200vh",
            backgroundImage: `url("/menu3.jpg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }}>
            <div className="mt-5">
                <Table striped bordered hover>

                    <thead dark>
                        <tr>
                            <th style={{ color: "cyan" }}>#</th>
                            <th style={{ color: "cyan" }}>Title</th>
                            <th style={{ color: "cyan" }}>Author</th>
                            <th style={{ color: "cyan" }}>Themes</th>
                            <th style={{ color: "cyan" }}>Language</th>
                            <th style={{ color: "cyan" }}>Pages</th>
                            <th style={{ color: "cyan" }}>Number of books</th>
                            <th style={{ color: "cyan" }}></th>
                        </tr>
                    </thead>

                    <tbody>
                        {tableData ? (
                            tableData.map((data) => (
                                <tr key={data.id}>
                                    <td style={{ color: "cyan" }}>{data.id}</td>
                                    <td style={{ color: "cyan" }}>{data.title}</td>
                                    <td style={{ color: "cyan" }}>{data.author}</td>
                                    <td style={{ color: "cyan" }}>
                                        <Badge bg="info">{data.themes}</Badge>
                                    </td>
                                    <td style={{ color: "cyan" }}>{data.language}</td>
                                    <td style={{ color: "cyan" }}>{data.pages}</td>
                                    <td style={{ color: "cyan" }}>{data.numberOfBooks}</td>
                                    <Button variant="primary"
                                        style={{ margin: "0.2em", color: "white" }}
                                        onClick={() => emitEditBook(data.id)}
                                    >Edit</Button>
                                    <Button variant="danger"
                                        style={{ color: "white" }}
                                        onClick={() => emitDeleteBook(data.id)}
                                    >Delete</Button>
                                </tr>
                            ))
                        ) : (<></>)}
                    </tbody>

                </Table>
            </div >
        </div>
    );
};

export default BooksTable;