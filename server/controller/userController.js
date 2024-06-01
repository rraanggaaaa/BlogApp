import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email"],
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ msg: "Server error occurred" });
  }
};

export const updateProfilUsers = async (req, res) => {
  const { id } = req.params;
  const { image } = req.body;

  try {
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    
    await user.update({ image });
    res.json({ msg: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ msg: "Server error occurred" });
  }
};


export const updateUsers = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ msg: "Password dan confirm password tidak cocok" });

  const userExists = await Users.findOne({ where: { email: email } });
  if (userExists) {
    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      await Users.update(
        {
          password: hashPassword,
        },
        {
          where: { email: email },
        }
      );

      res.json({ msg: "Ubah Password Berhasil" });
    } catch (error) {
      console.log(error);
      res.status(500).json;
    }
  } else {
    res.status(404).json({ msg: "Email tidak terdaftar" });
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Password and confirm password do not match" });
  }

  try {
    // Check if the user already exists
    const userExists = await Users.findOne({ where: { email: email } });
    if (userExists) {
      return res.status(409).json({ msg: "Email is already in use" });
    }

    // Generate hashed password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    // Create the user
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
    });

    res.status(201).json({ msg: "Registration successful" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ msg: "Server error occurred" });
  }
};
export const Login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) return res.status(404).json({ msg: "Email tidak ditemukan" });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });
    
    const userId = user.id;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    const accessToken = jwt.sign(
      { userId, name, email, role },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "10s",
      }
    );
    const refreshToken = jwt.sign(
      { userId, name, email, role },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // secure:true
    });

    const redirectUrl = role === 'admin' ? '/admin/dashboard' : '/home';
    res.json({ accessToken, redirectUrl });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user) return res.sendStatus(204);
  const userId = user.id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email", "role"],
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error occurred" });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    await Users.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    console.error("Error during user creation:", error);
    res.status(500).json({ msg: "Server error occurred" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  try {
    await Users.update(
      { name, email, role },
      {
        where: { id },
      }
    );
    res.json({ msg: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ msg: "Server error occurred" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await Users.destroy({
      where: { id },
    });
    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ msg: "Server error occurred" });
  }
};
