import { InventoryItem, IInventoryItem } from "../models/InventoryItem";

export class InventoryService {
  static async getAllItems() {
    return await InventoryItem.find().sort({ createdAt: -1 });
  }

  static async getItemById(id: string) {
    return await InventoryItem.findById(id);
  }

  static async createItem(itemData: Partial<IInventoryItem>) {
    const item = new InventoryItem(itemData);
    return await item.save();
  }

  static async updateItem(id: string, itemData: Partial<IInventoryItem>) {
    return await InventoryItem.findByIdAndUpdate(
      id,
      { $set: itemData },
      { new: true, runValidators: true }
    );
  }

  static async deleteItem(id: string) {
    return await InventoryItem.findByIdAndDelete(id);
  }

  static async updateQuantity(id: string, quantity: number) {
    return await InventoryItem.findByIdAndUpdate(
      id,
      { $set: { quantity } },
      { new: true, runValidators: true }
    );
  }

  static async getLowStockItems() {
    return await InventoryItem.find({
      $expr: {
        $lte: ["$quantity", "$minThreshold"],
      },
    });
  }
}
