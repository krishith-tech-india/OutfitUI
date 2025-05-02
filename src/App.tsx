import { Route, Routes } from "react-router-dom";
import { Login } from "./Page/Login/Login";
import Signup from "./Page/SignUp/Signup";
import Dashboard from "./Page/Dashboard/Dashboard";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

function App() {
	return (
		<>
		<Provider store={store}>
			<Routes>
            	<Route path="/" element={<Login/>}/>
            	<Route path="/signup" element={<Signup/>}/>
				<Route path="/dashboard" element={<Dashboard/>}/>
        	</Routes>
		</Provider>
		</>
	);
}

export default App;
