import { Button, Table } from "react-bootstrap";

function BeverageAndPastryTable({ tableData, emitDeleteBevAndPast, emitEditBevAndPast }) {
    return (
        <div className="mt-5">
            <Table striped bordered hover>

                <thead dark>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Amount in HUF</th>
                        <th>Type of food or beverage</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {tableData ? (
                        tableData.map((data) => (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.costs}</td>
                                <td>{data.type}</td>
                                <Button variant="primary"
                                    style={{ margin: "0.2em" }}
                                    onClick={() => emitEditBevAndPast(data.id)}>Edit</Button>
                                <Button variant="danger"
                                    onClick={() => emitDeleteBevAndPast(data.id)}>Delete</Button>
                            </tr>
                        ))
                    ) : (<></>)}
                </tbody>

            </Table>
        </div >
    );
};

export default BeverageAndPastryTable;