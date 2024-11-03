import { UserType } from "../models/enums/enums";

export const isEmail = (email: string) => {
	const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return re.test(email);
};

export const getCreationMessage = (userType: UserType): string => {
	if (userType === UserType.COMPANY) {
		return "Company created successfully.";
	} else if (userType === UserType.RESTAURANT) {
		return "Restaurant created successfully.";
	} else if (userType === UserType.EMPLOYEE) {
		return "Restaurant created successfully.";
	}
	return "User created successfully.";
};

export const getErrorCreationMessage = (userType: UserType): string => {
	if (userType === UserType.COMPANY) {
		return "Alguma coisa deu errado ao criar a empresa.";
	} else if (userType === UserType.RESTAURANT) {
		return "Alguma coisa deu errado ao criar o restaurante.";
	} else if (userType === UserType.EMPLOYEE) {
		return "Alguma coisa deu errado ao criar o funcionário.";
	}
	return "Alguma coisa deu errado ao criar o usuário";
};
