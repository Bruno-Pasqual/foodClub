import { Rating } from "@mui/material";
import "./RatingCard.css";

type RatingCardProps = {
	starsNumber: number;
	text: string;
	userName: string;
};

export const RatingCard = (props: RatingCardProps) => {
	return (
		<div className="rating-card">
			<p className="userName">{props.userName}</p>
			<p className="rating-text">"{props.text}"</p>
			<Rating name="read-only" value={props.starsNumber} readOnly />
		</div>
	);
};
