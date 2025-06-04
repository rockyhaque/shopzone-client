import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { LogOut, RotateCw, User } from "lucide-react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import type { IDecodedUser } from "../types/IUser";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [user, setUser] = useState<IDecodedUser | null>(null);
  const [shops, setShops] = useState<string[] | null>(null);
  const [showShops, setShowShops] = useState(false);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const token = Cookies.get("token" , {domain: 'localhost'});

    console.log("main token", token)
    if (token) {
      try {
        const decoded = jwtDecode<IDecodedUser>(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleShopClick = (shopName: string) => {
    // Remove any special characters from shop name for subdomain
    const cleanShopName = shopName.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
    window.location.href = `http://${cleanShopName}.localhost:5173`;
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from this session.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0ea5e9",
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

  const handleProfileClick = async () => {
    setShowShops(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const token = Cookies.get("token" , {domain: 'localhost'});

    console.log("main token 2", token)
    if (!token || !user?.username) return;

    try {
      const res = await fetch(
        `https://shopzone-server.vercel.app/api/shop/my-shop/${user.username}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        setShops(data.data.shops);
      } else {
        setShops([]);
      }
    } catch (err) {
      console.error("Error fetching shops", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-blue-600 text-white p-4">
        <div
          onClick={handleProfileClick}
          className="flex items-center gap-2 cursor-pointer hover:bg-blue-500 p-2 rounded"
        >
          <User />
          <span>{user?.username}</span>
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 flex items-center gap-1 bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 bg-gray-100">
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>

        {showShops ? (
          <div>
            <h3 className="text-lg font-medium mb-2">My Shops:</h3>
            {shops && shops.length > 0 ? (
              <ul className="list-disc pl-5">
                {shops.map((shop, index) => (
                  <li
                    key={index}
                    className="cursor-pointer hover:text-blue-600 hover:underline"
                    onClick={() => handleShopClick(shop)}
                  >
                    {shop}
                  </li>
                ))}
              </ul>
            ) : (
              // <p>No shops found.</p>
              <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <RotateCw className="w-8 h-8 animate-spin text-blue-600 mb-2" />
                  <p>Verifying your session...</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-600">Welcome to Dashboard</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
