import React from "react";
import { Button } from "react-bootstrap";
import Login from "../Login";
import RegisterCustomer from "../RegisterCustomer"

const Homepage = () => {

    return (
        <>
            <div className="nav">

            </div>
            <div>
                <div>
                    <Login />
                </div>
                <div>
                    <RegisterCustomer />
                </div>
            </div>
        </>
    )

}

export default Homepage;