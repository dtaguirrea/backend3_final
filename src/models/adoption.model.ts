import { Schema, model } from 'mongoose';

const adoptionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  pet: {
    type: Schema.Types.ObjectId,
    ref: 'Pet',
    required: true,
  },
  adoptionDate: {
    type: Date,
    default: Date.now,
  },
});

export const AdoptionModel = model('Adoption', adoptionSchema);
