import logo from './logo.svg';
import './App.css';
import {Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import 'primeicons/primeicons.css';
import "primereact/resources/primereact.min.css"; // Core styles
import Login from './Pages/Login';
import { ToastContainer, toast } from 'react-toastify';
import Auth from './Auth/Auth';
import "primereact/resources/themes/lara-light-cyan/theme.css";


function App() {
  return (
   <>
   <Routes>
    <Route path="/" element={<Auth><Home/></Auth>} />
    <Route path="/login" element={<Login/>} />
   </Routes>
   </>
  );
}

export default App;
