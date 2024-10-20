import { Schema, model } from 'mongoose';

const petSchema = new Schema({
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
    type: Schema.Types.ObjectId, 
    ref: 'User', 
  },
});

export const PetModel = model('Pet', petSchema);
