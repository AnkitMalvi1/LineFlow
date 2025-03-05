import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md w-full">
            <h1 className="text-xl font-bold">LineFlow</h1>
            <div className="flex items-center space-x-4">
                {user && (
                    <Card className="bg-gray-800 px-3 py-1 rounded-lg text-sm text-white">
                        Role: {user.role}
                    </Card>
                )}
                {user && (
                    <Button className="text-red-400" onClick={handleLogout} variant="destructive" size="sm">
                        Logout
                    </Button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
