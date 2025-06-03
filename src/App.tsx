import { Toaster } from "sonner";
import "./App.css";
import RegisterForm from "./pages/Register";
import Login from "./pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import NotFound from "./pages/NotFound";
import ShopDashboard from "./components/ShopDashboard";

function App() {
  // const location = useLocation();
  // const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      <Toaster richColors />
      {/* {!isAuthPage && <Dashboard></Dashboard>} */}

      <Routes>
        {/* Public routes */}
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        
        {/* Shop subdomain route - should be protected */}
        <Route
          path="/shop/:shopName"
          element={
            <PrivateRoute>
              <ShopDashboard />
            </PrivateRoute>
          }
        />
        
        {/* Catch-all routes */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
