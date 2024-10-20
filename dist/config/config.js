"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
exports.default = {
    MONGO_URI: process.env.MONGODB_URI,
    PORT: process.env.PORT || 8080,
};
