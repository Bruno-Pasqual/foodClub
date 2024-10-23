import { nanoid } from "nanoid";
import { iRatingCard } from "../interfaces/ratingCard";
import "./InfinityScroll.css";
import { RatingCard } from "./RatingCard";

type InfinityScrollProps = {
	cards: iRatingCard[];
	orientation: string;
	animationSeconds: number;
};

const InfinityScroll = (props: InfinityScrollProps) => {
	// Cria a string de animação utilizando o valor de animationSeconds
	const animationStyle = {
		animation: `${props.animationSeconds}s slide infinite linear`,
	};

	return (
		<div className="infinity-scroll-container">
			{/* Cards duplicados para continuidade da animação */}
			<div style={animationStyle} className="cards-slider">
				{props.cards.concat(props.cards).map(({ userName, text, stars }, index) => (
					<RatingCard
						key={
							nanoid() + index
						} /* Index para garantir que não haja conflito de chaves */
						userName={userName}
						text={text}
						stars={stars}
					/>
				))}
			</div>
		</div>
	);
};

export default InfinityScroll;
