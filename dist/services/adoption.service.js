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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdoptionById = exports.getAllAdoptions = exports.createAdoption = void 0;
const adoption_model_1 = require("../models/adoption.model");
const user_model_1 = require("../models/user.model");
const pet_model_1 = require("../models/pet.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createAdoption = (userId, petId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
        const petObjectId = new mongoose_1.default.Types.ObjectId(petId);
        const user = yield user_model_1.UserModel.findById(userObjectId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }
        const pet = yield pet_model_1.PetModel.findById(petObjectId);
        if (!pet) {
            throw new Error(`Pet with ID ${petId} not found`);
        }
        if (pet.owner) {
            throw new Error(`Pet with ID ${petId} is already adopted`);
        }
        const adoption = new adoption_model_1.AdoptionModel({ user: userObjectId, pet: petObjectId });
        yield adoption.save();
        pet.owner = userObjectId;
        yield pet.save();
        user.adoptedPets.push(petObjectId);
        yield user.save();
        return adoption;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error creating adoption:', error.message);
            throw new Error(error.message);
        }
        throw error;
    }
});
exports.createAdoption = createAdoption;
const getAllAdoptions = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield adoption_model_1.AdoptionModel.find().populate('user pet');
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching adoptions:', error.message);
            throw new Error('Failed to fetch adoptions');
        }
        throw error;
    }
});
exports.getAllAdoptions = getAllAdoptions;
const getAdoptionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adoptionObjectId = new mongoose_1.default.Types.ObjectId(id);
        const adoption = yield adoption_model_1.AdoptionModel.findById(adoptionObjectId).populate('user pet');
        if (!adoption) {
            throw new Error(`Adoption with ID ${id} not found`);
        }
        return adoption;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Error fetching adoption with ID ${id}:`, error.message);
            throw new Error('Failed to fetch adoption');
        }
        throw error;
    }
});
exports.getAdoptionById = getAdoptionById;
