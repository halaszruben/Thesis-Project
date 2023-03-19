import { Button, Table } from "react-bootstrap";

function BeverageAndPastryTable({ tableData, emitDeleteBevAndPast, emitEditBevAndPast }) {
    return (
        <div className="mt-5"
            style={{
                minHeight: "15vh",
                maxHeight: "200vh",
                backgroundImage: `url("/menu3.jpg")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}>
            <Table striped bordered hover>

                <thead dark>
                    <tr>
                        <th style={{ color: "cyan" }}>#</th>
                        <th style={{ color: "cyan" }}>Name</th>
                        <th style={{ color: "cyan" }}>Amount in HUF</th>
                        <th style={{ color: "cyan" }}>Type of food or beverage</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {tableData ? (
                        tableData.map((data) => (
                            <tr key={data.id}>
                                <td style={{ color: "cyan" }}>{data.id}</td>
                                <td style={{ color: "cyan" }}>{data.name}</td>
                                <td style={{ color: "cyan" }}>{data.costs}</td>
                                <td style={{ color: "cyan" }}>{data.type}</td>
                                <Button variant="primary"
                                    style={{ margin: "0.2em", color: "white" }}
                                    onClick={() => emitEditBevAndPast(data.id)}>Edit</Button>
                                <Button variant="danger"
                                    style={{ color: "white" }}
                                    onClick={() => emitDeleteBevAndPast(data.id)}>Delete</Button>
                            </tr>
                        ))
                    ) : (<></>)}
                </tbody>

            </Table>
        </div>
    );
};

export default BeverageAndPastryTable;