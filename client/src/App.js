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
import AdminOverview from "./components/admin/Overview.jsx";
import SidebarWithContentSeparator from "./components/pages/sidebar/sidebar.jsx";
import Articles from "./components/admin/Articles.jsx";
import Createarticles from "./components/admin/createarticles.jsx";

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
        <Route
          path="/admin/overview"
          element={
            <>
              <NavbarAdmin />
              <AdminOverview />
            </>
          }
        />
        <Route
          path="/admin/articles"
          element={
            <>
              <NavbarAdmin />
              <Articles />
            </>
          }
        />
        <Route
          path="/admin/articles/create"
          element={
            <>
              <NavbarAdmin />
              <Createarticles />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
