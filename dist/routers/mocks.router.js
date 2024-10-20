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
const express_1 = __importDefault(require("express"));
const mocks_service_1 = require("../services/mocks.service");
const router = express_1.default.Router();
router.get('/mockingusers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, mocks_service_1.generateMockUsers)(50);
        res.status(200).json({ message: '50 mock users generated', users });
    }
    catch (error) {
        console.error("Error generating mock users:", error);
        res.status(500).json({ message: 'Failed to generate mock users', error });
    }
}));
router.get('/mockingpets', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pets = yield (0, mocks_service_1.generateMockPets)(50);
        res.status(200).json({ message: '50 mock pets generated', pets });
    }
    catch (error) {
        console.error("Error generating mock pets:", error);
        res.status(500).json({ message: 'Failed to generate mock pets', error });
    }
}));
router.get('/mockingadoptions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adoptions = yield (0, mocks_service_1.generateMockAdoptions)(50);
        res.status(200).json({ message: '50 mock adoptions generated', adoptions });
    }
    catch (error) {
        console.error("Error generating mock adoptions:", error);
        res.status(500).json({ message: 'Failed to generate mock adoptions', error });
    }
}));
router.post('/generateData', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { users, pets } = req.body;
    try {
        const result = yield (0, mocks_service_1.generateData)(users, pets);
        res.status(200).json({
            message: `Generated ${users} users and ${pets} pets successfully`,
            result,
        });
    }
    catch (error) {
        console.error("Error generating data:", error);
        res.status(500).json({ message: 'Failed to generate data', error });
    }
}));
exports.default = router;
