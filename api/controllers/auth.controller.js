import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import transporter from "../lib/nodemailer.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  //chequeo via token quien hace el registro de nuevo usuario
  //si es un usuario no administrador lo bloqueo, solo pueden crear nuevos usuarios el/los administradores
  //el seteo de administrador solo se hace desde la base de datos MongoDB

  const token = req.cookies.token;
  if (token !== undefined) {
    if (jwtDecode(token).admin === false) {
      return res.status(403).json({ message: "Unauthorized access!" });
    }
  } else {
    return res.status(401).json({ message: "Not authenticated!" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    res.status(403).json({ message: "Token is not valid!" });
    return;
  }

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  )
    return res.status(400).json({ message: "All fields are required" });

  try {
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create a new user and save to db
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to create User", error: err });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password || username === "" || password === "")
    return res.status(400).json({ message: "All fields are required" });

  try {
    // check if user exists
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // check user password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });

    //generate cookie token and send to the user
    const age = 1000 * 60 * 60 * 24 * 7; // 7 days expiration token

    const token = jwt.sign(
      {
        id: user.id,
        admin: user.admin, //agrego si el usuario es administrador o no
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user; //quito el password

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true, //(activar en produccion)
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to login, internal error", error: err });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout success!" });
};

export const resetPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const newPassword = generatePass();
    const newHashPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        password: newHashPassword,
      },
    });
    req.newPassword = newPassword;
    req.email = email;
    req.username = user.username;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to change password", err: error });
  }
};

function generatePass() {
  let pass = "";
  let str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789!$#=";

  for (let i = 1; i <= 6; i++) {
    let char = Math.floor(Math.random() * str.length + 1);

    pass += str.charAt(char);
  }

  return pass;
}
