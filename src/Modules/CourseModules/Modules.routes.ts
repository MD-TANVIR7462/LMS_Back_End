import { Router } from "express";
import { ModuleControllers } from "./Modules.controller";
import { permission } from "../../Utils";

const router = Router();

router.get("/get-modules", permission.bothUsers, ModuleControllers.getAllModules);
router.get("/get-module/:id", permission.bothUsers, ModuleControllers.getSingleModule);
router.post("/create-module", permission.admin, ModuleControllers.createAModule);
router.delete("/delete-module/:id", permission.admin, ModuleControllers.deleteModule);
router.patch("/update-module/:id", permission.admin, ModuleControllers.updateModule);
router.patch("/status/:id", permission.admin, ModuleControllers.toggleModuleStatus);

export const moduleRoutes = router;
