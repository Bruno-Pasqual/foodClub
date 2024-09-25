import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import InitialPage from "./pages/InitialPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
	{ path: "/", element: <InitialPage />, errorElement: <NotFoundPage /> },
	{ path: "", element: "" },
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
