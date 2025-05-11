import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserProfileById = (userId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const showToast = useShowToast();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return;

      setIsLoading(true);
      setUserProfile(null);

      try {
        const userDocRef = doc(firestore, "users", userId);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          setUserProfile({ id: userSnap.id, ...userSnap.data() });
        } else {
          showToast("Error", "User not found", "error");
        }
      } catch (err) {
        showToast("Error", err.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId, showToast]);

  return { isLoading, userProfile, setUserProfile };
};

export default useGetUserProfileById;
