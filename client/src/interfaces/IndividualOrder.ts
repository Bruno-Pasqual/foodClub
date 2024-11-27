import { IDish } from "./dish";

export interface IIndividualOrder {
	_id: string;
	dishes: IDish[];
	employee: string;
	companyOrder: string;
}
