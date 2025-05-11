import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetSuggestedUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  useEffect(() => {
    const getSuggestedUsers = async () => {
      setIsLoading(true);
      try {
        const usersRef = collection(firestore, "users");
        const q = query(usersRef, orderBy("uid"), limit(20)); // Get more to filter client-side
        const snapshot = await getDocs(q);

        const users = snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter(
            (user) =>
              user.uid !== authUser.uid &&
              !authUser.following.includes(user.uid)
          )
          .slice(0, 3); // Take top 3 after filtering

        setSuggestedUsers(users);
      } catch (err) {
        showToast("Error", err.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser) getSuggestedUsers();
  }, [authUser, showToast]);

  return { isLoading, suggestedUsers };
};

export default useGetSuggestedUsers;
