"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetModel = void 0;
const mongoose_1 = require("mongoose");
const petSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['dog', 'cat', 'bird'],
        required: true,
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
});
exports.PetModel = (0, mongoose_1.model)('Pet', petSchema);
