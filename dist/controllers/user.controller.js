"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const userService = __importStar(require("../services/user.service"));
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield userService.getUsers();
        if (response.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json({ users: response });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            message: "Failed to retrieve users",
            error: error.message,
        });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield userService.getUserById(id);
        if (!user) {
            return res.status(404).json({ message: `User with ID ${id} not found` });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
            message: "Failed to retrieve user",
            error: error.message,
        });
    }
});
exports.getUserById = getUserById;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const newUser = yield userService.createUser({ name, email, password });
        res.status(201).json({
            message: "User created successfully",
            user: newUser,
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            message: "Failed to create user",
            error: error.message,
        });
    }
});
exports.createUser = createUser;
// Actualizar un usuario
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const updatedUser = yield userService.updateUser(id, { name, email, password });
        if (!updatedUser) {
            return res.status(404).json({ message: `User with ID ${id} not found` });
        }
        res.status(200).json({
            message: `User with ID ${id} updated successfully`,
            user: updatedUser,
        });
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            message: "Failed to update user",
            error: error.message,
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedUser = yield userService.deleteUser(id);
        if (!deletedUser) {
            return res.status(404).json({ message: `User with ID ${id} not found` });
        }
        res.status(200).json({
            message: `User with ID ${id} deleted successfully`,
            user: deletedUser,
        });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            message: "Failed to delete user",
            error: error.message,
        });
    }
});
exports.deleteUser = deleteUser;
