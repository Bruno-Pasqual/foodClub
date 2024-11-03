export const validateEmail = (email: string) => {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
};

export const validatePassword = (password: string) => {
	const regex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
};

export const validateName = (name: string) => {
	const regex = /^[a-zA-Z\s]+$/;
	return regex.test(name);
};

export const validateCpf = (cpf: string) => {
	const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
	return regex.test(cpf);
};

export const validateCep = (cep: string) => {
	const regex = /^\d{5}-\d{3}$/;
	return regex.test(cep);
};

export const containsProfanity = (text: string): boolean => {
	const regex =
		/(bosta|caralho|merda|porra|vaca|put*|cu|foda|pau|arrombado|filha da puta|cacete|safado|putana|desgraça|seu filho da mãe|viado|xota|cuzinho|pinto|xoxota|macho|xibiu)/i;
	return regex.test(text);
};
