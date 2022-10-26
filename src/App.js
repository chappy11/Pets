import Home from "./pages/Home";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateShop from "./pages/CreateShop";
import MyShop from "./pages/MyShop";
import AddProduct from "./pages/MyShop/Product/AddProduct";
import Product from "./pages/MyShop/Product";
import Admin from "./pages/Admin";
import PendingUser from "./pages/Admin/users/PendingUser";
import PendingShop from "./pages/Admin/shops/PendingShop";
import Subscription from "./pages/MyShop/Subscription";
import ChooseSubscription from "./pages/MyShop/ChooseSubscription";
import ViewProduct from "./pages/ViewProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { getItem, KEY } from "./utils/storage";
import { useCallback, useEffect, useState } from "react";
import PageNotFound from "./pages/PageNotFound";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import MyOrder from "./pages/MyOrder";
import ViewOrder from "./pages/ViewOrder";
import PendingList from "./pages/MyShop/PendingList";
import AcceptedList from "./pages/MyShop/AcceptedList";
import Packed from "./pages/MyShop/Packed";
import Deliver from "./pages/MyShop/Deliver";
import "./App.css";
import AllUser from "./pages/Admin/users/AllUsers";
import LoadingOverlay from "react-loading-overlay";
import ActiveUser from "./pages/Admin/users/ActiveUser";
import AllShop from "./pages/Admin/shops/AllShop";
import AllItems from "./pages/Admin/items/AllItems";
import Categories from "./pages/Products";
import Products from "./pages/Products";
import SubscriptionList from "./pages/Admin/Subsription/SubcriptionList";
import Category from "./pages/Admin/Category";
import Reports from "./pages/MyShop/Reports";
import ViewShopOrder from "./pages/MyShop/ViewShopOrder";
import Profiles from "./pages/Profiles";

require("./App.css");

const initialOptions = {
  "client-id":
    "AXXPiHrCffEqkk7hesxLl7tUUylTSC_QTJcf1NYFpiSbSzk54crEZHrmC9PevPMtny4bhUQUPM4cs7l5",
  currency: "USD",
  intent: "capture",
};
function App() {
  const [currentSession, setCurrentSession] = useState(null);

  useEffect(() => {
    getSession();
  }, []);

  const getSession = async () => {
    const user = await getItem(KEY.ACCOUNT);

    setCurrentSession(user);
  };

  const displayRoutes = useCallback(() => {
    if (!currentSession) {
      return (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/viewproduct/:id" element={<ViewProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createshop" element={<CreateShop />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      );
    }

    if (currentSession.user_roles == 1) {
      return (
        <Routes>
          <Route path="/" element={<MyShop />} />
          <Route path="/myproduct" element={<Product />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/pending" element={<PendingList />} />
          <Route path="/accepted" element={<AcceptedList />} />
          <Route path="/packed" element={<Packed />} />
          <Route path="/deliver" element={<Deliver />} />
          <Route path="/mysubscription" element={<Subscription />} />
          <Route path="/profile" element={<Profiles />} />
          <Route path="/choosesubscription" element={<ChooseSubscription />} />
          <Route path="/vieworder/:id" element={<ViewOrder />} />
          <Route path="/reports" element={<Reports />} />
          <Route
            path="/viewordershop/:id/:reference"
            element={<ViewShopOrder />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      );
    }

    if (currentSession.user_roles == 2) {
      return (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/viewproduct/:id" element={<ViewProduct />} />
          <Route path="/profile" element={<Profiles />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order" element={<MyOrder />} />
          <Route path="/vieworder/:id/:reference" element={<ViewOrder />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      );
    }

    if (currentSession.user_roles == 0 || currentSession.user_roles == 3) {
      return (
        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="/users" element={<AllUser />} />
          <Route path="/pendinguser" element={<PendingUser />} />
          <Route path="/activeuser" element={<ActiveUser />} />
          <Route path="/shops" element={<AllShop />} />
          <Route path="/pendingshops" element={<PendingShop />} />
          <Route path="/items" element={<AllItems />} />
          <Route path="/subscriptions" element={<SubscriptionList />} />
          <Route path="/category" element={<Category />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      );
    }
  }, [currentSession]);

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AXXPiHrCffEqkk7hesxLl7tUUylTSC_QTJcf1NYFpiSbSzk54crEZHrmC9PevPMtny4bhUQUPM4cs7l5",
      }}
    >
      <BrowserRouter>{displayRoutes()}</BrowserRouter>;
    </PayPalScriptProvider>
  );
}

export default App;
