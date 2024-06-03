import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/pages/password/forgotPassword.jsx";
import Navbar from "./components/pages/nav/Navbar.jsx";
import NavbarAdmin from "./components/pages/nav/NavbarAdmin.jsx";
import Profile from "./components/pages/Profile.jsx";
import Home from "./components/users/Home";
import Blog from "./components/users/Blog";
import ChangePassword from "./components/pages/password/changePassword.jsx";
import AdminDashboard from "./components/admin/Dashboard.jsx"; // Import the AdminDashboard component
import AdminOverview from "./components/admin/Overview.jsx";
import Articles from "./components/admin/Articles.jsx";
import BlogWelcome from "./components/BlogWelcome.jsx";
import About from "./components/About.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route exact path="/blogWelcome" element={<BlogWelcome />} />
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
          path="/home/blog"
          element={
            <>
              <Navbar />
              <Blog />
            </>
          }
        />
        <Route
          path="/blog"
          element={
            <>
              <Navbar />
              <Blog />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <About />
            </>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <>
              <NavbarAdmin />
              <Profile />
            </>
          }
        />
        <Route
          path="/user/profile"
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
