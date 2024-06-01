import express from "express";
import {
  getUsers,
  updateUsers,
  updateProfilUsers,
  Register,
  Login,
  Logout,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/userController.js";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controller/blogController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controller/refreshToken.js";

const router = express.Router();

// Routes for users
router.get("/users", verifyToken, getUsers);
router.get("/allUsers", getAllUsers); // Route to get all users
router.post("/createUser", createUser); // Route to create a user
router.put("/updateUser/:id", updateUser); // Route to update a user
router.delete("/deleteUser/:id", deleteUser); // Route to delete a user
router.post("/updateUsers", verifyToken, updateUsers);
router.post("/updateProfilUsers", verifyToken, updateProfilUsers);
router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

// Routes for blogs
router.get("/blogs", getAllBlogs); // Route to fetch all blogs
router.get("/blogs/:id", getBlogById); // Route to fetch a specific blog by ID
router.post("/blogs/add", createBlog); // Route to create a new blog
router.put("/blogsUpdate/:id", updateBlog); // Route to update an existing blog
router.delete("/blogsDelete/:id", deleteBlog); // Route to delete a blog

export default router;
