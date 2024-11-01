import { UserType } from "../enums/enums";

export interface IUser extends Document {
	email: string;
	senha: string;
	tipoUsuario: UserType;
}

export interface IRestaurant extends IUser {
	nomeRestaurante: string;
	cnpj: string;
	cep: string;
	numero: string;
	pratos: IDish[];
}

export interface IDish {
	nomeDoPrato: string;
	descricao: string;
	preco: number;
}

export interface IFuncionario extends IUser {
	nome: string;
	cpf: string;
	empresaId: string;
}

export interface ICompany extends IUser {
	nome: string;
	cnpj: string;
	cep: string;
	numero: string;
	restaurantesParceiros: IRestaurant[];
	funcionariosIds: string[];
}
