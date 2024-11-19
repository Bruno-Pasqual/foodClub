import express from "express";
import {
	businessSignup,
	checkAuth,
	deleteAllUsers,
	employeeSignup,
	getAllUsers,
	login,
	logout,
} from "../controllers/auth.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.post("/busignup", businessSignup);
router.post("/emsignup", employeeSignup);
router.post("/login", login);
router.get("/check-auth", verifyToken, checkAuth);
router.post("/logout", logout);
router.post("/deleteAllUsers", deleteAllUsers);
router.get("/users", getAllUsers);


export default router;
