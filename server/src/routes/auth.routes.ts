import express from "express";
import { businessSignup, employeeSignup } from "../controllers/auth.controller";

const router = express.Router();

router.post("/busignup", businessSignup);
router.post("/emsignup", employeeSignup);

export default router;
