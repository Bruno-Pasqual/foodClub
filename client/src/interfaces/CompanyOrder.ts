import { OrderStatus } from "../enums/enums";

export interface ICompanyOrder {
	company: string;
	collaboratorsOrders: string[];
	createdAt: string;
	status: OrderStatus;
	restaurant: string;
	code: string;
}
