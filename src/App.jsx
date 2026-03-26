import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import "./App.css";
import Login from "./Auth/Login";
import Pagegallery from "./Pages/Pagegallery";
import Cart from "./Pages/Cart";
import AllProducts from "./Pages/AllProducts";
import ProductDetails from "./Pages/ProductDetails";
import Payment from "./Pages/Payment";
import Profile from "./Pages/Profile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="category/:slug" element={<Pagegallery />} />
          <Route path="cart" element={<Cart />} />
          <Route path="payment" element={<Payment />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
