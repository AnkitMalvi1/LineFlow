import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const Analytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const { data } = await API.get("/analytics/overview");
            setAnalytics(data);
        } catch (error) {
            toast.error("Error fetching analytics");
            setError(error.response?.data?.message || "Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    // 🔹 Prepare Chart Data
    const chartData = analytics.ordersByStatus.map(status => ({
        name: status._id,
        count: status.count,
    }));

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 📊 Total Orders */}
            <Card>
                <CardHeader>
                    <CardTitle>Total Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{analytics.totalOrders}</p>
                </CardContent>
            </Card>

            {/* 🔍 Orders By Status */}
            <Card>
                <CardHeader>
                    <CardTitle>Orders By Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        {analytics.ordersByStatus.map((status) => (
                            <li key={status._id} className="flex justify-between">
                                <span>{status._id}</span>
                                <span className="font-bold">{status.count}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            {/* 🏭 Material Usage (Low Stock Alert) */}
            <Card>
                <CardHeader>
                    <CardTitle>Materials - Low Stock</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        {analytics.materialUsage
                            .filter((material) => material.currentStock < material.minimumStockLevel)
                            .map((material) => (
                                <li key={material.name} className="flex justify-between text-red-500">
                                    <span>{material.name}</span>
                                    <span className="font-bold">{material.currentStock}</span>
                                </li>
                            ))}
                    </ul>
                </CardContent>
            </Card>

            {/* 📊 Orders by Status Chart */}
            <Card className="col-span-2">
                <CardHeader>
                    <CardTitle>Order Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#4F46E5" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
};

export default Analytics;
