import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            navigate("/dashboard"); // ✅ Redirect to dashboard when user is logged in
        }
    }, [user, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post("/auth/login", { email, password });
            dispatch(loginSuccess(data));
            toast.success("Login successful");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 w-96">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Login to Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Button type="submit" className="w-full text-blue-500">Login</Button>
                    </form>
                    <p className="text-center mt-4 text-gray-600">
                        Don't have an account? <span className="text-indigo-400 font-semibold cursor-pointer" onClick={() => navigate("/register")}>Register</span>
                    </p>
                </CardContent>
            </Card>

            <div className="mt-6 text-sm text-gray-600">
                <p><strong>Login Email:</strong> admin@gmail.com</p>
                <p><strong>Login Password:</strong> 123</p>
                <p><strong>Role:</strong> Manager</p>
            </div>
        </div>
    );
};

export default Login;
