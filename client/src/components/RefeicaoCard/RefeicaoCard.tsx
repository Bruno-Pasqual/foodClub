import { Rating } from "@mui/material";
import "./RefeicaoCard.css";

type Props = {
	id: string; // Agora, cada prato tem um ID
	name: string;
	description: string;
	price: number;
	image: string;
	ratings: { userId: string; rating: number }[];
};

const RefeicaoCard = (props: Props) => {
	return (
		<div className="refeicao-card-container">
			<div
				className="refeicao-img"
				style={{
					backgroundImage: `url(${props.image})`,
				}}
			></div>

			<div className="refeicao-info-container">
				<p className="r-title">{props.name}</p>
				<p className="r-description">{props.description}</p>
				<div className="r-price-container">
					<p className="r-price">R$ {props.price}</p>
					<div className="r-rating-container">
						<Rating
							name="half-rating"
							defaultValue={2.5}
							precision={0.5}
							size="small"
							readOnly
						/>{" "}
						({props.ratings.length})
					</div>
				</div>
			</div>
		</div>
	);
};

export default RefeicaoCard;
