import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { fetchMaterials } from "../redux/slices/materialSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateMaterialModal from "@/components/CreateMaterialModal";

const Materials = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { materials, loading, error } = useSelector((state) => state.materials);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchMaterials());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const updateStock = async (id, newStock) => {
        if (user.role !== "Manager") {
            toast.error("Only Managers can update stock levels");
            return;
        }

        try {
            await API.put(`/materials/${id}`, { currentStock: newStock });
            dispatch(fetchMaterials());
            toast.success("Stock updated successfully");
        } catch (error) {
            toast.error("Failed to update stock", error);
        }
    };

    return (
        <div className="p-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Materials</CardTitle>
                </CardHeader>
                <CardContent>
                    {user.role === "Manager" && (
                        <Button onClick={() => setModalOpen(true)} className="mb-4 text-green-400">
                            + Add Material
                        </Button>
                    )}
                    <CreateMaterialModal
                        isOpen={isModalOpen}
                        onClose={() => setModalOpen(false)}
                        refreshMaterials={fetchMaterials}
                    />

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Material Name</TableHead>
                                <TableHead>Current Stock</TableHead>
                                <TableHead>Minimum Stock Level</TableHead>
                                {user.role === "Manager" && <TableHead>Actions</TableHead>}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {materials.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan="4" className="text-center text-gray-500 p-4">
                                        No materials found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                materials.map((material) => (
                                    <TableRow
                                        key={material._id}
                                        className={
                                            material.currentStock < material.minimumStockLevel
                                                ? "bg-red-100"
                                                : ""
                                        }
                                    >
                                        <TableCell>{material.name}</TableCell>
                                        <TableCell>{material.currentStock}</TableCell>
                                        <TableCell>{material.minimumStockLevel}</TableCell>
                                        {user.role === "Manager" && (
                                            <TableCell>
                                                <input
                                                    type="number"
                                                    defaultValue={material.currentStock}
                                                    className="border p-1 w-20 text-center"
                                                    onBlur={(e) => {
                                                        const newStock = Number(e.target.value);
                                                        if (newStock >= 0) updateStock(material._id, newStock);
                                                        else toast.error("Stock value cannot be negative.");
                                                    }}
                                                />
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default Materials;
