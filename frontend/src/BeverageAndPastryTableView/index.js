import React from 'react';
import { Table } from 'react-bootstrap';

const BeverageAndPastryTableView = ({ bevsAndPasts }) => {

    let sortedProducts = [...bevsAndPasts];

    sortedProducts.sort((a, b) => {
        if (a.type < b.type) {
            return -1;
        }
        if (a.type > b.type) {
            return 1;
        }
        return 0;
    });

    return (
        <div className="mt-5">
            <Table striped bordered hover>

                <thead dark>
                    <tr>
                        <th>Name</th>
                        <th>Amount in HUF</th>
                        <th>Type of food or beverage</th>
                    </tr>
                </thead>

                <tbody>
                    {bevsAndPasts ? (
                        sortedProducts.map((data) => (
                            <tr key={data.id}>
                                <td>{data.name}</td>
                                <td>{data.costs}</td>
                                <td>{data.type}</td>
                            </tr>
                        ))
                    ) : (<></>)}
                </tbody>

            </Table>
        </div >
    );
};

export default BeverageAndPastryTableView;