import { Route, Routes } from "react-router-dom";
import { Login } from "./Page/Login/Login";
import Signup from "./Page/SignUp/Signup";
import Dashboard from "./Page/Dashboard/Dashboard";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import Users from "./Page/Users/Users";
import ImageType from "./Page/ImageType/ImageType";
import ProductList from "./Page/ProductList/ProductList";
import Roles from "./Page/Roles/Roles";
import GetOrderStatus from "./Page/OrderStatus/GetOrderStatus";

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="users" element={<Users />} />
            <Route path="imagetype" element={<ImageType />} />
            <Route path="roles" element={<Roles />} />
            <Route path="products" element={<ProductList />} />
            <Route path="getorderstatus" element={<GetOrderStatus />} />
          </Route>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
