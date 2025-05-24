import { Router } from "express";
import { InventoryController } from "../controllers/inventoryController";

const router = Router();

router.get("/", InventoryController.getAllItems);
router.get("/low-stock", InventoryController.getLowStockItems);
router.get("/:id", InventoryController.getItemById);
router.post("/", InventoryController.createItem);
router.put("/:id", InventoryController.updateItem);
router.delete("/:id", InventoryController.deleteItem);
router.patch("/:id/quantity", InventoryController.updateQuantity);

export default router;
