import { useEffect } from "react";
import { useAuthStore } from "../../stores/authStores";
import { useCompanyStore } from "../../stores/companyStore";
import { IDish } from "../../interfaces/dish";
import RefeicaoCard from "../../components/RefeicaoCard/RefeicaoCard";

import "./Busca.css";
import FormDialog from "../../components/Dialog";

const Busca = () => {
	const { user } = useAuthStore();
	const { company, getCompany, isLoading, error } = useCompanyStore();

	// Usando useEffect para chamar getCompany apenas quando o user for carregado
	useEffect(() => {
		if (user?.company) {
			getCompany(user.company);
		}
	}, [user, getCompany]);

	if (isLoading) return <div>Carregando...</div>;
	if (error) return <div>Erro: {error}</div>;

	if (!company) return <div>Empresa não encontrada</div>;

	const affiliateRestaurant = company.affiliateRestaurants[0];
	const dishes = affiliateRestaurant?.dishes || [];

	return (
		<div className="busca-container">
			<div className="busca-container-header">
				<h1>Pratos disponíveis </h1>
				<p className="company-name">{company.name}</p>
			</div>

			<div className="busca-container-dishes">
				{dishes.length > 0 ? (
					dishes.map((dish: IDish, index: number) => (
						<div key={index}>
							<FormDialog trigger={<RefeicaoCard {...dish} />}>
								<p>Deseja pedir esse prato para o pedido de hoje ?</p>
							</FormDialog>
						</div>
					))
				) : (
					<p>Não há pratos disponíveis para este restaurante.</p>
				)}
			</div>
		</div>
	);
};

export default Busca;
