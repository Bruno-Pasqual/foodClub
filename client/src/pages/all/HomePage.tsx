import "./HomePage.css";
import { useRestaurantStore } from "../../stores/restaurantStore";
import { useEffect } from "react";
import FormDialog from "../../components/Dialog";
import { Rating } from "@mui/material";
import RefeicaoCard from "../../components/RefeicaoCard/RefeicaoCard";
import { useAuthStore } from "../../stores/authStores";
import { useCompanyStore } from "../../stores/companyStore";

const HomePage = () => {
	const { restaurants, getRestaurants } = useRestaurantStore();
	const { user } = useAuthStore();
	const { company, chooseRestaurant } = useCompanyStore();

	console.log("user", user);
	console.log(restaurants);

	useEffect(() => {
		getRestaurants();
	}, []);

	function handleSelecionar(restaurantId: string, companyId: string): void {
		chooseRestaurant(companyId, restaurantId);
	}

	return (
		<div className="inicio-container">
			<div className="inicio-header">
				<h1>Bem-vindo</h1>

				<div className="restaurantes-contaienr">
					<p>Restaurantes disponíveis</p>
					<div className="restaurantes-cards-container">
						{restaurants?.map((r) => (
							<FormDialog
								titleText={"Cardápio " + r.name + ""}
								onConfirm={() => handleSelecionar(r._id, user!._id)}
								confirmText="Selecionar"
								trigger={
									<div className="restaurante-card">
										<img
											src={
												r.image
													? r.image
													: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQheYiDRjgh_4UdmxP0xQbP-hiGOS5Ix8-9aw&s"
											}
											className="restaurante-card-img"
										/>
										<div className="info-container">
											<p className="restaurant-title">{r.name}</p>
											<Rating
												name="half-rating-read"
												defaultValue={5}
												precision={0.5}
												readOnly
											/>
										</div>
									</div>
								}
							>
								<div className="container-refeicoes-cardapio">
									{r.dishes.map((d) => (
										<RefeicaoCard
											_id={d.id}
											name={d.name}
											description={d.description}
											price={d.price}
											image={d.image}
											ratings={[]}
										/>
									))}
								</div>
							</FormDialog>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
