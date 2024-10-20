import { UserModel } from '../models/user.model';
import { generateUser } from '../utils/user.utils';

export const createUsersMock = async (cant = 10) => {
  try {
    const usersArray = [];

    for (let i = 0; i < cant; i++) {
      const user = await generateUser(); 
      usersArray.push(user);
    }

    const users = await UserModel.create(usersArray);

    return users;
  } catch (error) {
    console.error("Error creating mock users:", error);
    throw new Error('Failed to create mock users');
  }
};

export const getUsers = async () => {
  try {
    const users = await UserModel.find({});
    if (!users || users.length === 0) {
      throw new Error('No users found');
    }
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error('Failed to fetch users');
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw new Error('Failed to fetch user');
  }
};

export const createUser = async (userData: { name: string, email: string, password: string }) => {
  try {
    const newUser = new UserModel(userData);
    return await newUser.save();
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error('Failed to create user');
  }
};

export const updateUser = async (id: string, updatedData: { name?: string, email?: string, password?: string }) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedUser) {
      throw new Error(`User with ID ${id} not found`);
    }
    return updatedUser;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw new Error('Failed to update user');
  }
};

export const deleteUser = async (id: string) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new Error(`User with ID ${id} not found`);
    }
    return deletedUser;
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw new Error('Failed to delete user');
  }
};
