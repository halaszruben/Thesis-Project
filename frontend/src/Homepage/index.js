import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../Login";
import RegisterCustomer from "../RegisterCustomer"
import { useUser } from "../UserProvider";

const Homepage = () => {
    const user = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.jwt) navigate("/dashboard");
    }, [user])

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