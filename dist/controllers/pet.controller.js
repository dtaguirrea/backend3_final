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
exports.deletePet = exports.updatePet = exports.getPets = exports.createPets = void 0;
const petService = __importStar(require("../services/pet.service"));
const createPets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { cant = 0 } = req.query;
    try {
        const response = yield petService.createPetsMock(Number(cant));
        res.status(201).json({
            message: `${cant} pets created successfully`,
            pets: response,
        });
    }
    catch (error) {
        console.error("Error creating pets:", error);
        res.status(500).json({
            message: "Failed to create pets",
            error: error.message,
        });
    }
});
exports.createPets = createPets;
const getPets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield petService.getPets();
        if (response.length === 0) {
            return res.status(404).json({ message: "No pets found" });
        }
        res.status(200).json({ pets: response });
    }
    catch (error) {
        console.error("Error fetching pets:", error);
        res.status(500).json({
            message: "Failed to retrieve pets",
            error: error.message,
        });
    }
});
exports.getPets = getPets;
const updatePet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, type } = req.body;
    try {
        const updatedPet = yield petService.updatePet(id, { name, type });
        res.status(200).json({
            message: `Pet with ID ${id} updated successfully`,
            pet: updatedPet,
        });
    }
    catch (error) {
        console.error("Error updating pet:", error);
        res.status(500).json({
            message: "Failed to update pet",
            error: error.message,
        });
    }
});
exports.updatePet = updatePet;
const deletePet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedPet = yield petService.deletePet(id);
        res.status(200).json({
            message: `Pet with ID ${id} deleted successfully`,
            pet: deletedPet,
        });
    }
    catch (error) {
        console.error("Error deleting pet:", error);
        res.status(500).json({
            message: "Failed to delete pet",
            error: error.message,
        });
    }
});
exports.deletePet = deletePet;
