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
exports.deletePet = exports.updatePet = exports.getPets = exports.createPetsMock = void 0;
const pet_model_1 = require("../models/pet.model");
const pet_utils_1 = require("../utils/pet.utils");
const createPetsMock = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (cant = 50) {
    try {
        const petsArray = [];
        for (let i = 0; i < cant; i++) {
            const pet = yield (0, pet_utils_1.generatePet)();
            petsArray.push(pet);
        }
        const pets = yield pet_model_1.PetModel.create(petsArray);
        return pets;
    }
    catch (error) {
        console.error("Error creating mock pets:", error);
        throw new Error('Failed to create mock pets');
    }
});
exports.createPetsMock = createPetsMock;
const getPets = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pets = yield pet_model_1.PetModel.find({});
        if (!pets || pets.length === 0) {
            throw new Error('No pets found');
        }
        return pets;
    }
    catch (error) {
        console.error("Error fetching pets:", error);
        throw new Error('Failed to fetch pets');
    }
});
exports.getPets = getPets;
const updatePet = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPet = yield pet_model_1.PetModel.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedPet) {
            throw new Error(`Pet with ID ${id} not found`);
        }
        return updatedPet;
    }
    catch (error) {
        console.error(`Error updating pet with ID ${id}:`, error);
        throw new Error('Failed to update pet');
    }
});
exports.updatePet = updatePet;
const deletePet = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPet = yield pet_model_1.PetModel.findByIdAndDelete(id);
        if (!deletedPet) {
            throw new Error(`Pet with ID ${id} not found`);
        }
        return deletedPet;
    }
    catch (error) {
        console.error(`Error deleting pet with ID ${id}:`, error);
        throw new Error('Failed to delete pet');
    }
});
exports.deletePet = deletePet;
