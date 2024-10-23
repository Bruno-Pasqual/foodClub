import { Box, Button, Container } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./InitialPage.css";
import { HowItWorkCard } from "../../components/HowItWorkCard";
import { nanoid } from "nanoid";
import { RatingCard } from "../../components/RatingCard";

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

const ratings = 	[
		{
		  "nome": "João Silva",
		  "avaliacao": "Desde que começamos a usar o aplicativo na empresa, pedir almoço ficou muito mais prático! A variedade de restaurantes e a rapidez na entrega são pontos fortes. Ótima solução!",
		  "estrelas": 5
		},
		{
		  "nome": "Ana Pereira",
		  "avaliacao": "O app facilitou demais nosso dia a dia na empresa. Agora, conseguimos pedir comida de qualidade sem complicações, e os pedidos chegam sempre no horário. Super recomendo!",
		  "estrelas": 5
		},
		{
		  "nome": "Carlos Oliveira",
		  "avaliacao": "Antes, pedir almoço para a equipe era um desafio, mas agora com o aplicativo ficou tudo organizado. A interface é fácil de usar e temos acesso a ótimas opções de restaurantes.",
		  "estrelas": 4
		},
		{
		  "nome": "Mariana Costa",
		  "avaliacao": "Nossa empresa tem usado o app há alguns meses e a experiência tem sido excelente! Mais opções, facilidade nos pedidos e entrega rápida. Nossos funcionários adoram!",
		  "estrelas": 5
		},
		{
		  "nome": "Pedro Mendes",
		  "avaliacao": "Com o app, conseguimos centralizar todos os pedidos de almoço da equipe em uma única plataforma. Super prático e com opções de restaurantes para todos os gostos. Melhorou bastante nossa rotina.",
		  "estrelas": 4
		},
		{
		  "nome": "Beatriz Souza",
		  "avaliacao": "Esse aplicativo transformou a forma como pedimos almoço na empresa. A variedade de restaurantes é incrível, e o sistema é super intuitivo. Os funcionários estão muito satisfeitos!",
		  "estrelas": 5
		},
		{
		  "nome": "Lucas Alves",
		  "avaliacao": "Melhorou muito nossa logística de pedidos. Agora todo mundo consegue fazer seus pedidos de forma rápida e eficiente, sem precisar se preocupar com problemas de entrega ou falta de opções.",
		  "estrelas": 4
		},
		{
		  "nome": "Fernanda Lima",
		  "avaliacao": "Aplicativo excelente! Nos ajudou a otimizar os pedidos de almoço e ainda oferece um ótimo suporte. As entregas são pontuais e os restaurantes parceiros são ótimos. Muito satisfeitos!",
		  "estrelas": 5
		},
		{
		  "nome": "Rodrigo Santos",
		  "avaliacao": "Com a integração do app na nossa empresa, pedir almoço virou uma tarefa simples e rápida. A entrega é sempre dentro do prazo e a qualidade dos restaurantes é muito boa!",
		  "estrelas": 4
		},
		{
		  "nome": "Cláudia Ribeiro",
		  "avaliacao": "Nossa equipe adorou o app! Conseguimos fazer pedidos com mais eficiência e sem problemas. A qualidade dos restaurantes é ótima e o processo todo ficou bem mais organizado.",
		  "estrelas": 5
		}
	  ]
	  

	// mostra a introdução da ideia da aplicação, deve conter a opção de ir para o login/cadastro
	return (
		<main>
			<div className="hero">
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
			</div>

			<Container maxWidth={"xl"} className="how-it-work-container">
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

			<Container maxWidth={"xl"} className="users-ratings-container ">
				<h2>Veja o que nossos clientes dizem</h2>
				<div className="rating-cards-container">
				
				</div>
			</Container>

			<Box sx={{ padding: 0, margin: 0 }} className="footer-container">
				{/* seu conteúdo aqui */}
			</Box>
		</main>
	);
};

export default InitialPage;
