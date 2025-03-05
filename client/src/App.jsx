import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Materials from "./pages/Materials";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Analytics from "./pages/Analytics";
import Workstations from "./pages/Workstations";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/*" element={<MainLayout />} />
            </Routes>
        </Router>
    );
};

const MainLayout = () => {
    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-grow overflow-auto">
                <Navbar />
                <div className="p-6 flex-grow overflow-auto">
                    <Routes>
                        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["Manager", "Operator"]}><Dashboard /></ProtectedRoute>} />
                        <Route path="/orders" element={<ProtectedRoute allowedRoles={["Manager"]}><Orders /></ProtectedRoute>} />
                        <Route path="/materials" element={<ProtectedRoute allowedRoles={["Manager", "Operator"]}><Materials /></ProtectedRoute>} />
                        <Route path="/analytics" element={<ProtectedRoute allowedRoles={["Manager"]}><Analytics /></ProtectedRoute>} />
                        <Route path="/workstations" element={<ProtectedRoute allowedRoles={["Manager"]}><Workstations /></ProtectedRoute>} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default App;
