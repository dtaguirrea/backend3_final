"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoptionModel = void 0;
const mongoose_1 = require("mongoose");
const adoptionSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    pet: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Pet',
        required: true,
    },
    adoptionDate: {
        type: Date,
        default: Date.now,
    },
});
exports.AdoptionModel = (0, mongoose_1.model)('Adoption', adoptionSchema);
