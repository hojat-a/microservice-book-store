import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  },
  firstname: String,
  lastname: String,
  gender: {
    type: String,
    enum: ["male", "female", "other"]
  },
  avatar: String,
  birthdate: Date
}, { timestamps: true });