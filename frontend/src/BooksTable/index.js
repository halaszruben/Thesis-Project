import { Button, Table } from "react-bootstrap";

function BooksTable({ tableData }) {
    return (
        <div className="mt-5">
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
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {tableData ? (
                        tableData.map((data) => (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.title}</td>
                                <td>{data.author}</td>
                                <td>{data.themes}</td>
                                <td>{data.language}</td>
                                <td>{data.pages}</td>
                                <td>{data.numberOfBooks}</td>
                                <Button variant="primary"
                                    style={{ margin: "0.2em" }}>Edit</Button>
                                <Button variant="danger">Delete</Button>
                            </tr>
                        ))
                    ) : (<></>)}
                </tbody>

            </Table>
        </div >
    );
};

export default BooksTable;