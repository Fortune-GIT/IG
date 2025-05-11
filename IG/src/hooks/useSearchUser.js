import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useSearchUser = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState(null);
	const showToast = useShowToast();

	const getUserProfile = async (username) => {
		if (!username || typeof username !== "string") {
			showToast("Error", "Please enter a valid username", "error");
			return;
		}

		setIsLoading(true);
		setUser(null);

		try {
			const q = query(collection(firestore, "users"), where("username", "==", username.trim()));
			const querySnapshot = await getDocs(q);

			if (querySnapshot.empty) {
				showToast("Error", "User not found", "error");
				return;
			}

			// Use first match (Firebase usernames should be unique)
			const docSnap = querySnapshot.docs[0];
			setUser({ id: docSnap.id, ...docSnap.data() });

		} catch (error) {
			showToast("Error", error.message, "error");
			setUser(null);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, getUserProfile, user, setUser };
};

export default useSearchUser;
