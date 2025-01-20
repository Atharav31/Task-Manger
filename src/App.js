import { ToastContainer } from "react-toastify";
import "./App.css";
import Footer from "./Components/Footer";
import Hero1 from "./Components/Hero1";
import NavBar from "./Components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Task from "./Functionality/Task";
function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Hero1 />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/task" element={<Task />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
