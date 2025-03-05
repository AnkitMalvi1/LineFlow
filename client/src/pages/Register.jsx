import React, { useState } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Operator"); // Default role
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await API.post("/auth/register", { username, email, password, role, department: "Assembly" });
            toast.success("Registration successful! Logged in.");
            navigate("/login");
        } catch (error) {
            // toast.error(error.response?.data?.message || "Registration failed");
            toast.error("Registration failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 w-96">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Create an Account</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        
                        <Select value={role} onValueChange={setRole}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Operator">Operator</SelectItem>
                                <SelectItem value="Manager">Manager</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button type="submit" className="w-full text-blue-500" disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </Button>
                    </form>
                    <p className="text-center mt-4 text-gray-600">
                        Already have an account? <span className="text-indigo-400 font-semibold cursor-pointer" onClick={() => navigate("/login")}>Login</span>
                    </p>
                </CardContent>
            </Card>

            <div className="mt-6 text-sm text-gray-600">
                <p><strong>Note:</strong> You can register by any of the roles (Manager/Operator) only after logging in as Manager first from the Login page.</p>
            </div>
        </div>
    );
};

export default Register;
