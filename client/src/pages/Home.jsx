import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    }, [user, navigate]);

    return <p className="text-center p-10">Redirecting...</p>;
};

export default Home;
