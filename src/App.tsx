import { Routes, Route } from "react-router-dom";
import Layout from "@layouts/Layout";
import Login from "@pages/Login";
import Register from "@pages/Register";
import Calculator from "@pages/Calculator";
import Guide from "@pages/Guide";
import ProtectedRoute from "@components/PortectedRoute";
import CarsList from "./pages/CarsList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route index element={<Calculator />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/my-cars" element={<CarsList />} />
      </Route>
    </Routes>
  );
}

export default App;
