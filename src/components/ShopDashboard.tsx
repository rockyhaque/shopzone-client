import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import type { IDecodedUser } from "../types/IUser";
import { RotateCw } from "lucide-react";

const ShopDashboard = () => {
  const [shopName, setShopName] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IDecodedUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Extract shop name from subdomain
    const hostParts = window.location.host.split('.');
    const currentShop = hostParts.length > 0 ? hostParts[0] : '';
    setShopName(currentShop);

    // Verify token
    const token = Cookies.get("token");
    
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode<IDecodedUser>(token);
      setUser(decoded);
      
      // In a real app, you would verify with backend here
      // await verifyTokenWithBackend(token);
      
      setLoading(false);
    } catch (error) {
      console.error("Invalid token", error);
      navigate("/login");
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <RotateCw className="w-8 h-8 animate-spin text-blue-600 mb-2" />
          <p>Verifying your session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">
          This is {shopName} shop
        </h1>
        <p className="text-gray-600">
          Logged in as: {user?.username}
        </p>
      </div>
    </div>
  );
};

export default ShopDashboard;