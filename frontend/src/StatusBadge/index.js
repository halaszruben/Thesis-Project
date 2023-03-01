import React from "react";
import { Badge } from "react-bootstrap";

const StatusBadge = (props) => {
    const { text } = props;
    function getColorOfBadge() {
        if (text === "Table is free") return "success";
        else if (text === "Table is occupied") return "danger";
        else if (text === "Leaving the table") return "warning";
        else if (text === "Tidying the table") return "info";
        else return "dark";
    }
    return (
        <Badge
            pill
            bg={getColorOfBadge()}
            style={{
                fontSize: "1em",
            }}
        >
            {text}
        </Badge>
    );
};

export default StatusBadge;