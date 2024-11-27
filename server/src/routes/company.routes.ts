import express from "express";
import {
	createCompanyOrder,
	getCompanies,
	getCompany,
	getCompanyOrders,
	getCompanyOrdersByRestaurant,
	nextOrderCode,
} from "./../controllers/company.controller";

const router = express.Router();

router.get("/list", getCompanies);
router.get("/code", nextOrderCode);
router.post("/companyorder", createCompanyOrder);
router.get("/:companyId/orders", getCompanyOrders);
router.get("/restaurant/:restaurantId/orders", getCompanyOrdersByRestaurant);
router.get("/:companyId/", getCompany);

export default router;
