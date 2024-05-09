import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  //fetch all users
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get users!" });
  }
};

export const getUser = async (req, res) => {
  //fetch one user
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get user!" });
  }
};

export const updateUser = async (req, res) => {
  //update user info
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not authorized!" });
  }

  let updatedPassword = null;

  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }
    //si no hay un cambio de password ni avatar no paso esos parametros
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });

    const { password: userPassword, ...rest } = updatedUser;

    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update user!" });
  }
};

export const deleteUser = async (req, res) => {
  //delete user
  const id = req.params.id;
  const tokenUserId = req.userId;
  const isAdmin = req.userAdmin;

  if (!isAdmin) {
    if (id !== tokenUserId) {
      return res.status(403).json({ message: "Not authorized!" });
    }
  }

  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete user!" });
  }
};

export const profilePosts = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const userPosts = await prisma.post.findMany({
      where: { userId: tokenUserId },
    });
    res.status(200).json(userPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get user posts!" });
  }
};
