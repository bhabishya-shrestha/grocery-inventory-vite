import { Router } from "express";

const router = Router();

// TODO: Implement category routes
router.get("/", (req, res) => res.json({ message: "Category routes" }));

export default router;
