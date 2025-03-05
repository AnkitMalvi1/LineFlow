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
import { Button } from "@/components/ui/button";

const CreateMaterialModal = ({ isOpen, onClose, refreshMaterials }) => {
    const [name, setName] = useState("");
    const [currentStock, setCurrentStock] = useState(0);
    const [minimumStockLevel, setMinimumStockLevel] = useState(5);

    const handleSubmit = async () => {
        if (!name || currentStock < 0 || minimumStockLevel < 0) {
            toast.error("Please fill in all fields correctly.");
            return;
        }

        try {
            await API.post("/materials", { name, currentStock, minimumStockLevel });
            refreshMaterials();
            toast.success("Material added successfully");
            onClose();
        } catch (error) {
            toast.error("Failed to create material", error.response?.data?.message || error.message);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Material</DialogTitle>
                    <DialogDescription>Fill in the details to add a new material.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Material Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="Current Stock"
                        value={currentStock}
                        onChange={(e) => setCurrentStock(Number(e.target.value))}
                    />
                    <Input
                        type="number"
                        placeholder="Minimum Stock Level"
                        value={minimumStockLevel}
                        onChange={(e) => setMinimumStockLevel(Number(e.target.value))}
                    />
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

export default CreateMaterialModal;
