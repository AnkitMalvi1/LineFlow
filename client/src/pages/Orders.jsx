import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";
import { fetchOrders } from "../redux/slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CreateOrderModal from "@/components/CreateOrderModal";

const Orders = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.orders);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState("All");
    const [sortBy, setSortBy] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (user) dispatch(fetchOrders());
    }, [user, dispatch]);

    useEffect(() => {
        let updatedOrders = [...orders];

        // 🔍 Apply Status Filter
        if (filterStatus !== "All") {
            updatedOrders = updatedOrders.filter(order => order.status === filterStatus);
        }

        // 📌 Apply Sorting
        if (sortBy === "priority") {
            updatedOrders.sort((a, b) => {
                const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            });
        } else if (sortBy === "createdAt") {
            updatedOrders.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }

        setFilteredOrders(updatedOrders);
    }, [orders, filterStatus, sortBy]);

    const updateStatus = async (id, newStatus) => {
        try {
            await API.put(`/orders/${id}/status`, { status: newStatus });
            dispatch(fetchOrders());
            toast.success("Order status updated");
        } catch (error) {
            toast.error("Failed to update order status", error);
        }
    };

    const deleteOrder = async (id) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                await API.delete(`/orders/${id}`);
                dispatch(fetchOrders());
                toast.success("Order deleted successfully");
            } catch (error) {
                toast.error("Failed to delete order", error);
            }
        }
    };

    return (
        <div className="p-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    {user.role === "Manager" && (
                        <Button onClick={() => setModalOpen(true)} className="mb-4 text-green-400">
                            + Create Order
                        </Button>
                    )}
                    <CreateOrderModal
                        isOpen={isModalOpen}
                        onClose={() => setModalOpen(false)}
                        refreshOrders={fetchOrders}
                    />

                    <div className="flex space-x-4 mb-4">
                        <Select onValueChange={setFilterStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All</SelectItem>
                                <SelectItem value="Planned">Planned</SelectItem>
                                <SelectItem value="In Production">In Production</SelectItem>
                                <SelectItem value="Quality Check">Quality Check</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select onValueChange={setSortBy}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sort By" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="priority">Priority</SelectItem>
                                <SelectItem value="createdAt">Newest First</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">Order ID</TableHead>
                                <TableHead className="text-center">Product</TableHead>
                                <TableHead className="text-center">Quantity</TableHead>
                                <TableHead className="text-center">Priority</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                                <TableHead className="text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.map((order) => (
                                <TableRow key={order._id} className="text-center">
                                    <TableCell>{order.orderId}</TableCell>
                                    <TableCell>{order.productName}</TableCell>
                                    <TableCell>{order.quantity}</TableCell>
                                    <TableCell className={`font-bold ${order.priority === "High" ? "text-red-500" : order.priority === "Medium" ? "text-yellow-500" : "text-green-500"}`}>
                                        {order.priority}
                                    </TableCell>
                                    <TableCell>
                                        {user.role === "Manager" ? (
                                            <Select value={order.status} onValueChange={(value) => updateStatus(order._id, value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Planned">Planned</SelectItem>
                                                    <SelectItem value="In Production">In Production</SelectItem>
                                                    <SelectItem value="Quality Check">Quality Check</SelectItem>
                                                    <SelectItem value="Completed">Completed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        ) : (
                                            order.status
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {user.role === "Manager" && (
                                            <Button variant="destructive" onClick={() => deleteOrder(order._id)} className="text-red-400">
                                                Delete
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default Orders;
