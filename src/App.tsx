import { Toaster } from "sonner";
import "./App.css";
import RegisterForm from "./pages/Register";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <div>
      <Toaster richColors />
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
