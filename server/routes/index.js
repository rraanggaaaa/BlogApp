import express from "express";
import {
  getUsers,
  updateUsers,
  updateProfilUsers,
  Register,
  Login,
  Logout,
  getAllUsers, // Imported getAllUsers function
  createUser, // Imported createUser function
  updateUser, // Imported updateUser function
  deleteUser, // Imported deleteUser function
} from "../controller/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controller/refreshToken.js";

const router = express.Router();

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

export default router;
