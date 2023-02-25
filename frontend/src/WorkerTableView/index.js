import React, { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import ajax from '../util/fetchService'

const WorkerTableView = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const tableId = window.location.href.split("/tables/")[1];
    const [table, setTable] = useState({
        chairs: "",
        description: "",

    });

    function updateTable(prop, value) {
        const newTable = { ...table };
        newTable[prop] = value;
        console.log(newTable);
        setTable(newTable);
    }

    function save() {

        ajax(`/api/tables/${tableId}`, "PUT", jwt, table)
            .then((tableData) => {
                setTable(tableData);
            });
    }

    useEffect(() => {

        ajax(`/api/tables/${tableId}`, "GET", jwt)
            .then((tableData) => {
                if (tableData.chairs === null) {
                    tableData.chairs = "";
                }
                if (tableData.description === null) {
                    tableData.description = "";
                }
                setTable(tableData);
            });
    }, []);
    return (
        <div>
            <h1>Table {tableId}</h1>
            {table ? (
                <>
                    <h2>Status: {table.status}</h2>
                    <h3>
                        chairs:
                        <input
                            type="text"
                            id="chairs"
                            onChange={(event) => updateTable("chairs", event.target.value)}
                            value={table.chairs} />
                    </h3>
                    <h3>
                        description:
                        <textarea
                            type="text"
                            id="description"
                            onChange={(event) => updateTable("description", event.target.value)}
                            value={table.description} />
                    </h3>
                    <button onClick={() => save()}>Update Table</button>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};


export default WorkerTableView;