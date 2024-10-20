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
exports.generateMockAdoptions = exports.generateData = exports.generateMockPets = exports.generateMockUsers = void 0;
const user_model_1 = require("../models/user.model");
const pet_model_1 = require("../models/pet.model");
const adoption_model_1 = require("../models/adoption.model");
const user_utils_1 = require("../utils/user.utils");
const pet_utils_1 = require("../utils/pet.utils");
const generateMockUsers = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (cant = 50) {
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
exports.generateMockUsers = generateMockUsers;
const generateMockPets = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (cant = 50) {
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
exports.generateMockPets = generateMockPets;
const generateData = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (userCount = 0, petCount = 0) {
    try {
        const usersArray = yield (0, exports.generateMockUsers)(userCount);
        const petsArray = yield (0, exports.generateMockPets)(petCount);
        return { usersArray, petsArray };
    }
    catch (error) {
        console.error("Error creating mock data:", error);
        throw new Error('Failed to create mock data');
    }
});
exports.generateData = generateData;
const generateMockAdoptions = (count) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.UserModel.find();
    const pets = yield pet_model_1.PetModel.find({ owner: null });
    if (users.length === 0 || pets.length === 0) {
        throw new Error('No users or pets available to create mock adoptions');
    }
    const adoptions = [];
    for (let i = 0; i < count; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomPet = pets[Math.floor(Math.random() * pets.length)];
        const adoption = new adoption_model_1.AdoptionModel({
            user: randomUser._id,
            pet: randomPet._id,
            adoptionDate: new Date(),
        });
        yield adoption.save();
        randomPet.owner = randomUser._id;
        yield randomPet.save();
        randomUser.adoptedPets.push(randomPet._id);
        yield randomUser.save();
        adoptions.push(adoption);
    }
    return adoptions;
});
exports.generateMockAdoptions = generateMockAdoptions;
