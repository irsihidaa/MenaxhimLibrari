import{BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookList from "./components/BookList"

function App() {
  
  return (
    <>
    <BrowserRouter>
      <div className="container">
        <Header/>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/allbooks" element={<BookList />}/>
        </Routes>
      </div>
    </BrowserRouter>
    <ToastContainer/>
    </>
  );
}

export default App