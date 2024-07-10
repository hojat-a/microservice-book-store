import * as mongoose from 'mongoose';

export const BookModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  author: {
    type: String,
    required: true,
    index: true
  },
  genre: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock : {
    type: Number,
    required: true
  },
  score: {
    type: Number,
    default: 0
  },
}, { timestamps: true });