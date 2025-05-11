import { Box, Typography, Avatar } from "@mui/material";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import { doc, getDoc, setDoc } from "firebase/firestore";

const GoogleAuth = ({ prefix }) => {
	const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
	const showToast = useShowToast();
	const loginUser = useAuthStore((state) => state.login);

	const handleGoogleAuth = async () => {
		try {
			const newUser = await signInWithGoogle();
			if (!newUser && error) {
				showToast("Error", error.message, "error");
				return;
			}
			const userRef = doc(firestore, "users", newUser.user.uid);
			const userSnap = await getDoc(userRef);

			if (userSnap.exists()) {
				const userDoc = userSnap.data();
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
			} else {
				const userDoc = {
					uid: newUser.user.uid,
					email: newUser.user.email,
					username: newUser.user.email.split("@")[0],
					fullName: newUser.user.displayName,
					bio: "",
					profilePicURL: newUser.user.photoURL,
					followers: [],
					following: [],
					posts: [],
					createdAt: Date.now(),
				};
				await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				cursor: "pointer",
			}}
			onClick={handleGoogleAuth}
		>
			<Avatar
				src="/google.png"
				sx={{ width: 24, height: 24, bgcolor: "transparent" }}
				variant="square"
			/>
			<Typography variant="body2" sx={{ mx: 1, color: "primary.main" }}>
				{prefix} with Google
			</Typography>
		</Box>
	);
};

export default GoogleAuth;
