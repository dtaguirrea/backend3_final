"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = exports.createUsersMock = void 0;
const user_model_1 = require("../models/user.model");
const user_utils_1 = require("../utils/user.utils");
const createUsersMock = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (cant = 10) {
    try {
        const usersArray = [];
        for (let i = 0; i < cant; i++) {
            const user = yield (0, user_utils_1.generateUser)();
            usersArray.push(user);
        }
        const users = yield user_model_1.UserModel.create(usersArray);
        return users;
    }
    catch (error) {
        console.error("Error creating mock users:", error);
        throw new Error('Failed to create mock users');
    }
});
exports.createUsersMock = createUsersMock;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.UserModel.find({});
        if (!users || users.length === 0) {
            throw new Error('No users found');
        }
        return users;
    }
    catch (error) {
        console.error("Error fetching users:", error);
        throw new Error('Failed to fetch users');
    }
});
exports.getUsers = getUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.UserModel.findById(id);
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }
        return user;
    }
    catch (error) {
        console.error(`Error fetching user with ID ${id}:`, error);
        throw new Error('Failed to fetch user');
    }
});
exports.getUserById = getUserById;
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new user_model_1.UserModel(userData);
        return yield newUser.save();
    }
    catch (error) {
        console.error("Error creating user:", error);
        throw new Error('Failed to create user');
    }
});
exports.createUser = createUser;
const updateUser = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield user_model_1.UserModel.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedUser) {
            throw new Error(`User with ID ${id} not found`);
        }
        return updatedUser;
    }
    catch (error) {
        console.error(`Error updating user with ID ${id}:`, error);
        throw new Error('Failed to update user');
    }
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield user_model_1.UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new Error(`User with ID ${id} not found`);
        }
        return deletedUser;
    }
    catch (error) {
        console.error(`Error deleting user with ID ${id}:`, error);
        throw new Error('Failed to delete user');
    }
});
exports.deleteUser = deleteUser;
