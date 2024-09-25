import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import InitialPage from "./pages/InitialPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
	{ path: "/", element: <InitialPage />, errorElement: <NotFoundPage /> },

	{ path: "/orders", element: <InitialPage /> },
	{
		path: "/favorites",
		element: <InitialPage />,
	},
	{
		path: "/employees",
		element: <InitialPage />,
	},
	{ path: "/profile", element: "" },
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<main>
			<div>Navbar</div>
			<RouterProvider router={router} />
		</main>
	</StrictMode>
);
