import { Request, Response, NextFunction } from "express";
import { InventoryService } from "../services/inventoryService";

export class InventoryController {
  static async getAllItems(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await InventoryService.getAllItems();
      res.json({ success: true, data: items });
    } catch (error) {
      next(error);
    }
  }

  static async getItemById(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await InventoryService.getItemById(req.params.id);
      if (!item) {
        return res
          .status(404)
          .json({ success: false, message: "Item not found" });
      }
      res.json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  }

  static async createItem(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await InventoryService.createItem(req.body);
      res.status(201).json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  }

  static async updateItem(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await InventoryService.updateItem(req.params.id, req.body);
      if (!item) {
        return res
          .status(404)
          .json({ success: false, message: "Item not found" });
      }
      res.json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  }

  static async deleteItem(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await InventoryService.deleteItem(req.params.id);
      if (!item) {
        return res
          .status(404)
          .json({ success: false, message: "Item not found" });
      }
      res.json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  }

  static async updateQuantity(req: Request, res: Response, next: NextFunction) {
    try {
      const { quantity } = req.body;
      const item = await InventoryService.updateQuantity(
        req.params.id,
        quantity
      );
      if (!item) {
        return res
          .status(404)
          .json({ success: false, message: "Item not found" });
      }
      res.json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  }

  static async getLowStockItems(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const items = await InventoryService.getLowStockItems();
      res.json({ success: true, data: items });
    } catch (error) {
      next(error);
    }
  }
}
