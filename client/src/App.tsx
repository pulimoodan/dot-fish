import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Page } from "@shopify/polaris";
import ProductList from "./components/products/ProductList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrderItems from "./components/order/OrderItems";
import CustomerForm from "./components/customer/CustomerForm";
import CompletedMessage from "./components/completed/CompletedMessage";
import OrderDetails from "./components/order/OrderDetails";
import OrderStatus from "./components/order/OrderStatus";

function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <BrowserRouter>
        <Page narrowWidth>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/confirm" element={<OrderItems />} />
            <Route path="/details" element={<OrderDetails />} />
            <Route path="/customer" element={<CustomerForm />} />
            <Route path="/completed" element={<CompletedMessage />} />
            <Route path="/order/:id" element={<OrderStatus />} />
          </Routes>
        </Page>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
