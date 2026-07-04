import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Placeholder from "./pages/Placeholder";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/categories" element={<Placeholder title="التصنيفات" />} />
      <Route path="/orders" element={<Placeholder title="الطلبات" />} />
      <Route path="/account" element={<Placeholder title="حسابي" />} />
      <Route path="/cart" element={<Placeholder title="سلة المشتريات" />} />
    </Routes>
  );
}
