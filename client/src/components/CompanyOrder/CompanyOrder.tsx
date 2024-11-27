import { ICompanyOrder } from "../../interfaces/CompanyOrder";
import { calcularTempoDecorrido } from "../../utils/utils";
import "./CompanyOrder.css";

import { CiClock2 } from "react-icons/ci";

const CompanyOrder = (props: ICompanyOrder) => {
	console.log(props.collaboratorsOrders);

	return (
		<div className="company-order-container">
			<div className="co-header">
				<p className="codigo">{props.code}</p>
				<p className="create-at">
					<CiClock2 /> {calcularTempoDecorrido(props.createdAt)}
				</p>
			</div>
			{props?.dishes?.map((dish) => {
				return <h1>{dish.name}</h1>;
			})}
		</div>
	);
};

export default CompanyOrder;
