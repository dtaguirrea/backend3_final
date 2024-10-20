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
exports.dbConnection = void 0;
const config_1 = __importDefault(require("./config"));
const mongoose_1 = require("mongoose");
const logger_1 = require("../logs/logger");
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    const MONGO_URI = config_1.default.MONGO_URI;
    if (!MONGO_URI) {
        logger_1.logger.error("MONGO_URI is not defined in the configuration");
        throw new Error("MONGO_URI is undefined. Please check your environment variables or config file.");
    }
    try {
        yield (0, mongoose_1.connect)(MONGO_URI);
        logger_1.logger.info("Connected to MongoDB successfully");
    }
    catch (error) {
        logger_1.logger.error("Failed to connect to MongoDB:", error);
        throw error;
    }
});
exports.dbConnection = dbConnection;
