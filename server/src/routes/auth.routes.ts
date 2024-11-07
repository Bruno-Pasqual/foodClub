import express from "express";
import {
	businessSignup,
	employeeSignup,
	login,
} from "../controllers/auth.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

// Definindo as rotas
router.post("/busignup", businessSignup);
router.post("/emsignup", employeeSignup);
router.post("/login", login);
router.get("/check-auth", verifyToken);

export default router;
