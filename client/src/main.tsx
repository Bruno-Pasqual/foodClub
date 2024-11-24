import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./index.css";
import InitialPage from "./pages/all/InitialPage";
import NotFoundPage from "./pages/all/NotFoundPage";
import Login from "./pages/all/Login";
import Register from "./pages/all/Register";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme";
import { CssBaseline } from "@mui/material";
import HomePage from "./pages/all/HomePage";
import Navbar from "./components/Navbar/Navbar";

const PublicLayout = () => <Outlet />;
const ProtectedLayout = () => (
	<>
		<Navbar />
		<Outlet />
	</>
);

const router = createBrowserRouter([
	{
		path: "/",
		element: <PublicLayout />, // Rotas públicas
		errorElement: <NotFoundPage />,
		children: [
			{ path: "/", element: <InitialPage /> },
			{ path: "/login", element: <Login /> },
			{ path: "/cadastro", element: <Register /> },
		],
	},
	{
		path: "/", // Rotas protegidas
		element: <ProtectedLayout />, // Navbar é incluído aqui
		children: [
			{ path: "/inicio", element: <HomePage /> },
			{ path: "/refeicoes", element: <HomePage /> },
			{ path: "/pedidos", element: <HomePage /> },
			{ path: "/gerenciar", element: <HomePage /> },
			{ path: "/colaboradores", element: <HomePage /> },
			{ path: "/busca", element: <HomePage /> },
			{ path: "/perfil", element: <HomePage /> },
			{ path: "/busca", element: <HomePage /> },
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<main>
				<RouterProvider router={router} />
			</main>
		</ThemeProvider>
	</StrictMode>
);
