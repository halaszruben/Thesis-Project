import React from "react";
import { Button } from "react-bootstrap";

const Homepage = () => {

    function goToRegisterWorker() {
        window.location = "/registerWorker";
    }

    function goToLogin() {
        window.location = "/login";
    }

    function goToRegister() {
        window.location = "/registerCustomer";
    }

    return (
        <div className="nav">
            <Button onClick={goToLogin} >Login</Button>

            <Button onClick={goToRegisterWorker} className="btn" >Register Worker</Button>

            <Button onClick={goToRegister} className="btn" >Register</Button>
        </div>
    )

}

export default Homepage;