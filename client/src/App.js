import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/pages/password/forgotPassword.jsx";
import Navbar from "./components/pages/nav/Navbar.jsx";
import NavbarAdmin from "./components/pages/nav/NavbarAdmin.jsx";
import Profile from "./components/pages/Profile.jsx";
import Home from "./components/users/Home";
import ChangePassword from "./components/pages/password/changePassword.jsx";
import AdminDashboard from "./components/admin/Dashboard.jsx"; // Import the AdminDashboard component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Navbar />
              <Profile />
            </>
          }
        />
        <Route
          path="/changePassword"
          element={
            <>
              <Navbar />
              <ChangePassword />
            </>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <>
              <NavbarAdmin />
              <AdminDashboard />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
