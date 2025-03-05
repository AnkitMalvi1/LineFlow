import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWorkstations, createWorkstation, updateWorkstation } from "../redux/slices/workstationSlice";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const Workstations = () => {
    const dispatch = useDispatch();
    const { workstations, loading, error } = useSelector((state) => state.workstations);
    const { user } = useSelector((state) => state.auth);
    const [isModalOpen, setModalOpen] = useState(false);
    const [workstationName, setWorkstationName] = useState("");

    useEffect(() => {
        dispatch(fetchWorkstations());
    }, [dispatch]);

    const handleCreateWorkstation = () => {
        if (!workstationName) {
            toast.error("Workstation name is required");
            return;
        }

        dispatch(createWorkstation({ name: workstationName }));
        setModalOpen(false);
        setWorkstationName("");
    };

    const handleUpdateStatus = (id, status) => {
        dispatch(updateWorkstation({ id, status }));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">⚙️ Workstations</h1>

            {user.role === "Manager" && (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="mb-4">+ Add Workstation</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Add Workstation</DialogTitle>
                        <Input 
                            placeholder="Workstation Name" 
                            value={workstationName} 
                            onChange={(e) => setWorkstationName(e.target.value)} 
                        />
                        <Button className="bg-green-500 text-white p-2 rounded" onClick={handleCreateWorkstation}>
                            Create
                        </Button>
                    </DialogContent>
                </Dialog>
            )}

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Workstation Name</th>
                        <th className="border p-2">Status</th>
                        {user.role === "Manager" && <th className="border p-2">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {workstations.map((workstation) => (
                        <tr key={workstation._id} className="text-center">
                            <td className="border p-2">{workstation.name}</td>
                            <td className="border p-2">
                                <span className={`px-2 py-1 rounded ${workstation.status === "Active" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                                    {workstation.status}
                                </span>
                            </td>
                            {user.role === "Manager" && (
                                <td className="border p-2">
                                    <Select value={workstation.status} onChange={(e) => handleUpdateStatus(workstation._id, e.target.value)}>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </Select>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Workstations;
