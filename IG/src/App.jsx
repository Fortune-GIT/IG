import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

// Layout and Pages
import PageLayout from "./Layouts/PageLayout/PageLayout";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
	const [authUser, loading] = useAuthState(auth);

	if (loading) return null; // Or a spinner if you prefer

	return (
		<PageLayout>
			<Routes>
				{/* Home route: redirect to /auth if not signed in */}
				<Route path="/" element={authUser ? <HomePage /> : <Navigate to="/auth" replace />} />

				{/* Auth route: redirect to / if already signed in */}
				<Route path="/auth" element={!authUser ? <AuthPage /> : <Navigate to="/" replace />} />

				{/* Public profile route */}
				<Route path="/:username" element={<ProfilePage />} />
			</Routes>
		</PageLayout>
	);
}

export default App;
