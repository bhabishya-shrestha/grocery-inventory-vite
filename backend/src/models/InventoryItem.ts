import mongoose, { Schema, Document } from "mongoose";

export interface IInventoryItem extends Document {
  name: string;
  quantity: number;
  category: string;
  minThreshold: number;
  createdAt: Date;
  updatedAt: Date;
}

const inventoryItemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    minThreshold: {
      type: Number,
      required: [true, "Minimum threshold is required"],
      min: [0, "Minimum threshold cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

export const InventoryItem = mongoose.model<IInventoryItem>(
  "InventoryItem",
  inventoryItemSchema
);
