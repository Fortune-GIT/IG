import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useSignUpWithEmailAndPassword = () => {
	const [createUserWithEmailAndPassword, , loading, error] =
		useCreateUserWithEmailAndPassword(auth);
	const showToast = useShowToast();
	const loginUser = useAuthStore((state) => state.login);

	const signup = async (inputs) => {
		console.log("Signup Inputs:", inputs); // For debugging

		const { email, password, username, fullName } = inputs;

		if (!email || !password || !username || !fullName) {
			return showToast("Error", "Please fill all the fields", "error");
		}

		try {
			// Check if username already exists
			const usersRef = collection(firestore, "users");
			const q = query(usersRef, where("username", "==", username));
			const querySnapshot = await getDocs(q);

			if (!querySnapshot.empty) {
				return showToast("Error", "Username already exists", "error");
			}

			// Create user with Firebase Auth
			const userCred = await createUserWithEmailAndPassword(email, password);
			if (!userCred || !userCred.user) {
				return showToast("Error", "Could not create account", "error");
			}

			const userDoc = {
				uid: userCred.user.uid,
				email,
				username,
				fullName,
				bio: "",
				profilePicURL: "",
				followers: [],
				following: [],
				posts: [],
				createdAt: Date.now(),
			};

			// Store user data in Firestore
			await setDoc(doc(firestore, "users", userCred.user.uid), userDoc);
			localStorage.setItem("user-info", JSON.stringify(userDoc));
			loginUser(userDoc);
			showToast("Success", "Account created successfully!", "success");
		} catch (err) {
			console.error("Firebase Signup Error:", err);
			showToast("Error", err.message || "Something went wrong", "error");
		}
	};

	return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
