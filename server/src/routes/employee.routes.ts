import express from "express";
import {
	createIndividualOrder,
	getEmployees,
} from "../controllers/employee.controller";

const router = express.Router();

router.post("/:employeeId/order/:companyOrderId", createIndividualOrder);
router.get("/list", getEmployees);

export default router;
