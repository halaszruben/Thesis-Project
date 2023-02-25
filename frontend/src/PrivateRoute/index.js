import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Form, Navigate } from "react-router-dom";
import ajax from "../util/fetchService";
import { useLocalState } from "../util/useLocalStorage";

const PrivateRoute = ({ children }) => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(null);

    if (jwt) {
        ajax(`/api/auth/validate?token=${jwt}`, "get", jwt).then((isValid) => {
            setIsValid(isValid);
            setIsLoading(false);
        });
    } else {
        return <Navigate to="/login" />;
    }

    return isLoading ? (
        <div style={{ textAlign: "center" }}><h3>Loading ...</h3></div>
    ) : isValid === true ? (
        children
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoute;

