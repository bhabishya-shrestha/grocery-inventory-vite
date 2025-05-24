import { Router } from "express";
import inventoryRoutes from "./inventory";
import categoryRoutes from "./category";

const router = Router();

router.use("/inventory", inventoryRoutes);
router.use("/categories", categoryRoutes);
// router.use('/users', userRoutes); // Uncomment when user routes are implemented

export default router;
