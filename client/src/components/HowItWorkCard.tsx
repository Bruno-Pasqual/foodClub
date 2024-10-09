type Props = {
	iconAddress: string;
	text: string;
	altText: string;
};

export const HowItWorkCard = (props: Props) => {
	return (
		<div className="how-it-work-card">
			<img
				src={props.iconAddress}
				alt={props.altText}
				className="how-it-work-card-img"
			/>
			<p>{props.text}</p>
		</div>
	);
};
