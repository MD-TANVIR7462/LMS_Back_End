// routes/auth.routes.ts
import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

router.post("/", AuthController.registerUser);
router.get("/all", AuthController.getAllUsers);
router.patch("/update-user/:id", AuthController.updateUser);
router.delete("/delete-user/:id", AuthController.deleteUser);
router.get("/me", AuthController.getMe);

export const RegistrationRoutes = router;
