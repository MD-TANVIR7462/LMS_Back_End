import { Router } from "express";
import { ModuleControllers } from "./Modules.controller";

const router = Router();

router.get("/get-modules", ModuleControllers.getAllModules);
router.get("/get-module/:id", ModuleControllers.getSingleModule);
router.post("/create-module", ModuleControllers.createAModule);
router.delete("/delete-module/:id", ModuleControllers.deleteModule);
router.patch("/update-module/:id", ModuleControllers.updateModule);
router.patch("/status/:id", ModuleControllers.toggleModuleStatus);

export const moduleRoutes = router;
