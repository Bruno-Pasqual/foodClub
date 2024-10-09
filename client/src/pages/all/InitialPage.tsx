import { Button, Container } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./InitialPage.css";
import { HowItWorkCard } from "../../components/HowItWorkCard";
import { nanoid } from "nanoid";

const InitialPage = () => {
	const howItWorkCardsInfo = [
		{
			iconAddress: "src/assets/how-it-work-company-icon.png",
			Text:
				"Nosso papel é simplificar a alimentação corporativa para empresas de todos os tamanhos. Oferecemos uma plataforma intuitiva onde empresas podem selecionar refeições deliciosas de uma variedade de restaurantes locais, garantindo que seus funcionários tenham opções saborosas e saudáveis todos os dias.",
			altText:
				"Ícone de usuário em frente a um prédio, representando uma empresa ou escritório.",
			title: "Empresas",
		},
		{
			iconAddress: "src/assets/how-it-work-chef-icon.png",
			Text:
				"Junte-se a nós para expandir seu alcance e aumentar sua base de clientes! Ao se cadastrar em nossa plataforma, seu restaurante terá a oportunidade de fornecer refeições saborosas para empresas locais, alcançando um novo público e aumentando suas vendas. Aumente sua visibilidade e torne-se a escolha preferida para alimentação corporativa na região.",
			altText: "Ícone de chefe de cozinha usando chapéu e uniforme.",
			title: "Restaurantes",
		},
		{
			iconAddress: "src/assets/how-it-work-employees-icon.png",
			Text:
				"Somos o elo entre empresas que buscam fornecer refeições para seus funcionários e restaurantes que desejam expandir seus negócios. Nossa plataforma oferece uma interface eficiente para que empresas escolham entre uma variedade de opções de cardápio de restaurantes locais, garantindo uma experiência gastronômica de qualidade para seus funcionários, enquanto os restaurantes aumentam suas vendas e visibilidade.",
			altText:
				"Ícone de grupo de pessoas com uma maleta, simbolizando funcionários ou equipe de trabalho.",
			title: "Colaboradores",
		},
		{
			iconAddress: "src/assets/how-it-work-transportation-icon.png",
			Text:
				"Contamos com uma rede de transporte confiável e eficiente para entregar as refeições diretamente do restaurante até a empresa. Com parceiros como Uber Flash, 99 Entrega, e uma equipe de motoboys e carros próprios, garantimos que as refeições cheguem frescas e pontualmente, proporcionando uma experiência de entrega impecável para nossos clientes.",
			altText:
				"Ícone de um caminhão com uma seta apontando para a direita, representando transporte ou entrega.",
			title: "Entregadores",
		},
	];

	// mostra a introdução da ideia da aplicação, deve conter a opção de ir para o login/cadastro
	return (
		<main>
			<Container maxWidth="lg" className="hero">
				<img
					src="src/assets/Logo.svg"
					alt="Logotipo da empresa com um chapéu de chef e uma gravata borboleta sobre um paletó, simbolizando serviços de culinária e hospitalidade."
				/>
				<div className="hero-info-container">
					<h1>
						FoodClub, <span>a sua nova forma de pedir uma refeição.</span>
					</h1>
					<p>Conectando empresas e restaurantes sem perder a praticidade</p>
					<div className="hero-btns-container">
						<NavLink to={"/cadastro"} className=" nav-link entrar-btn">
							<Button variant="contained">Entrar</Button>
						</NavLink>

						<NavLink to={"/cadastro"} className="nav-link cadastrar-btn">
							<Button variant="outlined">Cadastrar</Button>
						</NavLink>
					</div>
				</div>
			</Container>
			<div className="">
				<Container maxWidth={"lg"} className="how-it-work-container entire-page">
					<h2>Como funciona ?</h2>
					{howItWorkCardsInfo.map(({ iconAddress, Text, altText, title }) => (
						<HowItWorkCard
							key={nanoid()}
							iconAddress={iconAddress}
							text={Text}
							altText={altText}
							title={title}
						/>
					))}
				</Container>
			</div>
			<Container className="users-ratings-container"></Container>
			<Container className="container"></Container>
		</main>
	);
};

export default InitialPage;
