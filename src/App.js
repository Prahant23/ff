import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
// for showing toast messages
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/Login';
import Admindashboard from './pages/Admin/Admindashbaord';
import AdminEditProduct from './pages/Admin/AdminEditProduct';
function App() {
  return (
     <Router>
       <Navbar/>
       <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/" element={<h1>404</h1>} />
        {/* 
        1. create a /admin/dashboard route
        2. create a Dashboard component
        3. checkin browser
         */}
         <Route path="/admin/dashboard" element={<Admindashboard/>} />
         <Route path='/Admin/edit/:id' element={<AdminEditProduct />} />
         
         
      </Routes>
     </Router>
  );
}

export default App;
