import { nanoid } from "nanoid";
import CompanyOrder from "../../components/CompanyOrder/CompanyOrder";
import { useRestaurantStore } from "../../stores/restaurantStore";

const Pedidos = () => {
	const { restaurant } = useRestaurantStore();

	return (
		<div>
			<div className="pedidos-header">
				<h1>Pedidos</h1>
			</div>
			<div className="pedidos-container">
				{restaurant?.companyOrders.map((coOrder) => {
					return (
						<CompanyOrder
							key={nanoid()}
							code={coOrder.code}
							collaboratorsOrders={coOrder.collaboratorsOrders}
							dishes={coOrder.dishes}
							id={coOrder.id}
							company={coOrder.company}
							createdAt={coOrder.createdAt}
							status={coOrder.status}
							restaurant={coOrder.restaurant}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Pedidos;
