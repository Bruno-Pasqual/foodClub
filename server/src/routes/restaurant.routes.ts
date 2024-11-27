import {
	createDish,
	deleteDish,
	getDishes,
	getRestaurant,
	getRestaurants,
	ratingDish,
	updateDish,
} from "../controllers/restaurant.controller";
import express from "express";

const router = express.Router();

router.post("/dish", createDish);
router.delete("/dish/:restaurantId/:dishId", deleteDish);
router.patch("/dish/:dishId", updateDish);
router.get("/:restaurantId/dishes", getDishes);
router.get("/list", getRestaurants);
router.get("/:id", getRestaurant);
router.post("/:restaurantId/:dishId/rating", ratingDish);

export default router;
