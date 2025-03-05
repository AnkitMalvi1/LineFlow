import { Link } from "react-router-dom";
import { FaTachometerAlt, FaClipboardList, FaCubes, FaChartBar, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle Button */}
            <div className="absolute top-4 left-4 md:hidden z-50">
                <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                </Button>
            </div>

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-40 bg-gray-900 text-white p-4 w-64 transition-transform transform
                ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:flex md:flex-col md:h-screen md:shrink-0`}>

                <h2 className="text-xl font-bold mb-6">Production Management</h2>
                <ul className="space-y-4">
                    <li>
                        <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center p-2 hover:bg-gray-700 rounded">
                            <FaTachometerAlt className="mr-3" /> Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/orders" onClick={() => setIsOpen(false)} className="flex items-center p-2 hover:bg-gray-700 rounded">
                            <FaClipboardList className="mr-3" /> Orders
                        </Link>
                    </li>
                    <li>
                        <Link to="/materials" onClick={() => setIsOpen(false)} className="flex items-center p-2 hover:bg-gray-700 rounded">
                            <FaCubes className="mr-3" /> Materials
                        </Link>
                    </li>
                    <li>
                        <Link to="/analytics" onClick={() => setIsOpen(false)} className="flex items-center p-2 hover:bg-gray-700 rounded">
                            <FaChartBar className="mr-3" /> Analytics
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Overlay (for closing sidebar on mobile) */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </>
    );
};

export default Sidebar;
