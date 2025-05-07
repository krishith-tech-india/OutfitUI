import { Route, Routes } from "react-router-dom";
import { Login } from "./Page/Login/Login";
import Signup from "./Page/SignUp/Signup";
import Dashboard from "./Page/Dashboard/Dashboard";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import Users from "./Page/Users/Users";
import ImageType from "./Page/ImageType/ImageType";

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
          </Route>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
