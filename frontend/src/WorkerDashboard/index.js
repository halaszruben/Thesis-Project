import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ajax from "../util/fetchService";
import { useLocalState } from "../util/useLocalStorage";

const WorkerDashboard = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [tables, setTables] = useState(null);

    useEffect(() => {
        ajax("api/tables", "GET", jwt)
            .then((tablesData) => {
                setTables(tablesData);
            });
    }, []);

    function createTable() {
        ajax("api/tables", "POST", jwt)
            .then((table) => {
                window.location.href = `/tables/${table.id}`;
            });
    }

    return (
        <div style={{ margin: "2em" }}>
            {tables ? (
                tables.map((table) => (
                    <div key={table.id}>
                        <Link to={`/tables/${table.id}`}>
                            Table ID: {table.id}
                        </Link>
                    </div>
                ))
            ) : (
                <div></div>
            )}
            <button onClick={() => createTable()}>Add a new Table</button>
        </div>
    );
};

export default WorkerDashboard;