import { nanoid } from "nanoid";
import { iRatingCard } from "../interfaces/ratingCard";
import './InfinityScroll.css'
import { RatingCard } from "./RatingCard";


type InfinityScrollProps = {
	cards: iRatingCard[];
  orientation: string
  animationSeconds: number
}

const InfinityScroll = (props: InfinityScrollProps) => {



 return  <div className="cards-scroll-container">
    {props.cards.map(({userName, text, stars}) => {
      return <RatingCard key={nanoid()} userName={userName} text={text} stars={stars}/>
    })}
 </div>
};

export default InfinityScroll;
