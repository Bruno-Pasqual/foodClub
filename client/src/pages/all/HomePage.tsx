import { useNavigate } from "react-router-dom";
import useCheckAuth from "../../hooks/useCheckAuth";
import { useAuthStore } from "../../stores/authStores";
import Navbar from "../../components/Navbar/Navbar";

const HomePage = () => {
	const { logout } = useAuthStore();
	const navigate = useNavigate();
	useCheckAuth();

	async function handleLogout() {
		await logout();
		navigate("/login", { replace: true });
	}

	return (
		<div>
			<button onClick={handleLogout}>Deslogar</button>
			<Navbar />
		</div>
	);
};

export default HomePage;
