import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import InitialPage from "./pages/all/InitialPage";
import NotFoundPage from "./pages/all/NotFoundPage";
import Login from "./pages/all/Login";

const router = createBrowserRouter([
	{
		path: "/",
		element: <InitialPage />,
		errorElement: <NotFoundPage />,
	},
	{ path: "/login", element: <Login /> },
	{ path: "/login", element: <Login /> },
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<main>
			{/* <div>Navbar</div> */}
			<RouterProvider router={router} />
		</main>
	</StrictMode>
);
