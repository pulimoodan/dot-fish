import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Layout/NavBar";
import { Container } from "react-bootstrap/esm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CustomerPage from "./pages/CustomerPage";
import OrderPage from "./pages/OrderPage";
import SettingPage from "./pages/SettingPage";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <>
      <NavBar />
      <Container className="p-3">
        <BrowserRouter>
          <Routes>
            <Route path="/admin" element={<HomePage />} />
            <Route path="/admin/products" element={<ProductPage />} />
            <Route path="/admin/categories" element={<CategoryPage />} />
            <Route path="/admin/customers" element={<CustomerPage />} />
            <Route path="/admin/orders" element={<OrderPage />} />
            <Route path="/admin/settings" element={<SettingPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
