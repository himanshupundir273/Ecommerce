import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Forgotpassword from "./pages/Forgotpassword";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import AllUsers from "./pages/AllUsers";
import AdminPanel from "./pages/Adminpanel";
import AllProducts from "./pages/AllProducts";
import "./App.css";
import CategoryProduct from "./pages/CategoryProduct";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Searchproduct from "./pages/Searchproduct";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);
  const fetchuser = async () => {
    const dataresponse = await fetch(SummaryApi.userDetails.url, {
      method: SummaryApi.userDetails.method,
      credentials: "include",
    });
    const dataApi = await dataresponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };
  const fetchuserAddtocart = async () => {
    const dataresponse = await fetch(SummaryApi.countaddtocart.url, {
      method: SummaryApi.countaddtocart.method,
      credentials: "include",
    });
    const dataApi = await dataresponse.json();
    setCartProductCount(dataApi.data.count);
  };
  useEffect(() => {
    fetchuser();
    fetchuserAddtocart();
  }, []);

  return (
    <Context.Provider
      value={{
        fetchuser,
        cartProductCount,
        setCartProductCount,
        fetchuserAddtocart,
      }}
    >
      <div className="bg-gray-100">
        <ToastContainer position="top-center" />{" "}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/forgot-password" element={<Forgotpassword />} />
          <Route path="/admin-panel" element={<AdminPanel />}>
            <Route path="/admin-panel/all-users" element={<AllUsers />} />
            <Route path="/admin-panel/all-products" element={<AllProducts />} />
          </Route>
          <Route
            path="/product-category"
            element={<CategoryProduct />}
          />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/search" element={<Searchproduct/>}/>

        </Routes>
      </div>
    </Context.Provider>
  );
}
export default App;
