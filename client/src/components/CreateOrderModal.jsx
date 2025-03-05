import React, { useState } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const CreateOrderModal = ({ isOpen, onClose, refreshOrders }) => {
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [priority, setPriority] = useState("Medium");

    const handleSubmit = async () => {
        if (!productName || quantity <= 0) {
            toast.error("Please fill in all fields correctly.");
            return;
        }

        try {
            await API.post("/orders", { productName, quantity, priority });
            refreshOrders();
            toast.success("Order created successfully");
            onClose();
        } catch (error) {
            toast.error("Failed to create order", error.response?.data?.message || error.message);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Order</DialogTitle>
                    <DialogDescription>Fill in the details to add a new order.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Product Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                    <Select value={priority} onValueChange={setPriority}>
                        <SelectTrigger>
                            <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex justify-end space-x-4">
                        <Button variant="secondary" onClick={onClose} className="text-gray-400">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} className="text-green-400">Create</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateOrderModal;
