import { Router } from "express";
import { getAllUsers, getAUserById, usersWithFovurites } from "./controller";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getAUserById);
router.patch("/favourites", usersWithFovurites);

export default router;
