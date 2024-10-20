import { Request, Response, NextFunction } from 'express';
import * as userService from "../services/user.service";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await userService.getUsers();
    if (response.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json({ users: response });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Failed to retrieve users",
      error: (error as Error).message,
    });
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      message: "Failed to retrieve user",
      error: (error as Error).message,
    });
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await userService.createUser({ name, email, password });
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Failed to create user",
      error: (error as Error).message,
    });
  }
};

// Actualizar un usuario
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const updatedUser = await userService.updateUser(id, { name, email, password });
    if (!updatedUser) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    res.status(200).json({
      message: `User with ID ${id} updated successfully`,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      message: "Failed to update user",
      error: (error as Error).message,
    });
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const deletedUser = await userService.deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    res.status(200).json({
      message: `User with ID ${id} deleted successfully`,
      user: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      message: "Failed to delete user",
      error: (error as Error).message,
    });
  }
};
