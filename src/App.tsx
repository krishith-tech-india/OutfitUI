import { Route, Routes } from "react-router-dom";
import { Login } from "./Page/Login/Login";
import Signup from "./Page/SignUp/Signup";
import Dashboard from "./Page/Dashboard/Dashboard";

function App() {
	return (
		<>
			 <Routes>
            	<Route path="/" element={<Login/>}/>
            	<Route path="/signup" element={<Signup/>}/>
				<Route path="/dashboard" element={<Dashboard/>}/>
        	</Routes>
		</>
	);
}

export default App;
