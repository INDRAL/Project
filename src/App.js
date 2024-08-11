
import './App.css';
import {BrowserRouter,
  Routes,
  Route  ,Navigate} from "react-router-dom";
import Login from './login'
import Home from './Home';
import MyBookshelf from './MyBookshelf';
import Signup from './Signup';
import MyDashboard from './MyDashboard';
import Axios from "axios";
Axios.defaults.baseURL = "https://server-g1s0.onrender.com";
// Axios.defaults.baseURL = "http://ec2-3-105-185-92.ap-southeast-2.compute.amazonaws.com:8188";
// Axios.defaults.baseURL = "http://localhost:5000";
function App() {
  
    return (
    <BrowserRouter>
    <div className="wrapper">
    <Routes>
    <Route path= "/Home" element={<Home />}/> 
    <Route path="/Mybookshelf" element={<MyBookshelf />} />
    <Route path="/MyDashboard" element={<MyDashboard />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/" element={<Navigate replace to="/Home" />} />
    <Route path="/Signup" element={<Signup/>} />
    </Routes>
    </div>
    </BrowserRouter>
   );
 }
 


export default App;
