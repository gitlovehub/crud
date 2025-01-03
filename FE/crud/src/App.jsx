import { Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutPage from "../layouts/Page";
import HomePage from "../pages/home/Page";
import LayoutAdmin from "./Layout";
import Products from "../components/Products";
import ProductAdd from "../components/ProductAdd";
import ProductEdit from "../components/ProductEdit";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="admin" element={<LayoutAdmin />}>
          <Route index element={<Products />} />
          <Route path="products/add" element={<ProductAdd />} />
          <Route path="products/edit/:id" element={<ProductEdit />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
