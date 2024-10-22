import { Rating } from "@mui/material";
import "./RatingCard.css";
import { iRatingCard } from "../interfaces/ratingCard";

export const RatingCard = (props: iRatingCard) => {
	return (
		<div className="rating-card">
			<p className="userName">{props.userName}</p>
			<p className="rating-text">"{props.text}"</p>
			<Rating name="read-only" value={props.stars} readOnly />
		</div>
	);
};
