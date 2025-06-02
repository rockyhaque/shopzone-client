import { Toaster } from "sonner";
import "./App.css";
import RegisterForm from "./pages/Register";

function App() {
  return (
    <div>
      <Toaster richColors />
      <RegisterForm />
    </div>
  );
}

export default App;
