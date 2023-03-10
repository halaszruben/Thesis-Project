import React from "react";
import { Button } from "react-bootstrap";

const Homepage = () => {
    function goToRegister() {
        window.location = "/registerWorker";
    }
    function goToLogin() {
        window.location = "/login";
    }
    return (
        <div className="nav">
            <Button onClick={goToLogin} >Login</Button>

            <Button onClick={goToRegister} className="btn" >Register</Button>
        </div>
    )

}

export default Homepage;