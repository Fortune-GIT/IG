import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../store/userProfileStore";

const useGetUserProfileByUsername = (username) => {
	const [isLoading, setIsLoading] = useState(true);
	const showToast = useShowToast();
	const { userProfile, setUserProfile } = useUserProfileStore();

	useEffect(() => {
		const getUserProfile = async () => {
			if (!username) return;

			setIsLoading(true);
			try {
				const q = query(collection(firestore, "users"), where("username", "==", username));
				const querySnapshot = await getDocs(q);

				if (querySnapshot.empty) {
					setUserProfile(null);
					return;
				}

				let userDoc = null;
				querySnapshot.forEach((doc) => {
					userDoc = doc.data();
				});

				setUserProfile(userDoc);
			} catch (error) {
				showToast(error.message, "error");
			} finally {
				setIsLoading(false);
			}
		};

		getUserProfile();
	}, [username, setUserProfile, showToast]);

	return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;
