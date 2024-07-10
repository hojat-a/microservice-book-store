import * as mongoose from 'mongoose';
const { Schema } = mongoose;


export const OrderModel = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  items: [
    {
      productId: {
        type: String,
        required: true
      },
      count: {
        type: Number,
        required: true,
      },
    }
  ]
}, { timestamps: true });