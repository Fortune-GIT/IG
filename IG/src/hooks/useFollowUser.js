import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const useFollowUser = (userId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const { userProfile, setUserProfile } = useUserProfileStore();
  const showToast = useShowToast();

  const handleFollowUser = async () => {
    if (!authUser?.uid || !Array.isArray(authUser.following)) {
      showToast("Error", "You must be logged in to follow users.", "error");
      return;
    }

    setIsUpdating(true);

    try {
      const currentUserRef = doc(firestore, "users", authUser.uid);
      const targetUserRef = doc(firestore, "users", userId);

      const newFollowing = isFollowing
        ? arrayRemove(userId)
        : arrayUnion(userId);

      const newFollowers = isFollowing
        ? arrayRemove(authUser.uid)
        : arrayUnion(authUser.uid);

      // 🔥 Update both users
      await Promise.all([
        updateDoc(currentUserRef, { following: newFollowing }),
        updateDoc(targetUserRef, { followers: newFollowers }),
      ]);

      // ✅ Update local auth user state
      const updatedFollowing = isFollowing
        ? (authUser.following || []).filter((id) => id !== userId)
        : [...(authUser.following || []), userId];

      const updatedAuthUser = { ...authUser, following: updatedFollowing };
      setAuthUser(updatedAuthUser);
      localStorage.setItem("user-info", JSON.stringify(updatedAuthUser));

      // ✅ Update viewed profile's followers state
      if (userProfile?.uid === userId) {
        const updatedFollowers = isFollowing
          ? (userProfile.followers || []).filter((id) => id !== authUser.uid)
          : [...(userProfile.followers || []), authUser.uid];

        setUserProfile({ ...userProfile, followers: updatedFollowers });
      }

      setIsFollowing(!isFollowing);
      showToast(isFollowing ? "Unfollowed user" : "Followed user", "success");
    } catch (err) {
      console.error("Follow/unfollow failed:", err);
      showToast("Error", err.message || "Something went wrong", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (authUser?.following?.includes(userId)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [authUser, userId]);

  return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;
