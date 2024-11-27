export const calcularTempoDecorrido = (createdAt: string) => {
	const now = Date.now(); // Obtém o timestamp atual
	const createdTime = Date.parse(createdAt); // Converte a string em timestamp
	const diff = now - createdTime; // Calcula a diferença em milissegundos

	// Converte para unidades de tempo
	const segundos = Math.floor(diff / 1000);
	const minutos = Math.floor(segundos / 60);
	const horas = Math.floor(minutos / 60);
	const dias = Math.floor(horas / 24);

	if (dias > 0) return `${dias} dia(s) atrás`;
	if (horas > 0) return `${horas} hora(s) atrás`;
	if (minutos > 0) return `${minutos} minuto(s) atrás`;
	return `${segundos} segundo(s) atrás`;
};