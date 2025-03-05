import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../redux/slices/orderSlice";
import { fetchMaterials } from "../redux/slices/materialSlice";
import { FaShoppingCart, FaBox, FaExclamationTriangle } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.orders);
    const { materials } = useSelector((state) => state.materials);
    const { user, token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token) {
            dispatch(fetchOrders());
            dispatch(fetchMaterials());
        }
    }, [token, dispatch]);

    if (!user) return <p>Loading...</p>;

    const lowStockCount = materials.filter(m => m.currentStock < m.minimumStockLevel).length;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">📊 Dashboard</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Card className="bg-blue-500 text-white">
                    <CardHeader className="flex justify-between items-center text-center">
                        <CardTitle>Total Orders</CardTitle>
                        <FaShoppingCart className="text-4xl opacity-75" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-center">{orders.length}</p>
                    </CardContent>
                </Card>

                <Card className="bg-green-500 text-white">
                    <CardHeader className="flex justify-between items-center text-center">
                        <CardTitle>Total Materials</CardTitle>
                        <FaBox className="text-4xl opacity-75" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-center">{materials.length}</p>
                    </CardContent>
                </Card>

                <Card className={`text-white ${lowStockCount > 0 ? "bg-red-500" : "bg-gray-300 text-gray-700"}`}>
                    <CardHeader className="flex justify-between items-center text-center">
                        <CardTitle>Low Stock Alerts</CardTitle>
                        <FaExclamationTriangle className="text-4xl opacity-75" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-center">{lowStockCount}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Orders List */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>📦 Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-200">
                                <TableHead className="text-center">Order ID</TableHead>
                                <TableHead className="text-center">Product</TableHead>
                                <TableHead className="text-center">Quantity</TableHead>
                                <TableHead className="text-center">Priority</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.slice(0, 5).map(order => (
                                <TableRow key={order._id} className="text-center">
                                    <TableCell>{order.orderId}</TableCell>
                                    <TableCell>{order.productName}</TableCell>
                                    <TableCell>{order.quantity}</TableCell>
                                    <TableCell className={`font-bold ${order.priority === "High" ? "text-red-500" : order.priority === "Medium" ? "text-yellow-500" : "text-green-500"}`}>
                                        {order.priority}
                                    </TableCell>
                                    <TableCell>{order.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
