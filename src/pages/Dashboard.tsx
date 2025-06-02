import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { LogOut, User } from "lucide-react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import type { IDecodedUser } from "../types/IUser";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [user, setUser] = useState<IDecodedUser | null>(null);
  const navigate = useNavigate();

  // console.log(user)

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode<IDecodedUser>(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token", error);
      }
    } else {
      navigate("/login"); // If no token, redirect to login
    }
  }, [navigate]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from this session.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0ea5e9", // sky blue
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("token");
        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success",
          confirmButtonColor: "#0ea5e9",
        }).then(() => {
          navigate("/login");
        });
      }
    });
  };

  return (
    <div className="p-4 flex items-center justify-between bg-gray-100">
      <div className="flex items-center gap-2">
        <User className="text-2xl text-gray-700" />
        <span className="text-gray-800 font-medium">{user?.username}</span>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
