import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../UserProvider";
import ajax from "../util/fetchService";

const PrivateRoute = (props) => {
    const user = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(null);
    const { children } = props;

    if (user) {
        ajax(`/api/auth/validate?token=${user.jwt}`, "get", user.jwt).then((isValid) => {
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

